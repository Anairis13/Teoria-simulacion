
const { Engine, World, Bodies, Mouse, MouseConstraint, Constraint } = Matter;

var ground;
const boxes = [];
var bola = [];
var world, engine;
var mConstraint;
var slingshot = [];
var tamanioBola;
var ballImg;

function preload() {
    ballImg = loadImage('ball.png');
}

$(document).ready(function() {
   if ( windowWidth < 500 ) {
      tamanioBola = windowWidth * 0.04;
   } else{
      if (windowWidth < 800) {
         tamanioBola = windowWidth * 0.03;
      } else {
         tamanioBola = windowWidth * 0.020;
      }
   }
});


function setup() {
    console.log(Matter);
    const canvas = createCanvas(windowWidth, windowHeight - 4);
    engine = Engine.create();
    world = engine.world;
    ground = new Ground(width / 2, height - 10, width, 20);

    bola[1] = new Bola(windowWidth * 0.15, windowHeight * 0.70, tamanioBola);
    bola[0] = new Bola(windowWidth * 0.85, windowHeight * 0.70, tamanioBola);

    slingshot[0] = new SlingShot(windowWidth * 0.85, windowHeight * 0.70, bola[0].body);
    slingshot[1] = new SlingShot(windowWidth * 0.15, windowHeight * 0.70, bola[1].body);

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
    for (var box of boxes) {
        box.show();
    }
    slingshot[0].show();
    slingshot[1].show();
    bola[0].show();
    bola[1].show();
}

function keyPressed() {
    if (key == ' ') {
        World.remove(world, bola[0].body);
        World.remove(world, bola[1].body);
        //bola = new bola(windowWidth*0.15, windowHeight*0.70, windowWidth*0.015);
        bola[1] = new Bola(windowWidth * 0.15, windowHeight * 0.70, tamanioBola);
        bola[0] = new Bola(windowWidth * 0.85, windowHeight * 0.70, tamanioBola);
        slingshot[0].attach(bola[0].body);
        slingshot[1].attach(bola[1].body);
    }

}


function mouseReleased() {
    setTimeout(() => {
        slingshot[1].fly();
        slingshot[0].fly();
    }, 50);
}
