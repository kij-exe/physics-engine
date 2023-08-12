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
    console.log("diff", time - (new Date().getTime() - startTime));
    number++;
    if (number >= 2) {
        finishRoutine(time);
        return;
    }

    requestAnimationFrame(foo);
}

var startTime = new Date().getTime();

requestAnimationFrame(foo);

function finishRoutine(accumulatedTime) {
    console.log("Time elapsed: " + (new Date().getTime() - startTime));
    
    console.log("Accumulated time: " + accumulatedTime);
}

var pq = new PriorityQueue();

var arr = [5, 2, 10, 72, 53, 24, 18, 99, 10, 2, 6, 322, 228, 777, 666, 420, 5051]

for (var el of arr) {
    pq.push(el);
}

for (var el of arr) {
    console.log(pq.getNext());
}

console.log(...pq.heap)

// console.log(pq.nextIndex)


// console.log("iter ")

// for (var i = 0; i < arr.length; i++) {
//     console.log(pq.isEmpty(), pq.getNext());
// }
// console.log(pq.isEmpty(), pq.getNext())



// for (var el of pq) {
//     console.log(el);
// }

// console.log(...pq)