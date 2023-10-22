import Vector from "../utility/Vector.js";
import ExplicitEuler from "../integration/ExplicitEuler.js";
import SemiImplicitEuler from "../integration/SemiImplicitEuler.js";
import PointMass from "../bodies/PointMass.js";
import Wall from "../bodies/Wall.js";
import GenericSimulation from "./GenericSimulation.js";
import Block1D from "../bodies/Block1D.js";
import PriorityQueue from "../utility/PriorityQueue.js";
import Event from "../utility/Event.js";
import BlockBlock1DCollision from "../utility/BlockBlock1DCollision.js";
import WallBlock1dCollision from "../utility/WallBlock1DCollision.js";


class CountingPi extends GenericSimulation {
    constructor(canvas, grid) {
        super(canvas, grid);

        this.context = "This simulation is from <a href=\"https://youtu.be/jsYwFizhncE?si=ksaDuLJBx4lGe-x0\">the video by 3Blue1Brown</a> about colliding blocks which \"Compute Pi\". The objects of the simulation are two blocks one of which is stationary and the other one is approaching the first one with some speed. The second object collides with the first one transferring some of its momentum with each bounce. The first object bounces of the wall and so on till the speed of the second object is such that the two objects will never meet again. Surprisingly, the total number of collisions identically matches the first digits of Pi. The greater the ratio of the mass of the second object to the first, the greater the number of collisions and the more digits of pi there are in it."
    }

    initialise() {
        this.blockA = new Block1D(
            1,
            50, 50,
            new Vector(300, 100),
            0
        );
        
        var mass = this.input_mass();
        var d = this.calc_dimensions(mass);
        this.blockB = new Block1D(
            mass,
            d, d,
            new Vector(600, 100),
            -100
        );

        this.floor = new Wall(
            new Vector(100, 100),
            new Vector(800, 100)
        );

        this.wall = new Wall(
            new Vector(100, 100),
            new Vector(100, 450)
        );

        this.pq = new PriorityQueue(Event.comparator);

        this.bodies = [this.blockA, this.blockB, this.floor, this.wall];
        
        this.alternator = 1;
        this.collision_count = 0;
        this.ctx.fillStyle = "Black";
        this.ctx.fillText("Number of collisions: " + this.collision_count, 665, 45);
    }

    step(e) {

        // var x = e.x - this.canvas.getBoundingClientRect().x - 2.727;
        // var y = this.canvas.height - (e.y - this.canvas.getBoundingClientRect().y - 2.727);

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.control == 0) {
            this.initialise();

            this.draw_bodies();

            this.prevTime = new Date().getTime();

            this.requestID = requestAnimationFrame(() => {
                this.simulate();
            });
            this.control++;

            this.block_to_block();
            
            return;
        }

        // console.log(this.pq);
        // for (var occ of this.pq) {
        //     console.log(occ);
        // }
    }

    simulate() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.draw_bodies();

        var curTime = new Date().getTime();

        this.ctx.fillStyle = "Black";
        this.ctx.fillText("Number of collisions: " + this.collision_count, 665, 45);


        while (!this.pq.isEmpty() && this.pq.peek().occursAt < curTime) {
            var event = this.pq.pop();
            this.collision_count++;
            
            if (event.occursAt != 0) {
                var dt = event.occursAt - this.prevTime;
                this.prevTime = event.occursAt;

                this.blockA.advance(dt / 1000);
                this.blockB.advance(dt / 1000);
            }

            event.resolve();

            if (this.alternator++ % 2 === 0) {
                this.block_to_block();
            } else {
                this.block_to_wall();
            }

            // if (this.pq.isEmpty()) {
            //     this.end();
            //     return;
            // }
        }

        var dt = curTime - this.prevTime;

        this.blockA.advance(dt / 1000);
        this.blockB.advance(dt / 1000);

        this.prevTime = curTime;
        this.requestID = requestAnimationFrame(() => {
            this.simulate();
        })
    }
    
    block_to_block() {
        var a = this.blockA.pos.x, b = this.blockB.pos.x; 
        var d1 = this.blockA.b/2;
        var v1 = this.blockA.velocity, v2 = this.blockB.velocity;
        
        var m1 = this.blockA.mass, m2 = this.blockB.mass;
        var t = (b - a - 2*d1) / (v1 - v2);

        if (t <= 0 || v1 == v2) {
            return;
        }

        var new_v1 = (2*m2*v2 + m1 * v1 - m2 * v1) /
        (m1 + m2) 

        var new_v2 = (2*m1*v1 + m2 * v2 - m1 * v2) /
        (m1 + m2) 
        
        this.pq.push(new BlockBlock1DCollision(
            this.blockA,
            this.blockB,
            this.prevTime + t*1000,
            new_v1,
            new_v2
        ))
    }

    block_to_wall() {
        var t = (this.wall.startPoint.x - this.blockA.pos.x) / this.blockA.velocity;
        // console.log(t);

        if (t <= 0) {
            return;
        }
        
        this.pq.push(new WallBlock1dCollision(
            this.blockA,
            this.wall,
            this.prevTime + t*1000
        ))
    }

    input_mass() {
        var power = parseInt(prompt("Type 0, 2, 4 or 6. It will represent the power of 10 which the second block takes as a mass"));
        if (isNaN(power)) {
            return 10000;
        }
        power = Math.max(Math.min(parseInt(power/2), 3), 0) * 2;
        return Math.pow(10, power);
    }

    calc_dimensions(mass) {
        return (Math.log10(mass) * 0.3 + 1) * 50;
    }
    
}


export {CountingPi as default}