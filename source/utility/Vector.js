

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get lengthSquared() {
        return Math.pow(x, 2) + Math.pow(y, 2);
    }

    get length() {
        return Math.sqrt(this.lengthSquared());
    }

    multiply(scalar) {
        this.x *= scalar;
        this.y *= scalar;
    }

    static multiplication(vector, scalar) {
        return new Vector(vector.x * scalar, vector.y * scalar);
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    static addition(vector1, vector2) {
        return new Vector(vector1.x + vector2.x, vector1.y + vector2.y);
    }

    toString() {
        return `(${this.x}; ${this.y})`;
    }
}

export {Vector as default}