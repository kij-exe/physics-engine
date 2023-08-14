

class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    get lengthSquared() {
        return Math.pow(x, 2) + Math.pow(y, 2);
    }

    get length() {
        return Math.sqrt(this.lengthSquared());
    }

    // Changes original vector
    multiply(scalar) {
        this.x *= scalar;
        this.y *= scalar;
    }

    // Creates new changed vector
    multiplied(scalar) {
        return new Vector(
            this.x * scalar,
            this.y * scalar
        );
    }

    // Static method to return result of multiplication of the vector by a scalar. Might appear redundant
    static multiplication(vector, scalar) {
        return new Vector(vector.x * scalar, vector.y * scalar);
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    added(vector) {
        return new Vector(
            this.x + vector.x,
            this.y + vector.y
        )
    }

    static addition(vector1, vector2) {
        return new Vector(vector1.x + vector2.x, vector1.y + vector2.y);
    }

    subtract(){

    }

    subtracted(vector) {
        return new Vector(
            this.x - vector.x,
            this.y - vector.y
        )
    }

    toString() {
        return `(${this.x}; ${this.y})`;
    }

    copy() {
        return new Vector(this.x, this.y)
    }

    // Allows to easily spread vector coordinates. For instance when a copy of a vector is required when copy function cannot be used.
    [Symbol.iterator] = function* () {
        yield this.x;
        yield this.y;
    }

    redraw(grid, start = new Vector(0, 0), color = "Black") {
        grid.ctx.beginPath();
        grid.ctx.strokeStyle = color;
        grid.ctx.moveTo(...grid.toCanvasGrid(start));
        grid.ctx.lineTo(...grid.toCanvasGrid(start.added(this)));
        grid.ctx.stroke();
    }

    cross(vector) {
        return this.x * vector.y - this.y * vector.x;
    }
}

export {Vector as default};