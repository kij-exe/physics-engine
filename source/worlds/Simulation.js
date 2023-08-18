import Ball from "../bodies/Ball.js"
import Wall from "../bodies/Wall.js"
import Vector from "../utility/Vector.js"
import CoordinateGrid from "./../utility/CoordinateGrid.js"
import PriorityQueue from "../utility/PriorityQueue.js"
import Event from "../utility/Event.js"


class Simulation {
    constructor(DOM_ids) {
        this.canvas = document.getElementById(DOM_ids.canvas_id);
        this.ctx = this.canvas.getContext("2d");

        this.grid = new CoordinateGrid(this.canvas, this.ctx);

        this.events = new PriorityQueue(Event.comparator)

        this.simBodies = [];
        this.addBody(new Ball(
            /*radius = */ 40,
            /*pos = */ new Vector(300, 200),
            /*velocity = */ new Vector(50, 25),
            
        ))

        this.walls = [];

        // this.addBody(new Wall(
        //     new Vector(200, 300),
        //     new Vector(400, 400)
        // ))

        this.paused;

        this.prevFrame = 0;
    }

    addBody(body) {
        this.simBodies.push(body);
    }

    start() {
        this.paused = false;

        this.step();
    }

    step(time = 0) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        var dt = time - this.prevFrame;
        this.prevFrame = time;
        
        // to convert from miliseconds to seconds
        this.update(dt/1000);

        this.redraw();

        if (this.paused) {
            return;
        }

        requestAnimationFrame((time) => {
            this.step(time)
            // this.shortcut(this, time);
        });
    }

    pause() {
        this.paused = true;
    }

    shortcut(world, time) {
        world.step(time)
    }

    update(dt) {

        for (var body of this.simBodies) {
            body.advance(dt);
        }

    }

    redraw() {
        for (var body of this.simBodies) {
            body.redraw(this.grid);
        }
    }
}

export {Simulation as default}