
const { Engine, World, Bodies, Mouse, MouseConstraint, Constraint } = Matter;

var ground;
const boxes = [];
var bird;
var world, engine;
var mConstraint;
var slingshot;

function setup() {
  const canvas = createCanvas(windowWidth - 10, windowHeight - 15);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width / 2, height - 10, width, 20);
  for (let i = 0; i < 3; i++) {
    boxes[i] = new Box(750, 300 - i * 75, 84, 100);
  }
  bird = new Bird(200, windowHeight - 200, 18);

  slingshot = new SlingShot(200, windowHeight - 200, bird.body);

  const mouse = Mouse.create(canvas.elt);
  const options = {
    mouse: mouse,
   }

   mouse.pixelRatio = pixelDensity();
   mConstraint = MouseConstraint.create(engine, options);
   World.add(world, mConstraint);
}

function draw() {
   background(0)
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
    bird = new Bird(200, windowHeight - 200, 18);
    slingshot.attach(bird.body);
  }

}

function mouseReleased() {
  setTimeout(() => {
    slingshot.fly();
}, 50);
}
