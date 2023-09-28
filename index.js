import Simulation from "./source/worlds/Simulation.js";
import PriorityQueue from "./source/utility/PriorityQueue.js"
import Vector from "./source/utility/Vector.js"
import Wall from "./source/bodies/Wall.js"
import Ball from "./source/bodies/Ball.js"
import Projection from "./source/worlds/Projection.js"
import Raycast from "./source/worlds/Raycast.js"
import ThreeBody from "./source/worlds/ThreeBody.js"
import CountingPi from "./source/worlds/CountingPi.js"


var DOM_ids = {
    canvas_id: "canvas1"
}

var sim = new Simulation(DOM_ids);

// sim.start()

sim.grid.ctx.lineWidth = 3;

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

// requestAnimationFrame(foo);

function finishRoutine(accumulatedTime) {
    console.log("Time elapsed: " + (new Date().getTime() - startTime));
    
    console.log("Accumulated time: " + accumulatedTime);
}

// document.getElementById("button_pause").addEventListener(
//     "click",
//     () => {
//         sim.pause();
//     }
// )

// document.getElementById("button_start").addEventListener(
//     "click",
//     () => {
//         sim.start();
//     }
// )

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

document.getElementById("raycast").addEventListener(
    "click",
    () => {
        startWorld(new Raycast(sim.canvas, sim.grid));
    }
)


document.getElementById("projection").addEventListener(
    "click",
    () => {
        startWorld(new Projection(sim.canvas, sim.grid));
    }
)

document.getElementById("three-body").addEventListener(
    "click",
    () => {
        startWorld(new ThreeBody(sim.canvas, sim.grid));
    }
)

document.getElementById("counting-pi").addEventListener(
    "click",
    () => {
        startWorld(new CountingPi(sim.canvas, sim.grid));
    }
)

