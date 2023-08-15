import Simulation from "./source/worlds/Simulation.js";
import PriorityQueue from "./source/utility/PriorityQueue.js"
import Vector from "./source/utility/Vector.js"
import Wall from "./source/bodies/Wall.js"
import Ball from "./source/bodies/Ball.js"
import Projection from "./source/worlds/Projection.js"
import Raycast from "./source/worlds/Raycast.js"

// var canvas = document.getElementById("canvas1");
// var ctx = canvas.getContext("2d");
// ctx.beginPath();
// ctx.arc(95, 50, 40, 0, 2 * Math.PI);
// ctx.fill();

var DOM_ids = {
    canvas_id: "canvas1"
}

var sim = new Simulation(DOM_ids);

// sim.redraw();

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

sim.grid.ctx.lineWidth = 3;

var v = new Vector(20, 10);
var c = new Vector(350, 250);

// v.redraw(sim.grid, c)

// var a = new Vector(200, 300);
// var b = new Vector(400, 400);

var a;
var b;

var c;

var wall;

var k;

// var k = (b.cross(c) + c.cross(a) + a.cross(b)) /
// (v.cross(b) + a.cross(v))

console.log(k)

// v.multiply(k);
// v.redraw(sim.grid, c, "Red")

var control = 0;

function raycast(e) {
    var x = e.x - sim.canvas.getBoundingClientRect().x - 2.727;
    var y = sim.canvas.height - (e.y - sim.canvas.getBoundingClientRect().y - 2.727);

    sim.ctx.clearRect(0, 0, sim.canvas.width, sim.canvas.height)

    if (control == 0) {
        a = new Vector(x, y);
        control++;
        return;
    }

    if (control == 1) {
        b = new Vector(x, y);
        wall = new Wall(a, b);
        wall.redraw(sim.grid);
        control++;
        return;
    }

    wall.redraw(sim.grid);

    if (control == 2) {
        c = new Vector(x, y);
        control++;
        return;
    }


    var v = new Vector(x, y).subtracted(c)
    // v.redraw(sim.grid, c)

    var k = (b.cross(c) + c.cross(a) + a.cross(b)) /
    (v.cross(b) + a.cross(v))

    // v.multiplied(k).redraw(sim.grid, c, `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 100)`)

    v.multiplied(k).redraw(sim.grid, c)

    new Ball(30, v.multiplied(k).added(c)).redraw(sim.grid)
}

function projection(e) {
    var x = e.x - sim.canvas.getBoundingClientRect().x - 2.727;
    var y = sim.canvas.height - (e.y - sim.canvas.getBoundingClientRect().y - 2.727);

    sim.ctx.clearRect(0, 0, sim.canvas.width, sim.canvas.height)

    if (control == 0) {
        a = new Vector(x, y);
        c = a;
        control++;
        return;
    }

    if (control == 1) {
        b = new Vector(x, y);
        wall = new Wall(a, b);
        wall.redraw(sim.grid);
        control++;
        return;
    }

    wall.redraw(sim.grid);

    var v = new Vector(x, y).subtracted(c)
    v.redraw(sim.grid, c)

    var ab = b.subtracted(a);

    var k = ab.dot(v) / ab.lengthSquared();

    var proj = ab.multiplied(k)

    proj.redraw(sim.grid, c, "Red")

    var perp = v.subtracted(proj);
    
    perp.redraw(sim.grid, c.added(proj), "Red")
}

// sim.canvas.addEventListener("mousedown", projection)

document.getElementById("button_clear").addEventListener(
    "click",
    () => {
        if (world) {
            world.end();
        }
    }
)

var world;

function startWorld(newWorld) {
    if (world) {
        world.end();
    }
    world = newWorld;
    world.start();
}

document.getElementById("projection").addEventListener(
    "click",
    () => {
        startWorld(new Projection(sim.canvas, sim.grid));
    }
)

document.getElementById("raycast").addEventListener(
    "click",
    () => {
        startWorld(new Raycast(sim.canvas, sim.grid));
    }
)
