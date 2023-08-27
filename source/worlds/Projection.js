import Vector from "../utility/Vector.js"
import Wall from "../bodies/Wall.js"


class Projection {
    constructor(canvas, grid) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.grid = grid;

        this.control = 0;
        this.a;
        this.b;
        
        this.c;

        this.wall;
    }

    start() {
        document.getElementById("context").innerHTML = "First two clicks on the canvas create the wall between two specified points. Further clicks will build a right-angled triangle with a hypotenuse of a line between the first point of the wall and the point you clicked on."
        
        // this.canvas.addEventListener("mousedown", (e) => {
        //     this.step(e);
        // });

        this.canvas.onmousedown = (e) => {
            this.step(e)
        }
    }

    end() {
        this.control = 0;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    step(e) {
        var x = e.x - this.canvas.getBoundingClientRect().x - 2.727;
        var y = this.canvas.height - (e.y - this.canvas.getBoundingClientRect().y - 2.727);

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        if (this.control == 0) {
            this.a = new Vector(x, y);
            this.c = this.a;
            this.control++;
            return;
        }

        if (this.control == 1) {
            this.b = new Vector(x, y);
            this.wall = new Wall(this.a, this.b);
            this.wall.redraw(this.grid);
            this.control++;
            return;
        }

        this.wall.redraw(this.grid);

        var v = new Vector(x, y).subtracted(this.c)
        v.redraw(this.grid, this.c)

        var ab = this.b.subtracted(this.a);

        var proj = v.projectedOn(ab);

        proj.redraw(this.grid, this.c, "Red");

        // var perp = v.subtracted(proj);

        var perp = this.c.added(v).perpendicularOnWall(this.wall);
        
        perp.redraw(this.grid, this.c.added(v), "Red")
    }
}

export {Projection as default}