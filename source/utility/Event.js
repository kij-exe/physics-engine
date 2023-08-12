

class Event {
    constructor(ball1, ball2, occuresAt) {
        this.ball1 = ball1;
        this.ball2 = ball2;

        this.occursAt = occursAt;
        this.latestKnownBall1UpdateAt = ball1.lastUpdateAt;
        this.latestKnownBall2UpdateAt = ball2.lastUpdateAt;
    }

    isValid() {
    }

    resolve() {
    }
}

export {Event as default};