import Vector from "../utility/Vector.js"

class Ball {
    /**
     * 
     * @param {number} radius 
     * @param {Vector} initialPos 
     * @param {Vector} initialVelocity 
     * @param {string} color 
     */
    constructor(radius, initialPos, initialVelocity = new Vector(0, 0), color="Red") {
        this.radius = radius;
        this.pos = initialPos;
        this.velocity = initialVelocity;
        this.color = color;

        // console.log("The ball at initial position " + this.pos.toString() + " instantiated");
    }

    advance(dt) {
        this.pos.add(Vector.multiplication(this.velocity, dt));
    }

    // "grid" parameter allows function to access the canvas (its context specifically), function that translates simulation coordinates to canvas coordinates and the scale parameter
    redraw(grid) {
        grid.ctx.beginPath();
        grid.ctx.fillStyle = this.color;
        grid.ctx.strokeStyle = this.color;
        grid.ctx.arc(
            ...grid.toCanvasGrid(this.pos), 
            this.radius * grid.scale, 
            0, 2 * Math.PI
        );
        grid.ctx.stroke();
        // grid.ctx.fill();
    }

}

export {Ball as default};