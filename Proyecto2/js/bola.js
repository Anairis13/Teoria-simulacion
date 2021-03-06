class Bola {
    constructor(x, y, r) {
        const options = {
            restitution: 0.9
        }
        this.body = Matter.Bodies.circle(x, y, r, options);
        Matter.Body.setMass(this.body, this.body.mass * 4);
        Matter.World.add(world, this.body);
        this.r = r;
    }

    show() {
        const pos = this.body.position;
        const angle = this.body.angle;
        //fill(120);
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(ballImg, 0, 0, this.r * 2, this.r * 2);
        pop();

    }
}
