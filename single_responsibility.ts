// ❌ BAD EXAMPLE — Violates SRP

class User {
  constructor(
    public name: string,
    public email: string
  ) {}
}

class UserService {
  createUser(name: string, email: string): User {
    const user = new User(name, email);
    console.log(`✅ User created: ${user.name} (${user.email})`);

    // 👎 Responsibility creep: also sending email here
    this.sendWelcomeEmail(user);

    return user;
  }

  private sendWelcomeEmail(user: User): void {
    console.log(`📩 Sending welcome email to ${user.email}`);
    // Imagine real email sending logic here...
  }
}

// Usage
const userService = new UserService();
userService.createUser("Alice", "alice@example.com");

// Solved by applying single responsibility principle

class EmailService {
    sendWelcomeEmail(user: User): void {
    console.log(`📩 Sending welcome email to ${user.email}`);
    // Imagine real email sending logic here...
  }
}

class CorrectUserService {
  constructor(private emailService: EmailService) {}
  createUser(name: string, email: string): User {
    const user = new User(name, email);
    console.log(`✅ User created: ${user.name} (${user.email})`);

    this.emailService.sendWelcomeEmail(user)
    return user;
  }
}

// Usage
const emailService = new EmailService();
const correctUserService = new CorrectUserService(emailService);

userService.createUser("Victoria", "victoria@example.com");