import Event from "./Event.js";


class WallBlock1dCollision extends Event {
    constructor(body, wall, occursAt) {
        super(body, wall, occursAt);
    }

    isValid() {
    }

    resolve() {
        this.body1.velocity *= -1; 
    }

    static comparator(event1, event2) {
        return event1.occursAt - event2.occursAt;
    }
}

export {WallBlock1dCollision as default};