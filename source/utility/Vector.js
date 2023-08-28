import Wall from "../bodies/Wall.js"


class Vector {
    /**
     * Vector class serves role of a vector as well as of a point in 2d plain
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    lengthSquared() {
        return Math.pow(this.x, 2) + Math.pow(this.y, 2);
    }

    length() {
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

    divide(scalar) {
        this.multiply(1 / scalar);
    }

    divided(scalar) {
        return new Vector(
            this.x / scalar,
            this.y / scalar
        )
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

    subtract(vector){
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
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

    normalize() {
        var length = this.length();
        this.divide(length); 
        return this;
    }

    normalized() {
        var length = this.length;
        return this.divided(length);
    }

    // Allows to easily spread vector coordinates. For instance when a copy of a vector is required when copy function cannot be used.
    [Symbol.iterator] = function* () {
        yield this.x;
        yield this.y;
    }

    redraw(grid, start = new Vector(0, 0), color = "Black") {
        grid.ctx.beginPath();
        grid.ctx.strokeStyle = color;
        grid.ctx.lineWidth = 3;
        grid.ctx.moveTo(...grid.toCanvasGrid(start));
        grid.ctx.lineTo(...grid.toCanvasGrid(start.added(this)));
        grid.ctx.stroke();

        grid.ctx.beginPath();
        grid.ctx.fillStyle = "Orange";
        grid.ctx.arc(
            ...grid.toCanvasGrid(start.added(this)), 
            5 * grid.scale, 
            0, 2 * Math.PI
        );
        grid.ctx.fill();
    }

    cross(vector) {
        return this.x * vector.y - this.y * vector.x;
    }

    dot(vector) {
        return this.x * vector.x + this.y * vector.y;
    }

    /**
     * The function returns a vector projected on the passed as a prameter vector  
     * @param {Vector} vector 
     * @returns {Vector}
     */
    projectedOn(vector) {
        var k = this.dot(vector) / vector.lengthSquared();
        return vector.multiplied(k);
    }
    
    /**
     * The function returns a perpendicular vector from the point (point is a vector on which the function was called) to the wall passed as a parameter 
     * @param {Wall} wall 
     */
    perpendicularOnWall(wall) {
        var a_c = wall.startPoint.subtracted(this);
        var c_a = a_c.multiplied(-1);
        var a_b = wall.startPoint.subtracted(wall.endPoint);
        return a_c.added(c_a.projectedOn(a_b));
    }
}

export {Vector as default};