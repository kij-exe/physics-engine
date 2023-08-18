import Event from "./Event.js"

class WallBallCollision extends Event {
    constructor(wall, ball, occursAt) {
        this.wall = wall;
        this.ball = ball;

        this.occursAt = occursAt;
    }
}

export {WallBallCollision as default};