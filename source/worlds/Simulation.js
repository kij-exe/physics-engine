import Ball from "../bodies/Ball.js"
import Wall from "../bodies/Wall.js"
import Vector from "../utility/Vector.js"
import CoordinateGrid from "./../utility/CoordinateGrid.js"


class Simulation {
    constructor(DOM_ids) {
        this.canvas = document.getElementById(DOM_ids.canvas_id);
        this.ctx = this.canvas.getContext("2d");

        this.grid = new CoordinateGrid(this.canvas, this.ctx);

        this.simBodies = [];
        this.addBody(new Ball(
            /*radius = */ 40,
            /*pos = */ new Vector(300, 200),
            /*velocity = */ new Vector(1, 1),
            
        ))

        // this.addBody(new Wall(
        //     new Vector(200, 300),
        //     new Vector(400, 400)
        // ))

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

        // for (var body of this.simBodies) {
        //     body.advance();
        // }

    }

    redraw() {
        for (var body of this.simBodies) {
            body.redraw(this.grid);
        }
    }
}

export {Simulation as default}