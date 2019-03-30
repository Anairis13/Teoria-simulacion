
const { Engine, World, Bodies, Mouse, MouseConstraint, Constraint } = Matter;

var ground;
const boxes = [];
var bird = [];
var world, engine;
var mConstraint;
var slingshot = [];

function setup() {
   console.log(Matter);
  const canvas = createCanvas(windowWidth, windowHeight-4);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width / 2, height - 10, width, 20);
  /*for (let i = 0; i < 3; i++) {
    boxes[i] = new Box(windowWidth*0.8, windowHeight*0.8 - i * windowHeight*0.1 , windowHeight*0.10,  windowWidth*0.08);
}*/
  bird[1] = new Bird(windowWidth*0.15, windowHeight*0.70, windowWidth*0.012);
  bird[0] = new Bird(windowWidth*0.85, windowHeight*0.70, windowWidth*0.012);

  slingshot[0] = new SlingShot(windowWidth*0.85, windowHeight*0.70, bird[0].body);
  slingshot[1] = new SlingShot(windowWidth*0.15, windowHeight*0.70, bird[1].body);

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
  slingshot[0].show();
  slingshot[1].show();
  bird[0].show();
  bird[1].show();
}

function keyPressed() {
  if (key == ' ') {
    World.remove(world, bird[0].body);
    World.remove(world, bird[1].body);
    //bird = new Bird(windowWidth*0.15, windowHeight*0.70, windowWidth*0.015);
    bird[1] = new Bird(windowWidth*0.15, windowHeight*0.70, windowWidth*0.012);
    bird[0] = new Bird(windowWidth*0.85, windowHeight*0.70, windowWidth*0.012);
    slingshot[0].attach(bird[0].body);
    slingshot[1].attach(bird[1].body);
  }

}


function mouseReleased() {
  setTimeout(() => {
     slingshot[1].fly();
     slingshot[0].fly();
}, 50);
}
