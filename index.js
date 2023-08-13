import Simulation from "./source/worlds/Simulation.js";
import PriorityQueue from "./source/utility/PriorityQueue.js"
import Vector from "./source/utility/Vector.js"
import Wall from "./source/bodies/Wall.js"
import Ball from "./source/bodies/Ball.js"

// var canvas = document.getElementById("canvas1");
// var ctx = canvas.getContext("2d");
// ctx.beginPath();
// ctx.arc(95, 50, 40, 0, 2 * Math.PI);
// ctx.fill();

var DOM_ids = {
    canvas_id: "canvas1"
}

var sim = new Simulation(DOM_ids);

sim.redraw();

var number = 0;

function foo(time) {
    number++;
    if (number > 2) {
        finishRoutine(time);
        return;
    }
    console.log("diff", time - (new Date().getTime() - startTime));

    requestAnimationFrame(foo);
}

var startTime = new Date().getTime();

requestAnimationFrame(foo);

function finishRoutine(accumulatedTime) {
    console.log("Time elapsed: " + (new Date().getTime() - startTime));
    
    console.log("Accumulated time: " + accumulatedTime);
}

// var pq = new PriorityQueue();

var v = new Vector(20, 10);
var c = new Vector(350, 250)
// v.redraw(sim.grid, c)

// var a = new Vector(200, 300);
// var b = new Vector(400, 400);

var a = new Vector(40, 100);
var b = new Vector(40, 500);

var wall = new Wall(a, b)
wall.redraw(sim.grid)

var k = (b.cross(c) + c.cross(a) + a.cross(b)) /
(v.cross(b) + a.cross(v))

console.log(k)

// v.multiply(k);
// v.redraw(sim.grid, c, "Red")

function change(e) {
    var x = e.x - sim.canvas.getBoundingClientRect().x - 2.727;
    var y = sim.canvas.height - (e.y - sim.canvas.getBoundingClientRect().y - 2.727);

    var v = new Vector(x, y).subtracted(c)
    // v.redraw(sim.grid, c)

    var k = (b.cross(c) + c.cross(a) + a.cross(b)) /
    (v.cross(b) + a.cross(v))

    v.multiplied(k).redraw(sim.grid, c, `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 100)`)

    new Ball()
}

sim.canvas.addEventListener("mousedown", change)

// console.log(sim.canvas.getBoundingClientRect())
