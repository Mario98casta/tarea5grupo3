// Figura geométrica base
class Shape {
    constructor() {
        if (new.target === Shape) {
            throw new Error("Shape class cannot be instantiated directly.");
        }
    }

    getArea() {
        throw new Error("Method 'getArea()' must be implemented.");
    }

    getPerimeter() {
        throw new Error("Method 'getPerimeter()' must be implemented.");
    }
}

// Triángulo
class Triangle extends Shape {
    constructor(base, height) {
        super();
        this.base = base;
        this.height = height;
    }

    getArea() {
        return 0.5 * this.base * this.height;
    }

    getPerimeter() {
        // En este ejemplo, asumimos que solo tenemos información suficiente para calcular el perímetro de un triángulo equilátero
        return 3 * this.base;
    }
}

// Cuadrado
class Square extends Shape {
    constructor(side) {
        super();
        this.side = side;
    }

    getArea() {
        return this.side * this.side;
    }

    getPerimeter() {
        return 4 * this.side;
    }
}

// Rombo
class Diamond extends Shape {
    constructor(diagonal1, diagonal2) {
        super();
        this.diagonal1 = diagonal1;
        this.diagonal2 = diagonal2;
    }

    getArea() {
        return 0.5 * this.diagonal1 * this.diagonal2;
    }

    getPerimeter() {
        // En este ejemplo, asumimos que solo tenemos información suficiente para calcular el perímetro de un rombo con lados iguales
        return 4 * this.diagonal1;
    }
}

// Trapecio
class Trapezoid extends Shape {
    constructor(base1, base2, height, side1, side2) {
        super();
        this.base1 = base1;
        this.base2 = base2;
        this.height = height;
        this.side1 = side1;
        this.side2 = side2;
    }

    getArea() {
        return 0.5 * (this.base1 + this.base2) * this.height;
    }

    getPerimeter() {
        return this.base1 + this.base2 + this.side1 + this.side2;
    }
}

// Círculo
class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }

    getArea() {
        return Math.PI * this.radius * this.radius;
    }

    getPerimeter() {
        return 2 * Math.PI * this.radius;
    }
}

// Rectángulo
class Rectangle extends Shape {
    constructor(length, width) {
        super();
        this.length = length;
        this.width = width;
    }

    getArea() {
        return this.length * this.width;
    }

    getPerimeter() {
        return 2 * (this.length + this.width);
    }
}

// Factory Method
class ShapeFactory {
    constructor() {
        if (new.target === ShapeFactory) {
            throw new Error("ShapeFactory class cannot be instantiated directly.");
        }
    }

    createShape() {
        throw new Error("Method 'createShape()' must be implemented.");
    }
}

class ConcreteShapeFactory extends ShapeFactory {
    constructor() {
        super();
    }

    createShape(shapeType, ...params) {
        switch (shapeType) {
            case "triangle":
                return new Triangle(...params);
            case "square":
                return new Square(...params);
            case "diamond":
                return new Diamond(...params);
            case "trapezoid":
                return new Trapezoid(...params);
            case "circle":
                return new Circle(...params);
            case "rectangle":
                return new Rectangle(...params);
            default:
                throw new Error("Invalid shape type.");
        }
    }
}

// Singleton
class Calculator {
    constructor() {
        if (Calculator.instance) {
            return Calculator.instance;
        }
        Calculator.instance = this;
        this.shapeFactory = new ConcreteShapeFactory();
    }

    calculateArea(shapeType, ...params) {
        const shape = this.shapeFactory.createShape(shapeType, ...params);
        return shape.getArea();
    }

    calculatePerimeter(shapeType, ...params) {
        const shape = this.shapeFactory.createShape(shapeType, ...params);
        return shape.getPerimeter();
    }
}

// Interacción con la interfaz de usuario

const calculator = new Calculator();

function calculate() {
    const shapeSelect = document.getElementById("shape");
    const selectedShape = shapeSelect.value;

    let params = [];

    switch (selectedShape) {
        case "triangle":
            params.push(parseFloat(prompt("Ingrese la base del triángulo:")));
            params.push(parseFloat(prompt("Ingrese la altura del triángulo:")));
            break;
        case "square":
            params.push(parseFloat(prompt("Ingrese el lado del cuadrado:")));
            break;
        case "diamond":
            params.push(parseFloat(prompt("Ingrese la diagonal 1 del rombo:")));
            params.push(parseFloat(prompt("Ingrese la diagonal 2 del rombo:")));
            break;
        case "trapezoid":
            params.push(parseFloat(prompt("Ingrese la base 1 del trapecio:")));
            params.push(parseFloat(prompt("Ingrese la base 2 del trapecio:")));
            params.push(parseFloat(prompt("Ingrese la altura del trapecio:")));
            params.push(parseFloat(prompt("Ingrese el lado 1 del trapecio:")));
            params.push(parseFloat(prompt("Ingrese el lado 2 del trapecio:")));
            break;
        case "circle":
            params.push(parseFloat(prompt("Ingrese el radio del círculo:")));
            break;
        case "rectangle":
            params.push(parseFloat(prompt("Ingrese la longitud del rectángulo:")));
            params.push(parseFloat(prompt("Ingrese el ancho del rectángulo:")));
            break;
    }

    const area = calculator.calculateArea(selectedShape, ...params);
    const perimeter = calculator.calculatePerimeter(selectedShape, ...params);

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `Área: ${area.toFixed(2)} <br> Perímetro: ${perimeter.toFixed(2)}`;
}
