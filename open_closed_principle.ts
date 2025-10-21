// ❌ BAD — You have to MODIFY this class whenever you add a new payment method

class PaymentProcessor {
  processPayment(type: string, amount: number, payment_params: object) {
    if (type === "credit_card") {
      console.log(`💳 Processing credit card payment of $${amount}`);
      // process payment_params
    } else if (type === "pay_pal") {
      console.log(`💻 Processing PayPal payment of $${amount}`);
      // process payment_params
    } else if (type === "crypto") {
      console.log(`🪙 Processing crypto payment of $${amount}`);
      // process payment_params
    } else {
      console.log("❌ Unknown payment method");
    }
  }
}

// Usage
const processor = new PaymentProcessor();
processor.processPayment("credit_card", 100, { card_number: 123468, bank: "Wells Fargo"});
processor.processPayment("pay_pal", 250, { email: 'viictoriabarrientos@gmail.com' });


// Solved by applying open closed principle. Extends from a single interface. Open for extension but closed for modification

interface PaymentStrategy {
    pay(amount: number, payment_params: object): void
}

interface CreditCardParams {
  card_number: number;
  bank: string;
}

interface PayPalParams {
    email: string
}

interface CryptoParams {
    wallet_address: string;
}

// ✅ Payment processor no longer needs to be modified for new methods
class CorrectPaymentProcessor {
  constructor(private strategy: PaymentStrategy) {}

  process(amount: number, payment_params: object) {
    this.strategy.pay(amount, payment_params);
  }
}

class CreditCardPayment implements PaymentStrategy {
    private isCreditCardParams(obj: any): obj is CreditCardParams {
        return(
            obj &&
            typeof obj.card_number === "number" &&
            typeof obj.bank === "string"
        )
    }

    pay(amount: number, payment_params: unknown): void {
        // Type guard for CreditCardParams
        if (!this.isCreditCardParams(payment_params)) {
        throw new Error("❌ Invalid credit card payment parameters");
        }

        console.log(`💳 Processing credit card payment of $${amount}`);
        console.log(`Card: ${payment_params.card_number}, Bank: ${payment_params.bank}`);
  }
}

class PayPalPayment implements PaymentStrategy {
    private isPayPalParams(obj: any): obj is PayPalParams {
        return(
            obj &&
            typeof obj.email === "string"
        )
    }

    pay(amount: number, payment_params: object): void {
        // Type guard for PAYpAL
        if(!this.isPayPalParams(payment_params)) {
            throw new Error("Invalid PayPal Params")
        }    
    
        console.log(`💳 Processing credit card payment of $${amount}`);
        console.log(`Email verified: ${payment_params.email}`);
    }
}

class CryptoPayment implements PaymentStrategy {
    private isCryptoParams(obj: any): obj is CryptoParams {
        return (
            obj &&
            typeof obj.wallet_address === "string"
        )
    }
    pay(amount: number, payment_params: object): void {
        if(!this.isCryptoParams(payment_params)) {
            throw new Error("Invalid Crypto Params")
        }
        console.log(`🪙 Processing crypto payment of $${amount}`);
        console.log(`Wallet Address: ${payment_params.wallet_address}`);
    }
}

const creditCardProcessor = new CorrectPaymentProcessor(new CreditCardPayment())
creditCardProcessor.process(250, { card_number: 456789, bank: "Bank of America" })

const payPalProcessor = new CorrectPaymentProcessor(new PayPalPayment())
payPalProcessor.process(30, { email: "viictoriabarrientos@gmail.com"})

const cryptoProcessor = new CorrectPaymentProcessor(new CryptoPayment())
cryptoProcessor.process(1635, { wallet_address: "140i6mgd250b386nh2mi97mk2bv"})