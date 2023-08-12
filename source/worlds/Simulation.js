import Ball from "../bodies/Ball.js"
import Vector from "../utility/Vector.js"

class Simulation {
    constructor(canvas) {
        this.canvas = canvas;

        this.simBodies = [];
        this.addBody(new Ball(
            new Vector(100, 50),
            new Vector(1, 1)
        ))

        this.terminator = 0;
    }

    addBody(body) {
        this.simBodies.push(body);
    }

    start() {
        if (this.terminator++ > 100) {
            return;
        }

        this.update();

        this.redraw();

        requestAnimationFrame(this.start);
    }

    update() {

        // for (body of this.simBodies) {
        //     body.advance();
        // }

    }

    redraw() {

        // for (body of this.simBodies) {
        //     body.redraw();
        // }

    }
}

export {Simulation as default}