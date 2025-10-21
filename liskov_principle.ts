// ❌ BAD — Square breaks the expected behavior of Rectangle

class Rectangle {
  constructor(protected width: number, protected height: number) {}

  setWidth(width: number) {
    this.width = width;
  }

  setHeight(height: number) {
    this.height = height;
  }

  getArea(): number {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  constructor(size: number) {
    super(size, size);
  }

  // 👎 Overriding in a way that breaks behavior
  setWidth(width: number) {
    this.width = width;
    this.height = width; // forces height to be the same
  }

  setHeight(height: number) {
    this.height = height;
    this.width = height; // forces width to be the same
  }
}

function printArea(rect: Rectangle) {
  rect.setWidth(5);
  rect.setHeight(10);
  console.log(`Expected area: 50, got: ${rect.getArea()}`);
}

const rectangle = new Rectangle(2, 3);
printArea(rectangle); // ✅ 50

const square = new Square(5);
printArea(square);    // ❌ Expected 50 but got 100

// Applying Liskov Substitution Principle

interface Shape {
    getArea(): number
}

class LiskovSquare implements Shape {
    constructor(private size: number) {}

    setSize(size: number) {
        this.size = size
    }

    getArea(): number {
        return this.size * this.size
    }
}

class LiskovRectangle implements Shape {
    constructor(private width: number, private height: number) {}

    setHeight(height: number) {
        this.height = height
    }

    setWidth(height: number) {
        this.height = height
    }

    getArea(): number {
        return this.width * this.height
    }
}

function liskovPrintArea(shape: Shape) {
    console.log(`Area: ${shape.getArea()}`);
}

const liskovSquare = new LiskovSquare(4)
const liskovRectangle = new LiskovRectangle(2, 5)

liskovPrintArea(liskovSquare)
liskovPrintArea(liskovRectangle)