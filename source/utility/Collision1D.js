import Collision1D from "./Event";
import Block1D from "../bodies/Block1D";


class Collision1D extends Event {
    constructor(body1, body2, occursAt) {
        this.body1 = body1;
        this.body2 = body2;

        this.occursAt = occursAt;
        // this.latestKnownBall1UpdateAt = ball1.lastUpdateAt;
        // this.latestKnownBall2UpdateAt = ball2.lastUpdateAt;
    }

    resolve() {
    }

    static comparator(event1, event2) {
        return event1.occursAt - event2.occursAt;
    }
}

export {Collision1D as default};