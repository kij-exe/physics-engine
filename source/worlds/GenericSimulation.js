import Vector from "../utility/Vector.js"
import Wall from "../bodies/Wall.js"


class GenericSimulation {
    constructor(canvas, grid) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.grid = grid;

        this.bodies = [];

        this.control = 0;

        this.prevTime = 0;
        this.requestID;
    }

    start() {
        document.getElementById("context").innerHTML = this.context;
        this.stopped = false;

        this.canvas.onmousedown = (e) => {
            this.step(e)
        }
    }

    end() {
        document.getElementById("context").innerHTML = "";
        this.control = 0;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.bodies = [];
        this.stopped = true;
        
        cancelAnimationFrame(this.requestID);
    }

    step(e) {   }
}

export {GenericSimulation as default}