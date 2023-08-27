import Vector from "../utility/Vector.js"
import ExplicitEuler from "../integration/ExplicitEuler.js"
import SemiImplicitEuler from "../integration/SemiImplicitEuler.js"
import PointMass from "../bodies/PointMass.js"


class ThreeBody {
    constructor(canvas, grid) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.grid = grid;

        this.control = 0;

        this.body1;
        this.body2;
        this.body3;

        this.bodies = []

        this.integrator = new SemiImplicitEuler();
        this.G = 0.1;

        this.prevTime = 0;

        this.stopped = false;
    }

    start() {
        document.getElementById("context").innerHTML = "to be added yet"

        // this.canvas.addEventListener("mousedown", (e) => {
        //     this.step(e)
        // });

        this.canvas.onmousedown = (e) => {
            this.step(e)
        }

        this.stopped = false;
    }

    end() {
        this.control = 0;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.bodies = [];
        
        this.stopped = true;
        cancelAnimationFrame(this.requestID);
    }

    step(e) {

        var x = e.x - this.canvas.getBoundingClientRect().x - 2.727;
        var y = this.canvas.height - (e.y - this.canvas.getBoundingClientRect().y - 2.727);

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.draw_bodies();

        if (this.control == 0) {
            this.body1 = new PointMass(new Vector(x,y));
            this.bodies.push(this.body1);
            this.draw_bodies();
            this.control++;
            return;
        }

        if (this.control == 1) {
            this.body2 = new PointMass(new Vector(x,y));
            this.bodies.push(this.body2);
            this.draw_bodies();
            this.control++;
            return;
        }

        if (this.control == 2) {
            this.body3 = new PointMass(new Vector(x,y));
            // this.body3.velocity =  new Vector(100, 0);
            // this.body3.force.add(new Vector(0, -200));

            this.bodies.push(this.body3);

            // var bodyA = this.bodies[0];
            // var bodyB = this.bodies[1];

            // var force = this.gravity_from_A_on_B(bodyA, bodyB);

            // console.log(force)

            // force.redraw(this.grid, bodyA.pos)

            this.prevTime = new Date().getTime();
            this.control++;
        }

        if (this.control == 3) {
            this.draw_bodies();

            this.requestID = requestAnimationFrame(() => {
                this.simulate();
            });
            this.control++;
        }

    }

    simulate() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.draw_bodies();

        for (var i = 0; i < this.bodies.length - 1; i++) {
            for (var j = i + 1; j < this.bodies.length; j++) {
                var bodyA = this.bodies[i];
                var bodyB = this.bodies[j];

                var force = this.gravity_from_A_on_B(bodyA, bodyB);

                bodyB.force.add(force);
                bodyA.force.add(force.multiplied(-1));
            }
        }

        // this.body1.force.redraw(this.grid, this.body1.pos)
        // console.log(this.body1.force);

        var curTime = new Date().getTime();
        var dt = curTime - this.prevTime;

        for (var body of this.bodies) {
            this.integrator.update(body, dt/1000);
            // body.force.redraw(this.grid, body.pos)
            body.force = new Vector(0, 0);
        }

        this.prevTime = curTime;

        this.requestID = requestAnimationFrame(() => {
            this.simulate();
        })

        if (this.stopped) {
            cancelAnimationFrame(this.requestID);
            this.stopped = false;
        }
    }

    gravity_from_A_on_B(bodyA, bodyB) {
        var distance = bodyA.pos.subtracted(bodyB.pos);

        var k = this.G * bodyA.mass * bodyB.mass /
        Math.max(Math.pow(distance.lengthSquared(), 1.3/2), Math.pow(bodyA.radius + bodyB.radius, 2));

        distance.normalize();

        return distance.multiplied(k);
    }

    draw_bodies() {
        for (var body of this.bodies) {
            body.redraw(this.grid);

            body.velocity.redraw(this.grid, body.pos)
        }
    }

}

export {ThreeBody as default}