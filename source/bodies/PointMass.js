import Vector from "../utility/Vector.js"


class PointMass {

    constructor(initial_position, mass = 1000000, initial_velocity = new Vector(0, 0), radius = 12, color = "Black") {
        this.pos = initial_position;
        this.mass = mass;
        this.inverseMass = 1 / mass;
        this.velocity = initial_velocity;
        this.radius = radius;
        this.color = color;

        this.force = new Vector(0, 0);
    }

    redraw(grid) {
        grid.ctx.beginPath();
        grid.ctx.fillStyle = this.color;
        grid.ctx.arc(
            ...grid.toCanvasGrid(this.pos), 
            this.radius /* radius will be independent of scale */, 
            0, 2 * Math.PI
        );
        grid.ctx.fill();
    }
}

export {PointMass as default}