
const { Engine, World, Bodies, Mouse, MouseConstraint, Constraint } = Matter;

var ground;
const boxes = [];
var bird;
var world, engine;
var mConstraint;
var slingshot;

function setup() {
   console.log(Matter);
  const canvas = createCanvas(windowWidth, windowHeight-4);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width / 2, height - 10, width, 20);
  for (let i = 0; i < 3; i++) {
    boxes[i] = new Box(windowWidth*0.8, windowHeight*0.8 - i * windowHeight*0.1 , windowHeight*0.10,  windowWidth*0.08);
  }
  bird = new Bird(windowWidth*0.15, windowHeight*0.70, windowWidth*0.015);

  slingshot = new SlingShot(windowWidth*0.15, windowHeight*0.70, bird.body);

  const mouse = Mouse.create(canvas.elt);
  const options = {
    mouse: mouse,
   }

   mouse.pixelRatio = pixelDensity();
   mConstraint = MouseConstraint.create(engine, options);
   World.add(world, mConstraint);
}

function draw() {
   background(255)
  Matter.Engine.update(engine);
  ground.show();
  for (let box of boxes) {
    box.show();
  }
  slingshot.show();
  bird.show();
}

function keyPressed() {
  if (key == ' ') {
    World.remove(world, bird.body);
    bird = new Bird(windowWidth*0.15, windowHeight*0.70, windowWidth*0.01);
    slingshot.attach(bird.body);
  }

}

function mouseReleased() {
  setTimeout(() => {
    slingshot.fly();
}, 50);
}
