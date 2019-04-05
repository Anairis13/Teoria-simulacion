
const {World, Bodies, Mouse, MouseConstraint, Constraint } = Matter;
var   Events = Matter.Events,
      Engine = Matter.Engine;
var ground;
const boxes = [];
var bola = [];
var world, engine;
var mConstraint;
var slingshot;
var tamanioBola;
var ballImg;
var tamanioAncho;
var tamanioAlto;
var contadorBolas = 2;

function preload() {
    ballImg = loadImage('ball.png');
}

$(document).ready(function() {
   if ( windowWidth < 500 ) {
      tamanioBola = windowWidth * 0.04;
      tamanioAncho = windowWidth*0.25;
   } else{
      if (windowWidth < 900) {
         tamanioBola = windowWidth * 0.03;
         tamanioAncho = windowWidth*0.18;
      } else {
         tamanioBola = windowWidth * 0.020;
         tamanioAncho = windowWidth*0.15;
      }
   }

   if ( windowHeight < 500 ) {
      console.log(windowHeight);
      tamanioAlto = windowHeight*0.69 ;
   } else{
      if (windowHeight < 900) {
         console.log(windowHeight);
         tamanioAlto = windowHeight*0.75;
      } else {
         console.log(windowHeight);
         tamanioAlto = windowHeight*0.81;
      }
   }
});


function setup() {
    const canvas = createCanvas(windowWidth, windowHeight - 4);
    engine = Engine.create();
    console.log(engine);
    world = engine.world;
    ground = new Ground(width / 2, height - 10, width, 20);
    //creación de la primera bola
    bola[1] = new Bola(tamanioAncho, tamanioAlto, tamanioBola);
    //creación de la onda que lanzará las bolas
    slingshot = new SlingShot(tamanioAncho,tamanioAlto, bola[1].body);

    const mouse = Mouse.create(canvas.elt);
    const options = {
        mouse: mouse
    }

    mouse.pixelRatio = pixelDensity();
    mConstraint = MouseConstraint.create(engine, options);
    World.add(world, mConstraint);
}


function draw() {
    background(255)
    Matter.Engine.update(engine);
    ground.show();
    // for (var box of boxes) {
    //     box.show();
    // }
    slingshot.show();
    for ( i = 1 ; i < contadorBolas ; i++ ) {
      bola[i].show();
   }
   // if (mConstraint.body){
   //    var position = mConstraint.body.position;
   //    var m = mConstraint.mouse.position;
   //    var sligPosition = slingshot.sling.pointA;
   //
   //    stroke(0,255,0);
   //    line(position.x, position.y, m.x, m.y);
   //    console.log(mConstraint);
   //    // if (  mConstraint.mouse.mousedown && mConstraint.mouse.mouseEvents ) {
   //    //          console.log('arrastrar y solar');
   //    // }
   //    // //console.log(mConstraint.body);
   //
   // }
}


// Events.on(engine, 'tick', function(event) {
//     if (engine.input.mouse.button === -1 && (bola[tamanioBola].position.x > 190 || bola[tamanioBola].position.y < 330)) {
//         //bola[tamanioBola] = Bodies.polygon(170, 350, 20, 35, rockOptions);
//         // ball.push(elastic.bodyB)
//         // World.add(engine.world, rock);
//         // elastic.bodyB = rock;
//         console.log(engine);
//         console.log(event)
//     }
// });

function mouseReleased( event ) {
      //console.log(event);
      if (mConstraint.body){
         // var position = mConstraint.body.position;
         // var m = mConstraint.mouse.position;
         // var sligPosition = slingshot.sling.pointA;
         //
         // stroke(0,255,0);
         // line(position.x, position.y, m.x, m.y);
         console.log(mConstraint);
         // if (  mConstraint.mouse.mousedown && mConstraint.mouse.mouseEvents ) {
         //          console.log('arrastrar y solar');
         // }
         // //console.log(mConstraint.body);
         setTimeout(() => {
          slingshot.fly();
          setTimeout( () => {
                bola[contadorBolas] = new Bola (tamanioAncho, tamanioAlto, tamanioBola);
                draw();
                slingshot.attach(bola[contadorBolas].body);
                contadorBolas++;
             }, 300);
         }, 50);
         console.log('soltar');

      }


}
