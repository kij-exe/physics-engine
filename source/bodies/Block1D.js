import Vector from "../utility/Vector.js"
import CoordinateGrid from "../utility/CoordinateGrid.js";

class Block1D {
    constructor(mass, a, b, initialPos, initialVelocity = 0, color="Black") {
        this.mass = mass;
        
        this.a = a;
        this.b = b;

        // In local space
        this.verticies = [
            new Vector(0, 0),
            new Vector(0, b),
            new Vector(a, b),
            new Vector(a, 0)
        ]
        
        this.pos = initialPos;
        this.velocity = initialVelocity;
        this.color = color;

        // console.log("The ball at initial position " + this.pos.toString() + " instantiated");
    }

    advance(dt) {
        this.pos.add(new Vector(this.velocity * dt, 0));
    }

    // "grid" parameter allows function to access the canvas (its context specifically), function that translates simulation coordinates to canvas coordinates and the scale parameter
    redraw(grid) {
        grid.ctx.beginPath();
        grid.ctx.fillStyle = this.color;
        grid.ctx.strokeStyle = this.color;

        grid.ctx.moveTo(...grid.toCanvasGrid(this.pos));
        
        for (var vertix of this.verticies) {
            grid.ctx.lineTo(...grid.toCanvasGrid(this.pos.added(vertix)))
        }

        grid.ctx.closePath();

        grid.ctx.stroke();
        grid.ctx.fill();

        new Vector(this.velocity, 0).redraw(
            grid,
            this.pos.added(new Vector(this.a/2, this.b/2))
        );
    }

}

export {Block1D as default};