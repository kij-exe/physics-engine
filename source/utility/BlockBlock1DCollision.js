import Event from "./Event.js";


class BlockBlock1DCollision extends Event {
    constructor(block1, block2, occursAt, v1, v2) {
        super(block1, block2, occursAt);
        this.v1 = v1;
        this.v2 = v2;
    }

    resolve() {
        this.body1.velocity = this.v1;
        this.body2.velocity = this.v2;
    }

    static comparator(event1, event2) {
        return event1.occursAt - event2.occursAt;
    }
}

export {BlockBlock1DCollision as default};