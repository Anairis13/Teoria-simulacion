// Angry bolas
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/138-angry-bolas.html
// https://youtu.be/TDQzoe9nslY
// https://editor.p5js.org/codingtrain/sketches/LbNt1nyxE

class Box {
  constructor(x, y, w, h) {
    const options = {
      restitution: 0.5,
      isStatic: true,
    }
    //this.body.isStatic = true;
    this.body = Matter.Bodies.rectangle(x, y, w, h, options);
    this.body.isStatic = true;
    Matter.World.add(world, this.body);
    this.w = w;
    this.h = h;

  }

  show() {
    const pos = this.body.position;
    const angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    fill(0,255,0);
    rectMode(CENTER);
    //imageMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();

  }




}
