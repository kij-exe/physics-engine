

class SemiImplicitEuler {
    constructor() {

    }

    update(body, dt) {
        var acc = body.force.multiplied(body.inverseMass);
        body.velocity.add(acc.multiplied(dt))
        body.pos.add(body.velocity.multiplied(dt))
    }
}

export {SemiImplicitEuler as default}