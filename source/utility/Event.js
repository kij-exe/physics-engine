

class Event {
    constructor(ball1, ball2, occuresAt) {
        this.ball1 = ball1;
        this.ball2 = ball2;

        this.occursAt = occursAt;
        this.latestKnownBall1UpdateAt = ball1.lastUpdateAt;
        this.latestKnownBall2UpdateAt = ball2.lastUpdateAt;
    }

    isValid() {
        return this.latestKnownBall1UpdateAt == this.ball1.lastUpdateAt && this.latestKnownBall2UpdateAt == this.ball2.lastUpdateAt
    }

    resolve() {
        
        // dummy resolution
        this.ball1.velocity.multiply(-1);
        this.ball2.velocity.multiply(-1);

    }
}