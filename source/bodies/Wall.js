import Vector from "../utility/Vector.js"


class Wall {
    /**
     * A wall (or a line) can be thought of as a vector fixed at a certain point in a 2d plain
     * @param {Vector} startPoint 
     * @param {Vector} endPoint 
     */
    constructor(startPoint, endPoint, color = "Black", width = 3) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.color = color;
        this.width = width;
    }

    middle() {
        return this.startPoint.subtracted(this.endPoint).multiplied(1/2).added(this.endPoint);
    }

    redraw(grid) {
        grid.ctx.beginPath();
        grid.ctx.strokeStyle = this.color;
        grid.ctx.lineWidth = this.width;
        grid.ctx.moveTo(...grid.toCanvasGrid(this.startPoint));
        grid.ctx.lineTo(...grid.toCanvasGrid(this.endPoint));
        grid.ctx.stroke();
    }
}

export {Wall as default}