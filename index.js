import Simulation from "./source/worlds/Simulation.js";
import PriorityQueue from "./source/utility/PriorityQueue.js"

var canvas = document.getElementById("canvas1");
var ctx = canvas.getContext("2d");
ctx.beginPath();
ctx.arc(95, 50, 40, 0, 2 * Math.PI);
ctx.fill();

// var sim = new Simulation();

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

var pq = new PriorityQueue();

var aboba = function(arr) {
    for (var el of arr) {
        pq.push(el);
    }
}

aboba([27, 52, 39, 80, 71, 2, 5, 100, 12, 9])

console.log(...pq);

for (var i = 0; i < 3; i++) {
    console.log(pq.getNext())
}

console.log(...pq);