import Vector from "../utility/Vector.js"


class Wall {
    /**
     * 
     * @param {Vector} startPoint 
     * @param {Vector} endPoint 
     */
    constructor(startPoint, endPoint) {
        this.startPoint = startPoint;
        this.endPoint = endPoint
    }

    redraw(grid) {
        grid.ctx.beginPath();
        grid.ctx.moveTo(...grid.toCanvasGrid(this.startPoint));
        grid.ctx.lineTo(...grid.toCanvasGrid(this.endPoint));
        grid.ctx.stroke();
    }
}

export {Wall as default}