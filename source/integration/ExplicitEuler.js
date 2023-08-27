

class ExplicitEuler {
    constructor() {

    }

    update(body, dt) {
        var acc = body.force.multiplied(body.inverseMass);
        body.pos.add(body.velocity.multiplied(dt))
        body.velocity.add(acc.multiplied(dt))
    }
}

export {ExplicitEuler as default}