import Vector from "./Vector.js"

// Class that will be attached to a simulation allowing it to communicate with objects separately from simulation. Assists "redraw" methods separating translation and scaling procedures. Has own "redraw" method to possily be drawn on the canvas.
class CoordinateGrid {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.origin = new Vector();
        this.scale = 1;
    }

    // not only translates but scales as well
    toCanvasGrid(pos) {
        return new Vector(
            (pos.x + this.origin.x) * this.scale,
            (this.canvas.height - pos.y + this.origin.y) * this.scale
        )
    }
}

export {CoordinateGrid as default}