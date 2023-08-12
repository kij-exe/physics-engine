import Vector from "../utility/Vector.js"

class Ball {
    constructor(initialPos, initialVelocity, color="Red") {
        this.velocity = initialVelocity;
        this.color = color;
        this.pos = initialPos;
        console.log("The ball at initial position " + this.pos.toString() + " instantiated");
    }

    advance(dt) {
        this.pos.add(Vector.multiplication(this.velocity, dt));
    }
}

export {Ball as default};