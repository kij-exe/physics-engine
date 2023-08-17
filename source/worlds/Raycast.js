import Vector from "../utility/Vector.js"
import Wall from "../bodies/Wall.js"
import Ball from "../bodies/Ball.js"


class Raycast {
    constructor(canvas, grid) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.grid = grid;

        this.control = 0;
        this.a;
        this.b;
        this.c;
        this.wall;

        this.r = 30;
    }

    start() {
        this.canvas.addEventListener("mousedown", (e) => {
            this.shortcut(e, this);
        });
    }ы

    shortcut(e, world) {
        world.step(e);
    }

    end() {
        this.control = 0;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.removeEventListener("mousedown", this.step);
    }

    step(e) {
        var x = e.x - this.canvas.getBoundingClientRect().x - 2.727;
        var y = this.canvas.height - (e.y - this.canvas.getBoundingClientRect().y - 2.727);

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.control == 0) {
            this.a = new Vector(x, y);
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

        if (this.control == 2) {
            this.c = new Vector(x, y);
            this.cBall = new Ball(3, this.c, this.c, "Black", true);
            this.cBall.redraw(this.grid)
            this.control++;
            return;
        }

        this.cBall.redraw(this.grid)

        var v = new Vector(x, y).subtracted(this.c)

        var r_vec = this.c.perpendicularOnWall(this.wall);
        r_vec.normalize().multiply(this.r);

        this.c.add(r_vec);

        var k = (this.b.cross(this.c) + this.c.cross(this.a) + this.a.cross(this.b)) / (v.cross(this.b) + this.a.cross(v))

        this.c.subtract(r_vec);

        v.multiplied(k).redraw(this.grid, this.c)

        new Ball(30, v.multiplied(k).added(this.c)).redraw(this.grid)
    }


}

export {Raycast as default}