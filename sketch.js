
const { Engine, World, Bodies, Mouse, MouseConstraint, Constraint } = Matter;
const Events = Matter.Events;
var ground;
const boxes = [];
var bola = [];
var world, engine;
var mConstraint;
var slingshot = [];
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
    console.log(Matter);
    const canvas = createCanvas(windowWidth, windowHeight - 4);
    engine = Engine.create();
    world = engine.world;
    ground = new Ground(width / 2, height - 10, width, 20);
    //creación de la primera bola
    bola[1] = new Bola(tamanioAncho, tamanioAlto, tamanioBola);
    //creación de la onda que lanzará las bolas
    slingshot[1] = new SlingShot(tamanioAncho,tamanioAlto, bola[1].body);

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
    for (var box of boxes) {
        box.show();
    }
    //slingshot[0].show();
    slingshot[1].show();
    //bola[1].show();
    for ( i = 1 ; i < contadorBolas ; i++ ) {
      bola[i].show();
   }
}

// function keyPressed() {
//     if (key == ' ') {
//         //World.remove(world, bola[0].body);
//         World.remove(world, bola[1].body);
//         bola[1] = new Bola(tamanioAncho, tamanioAlto, tamanioBola);
//         //bola[0] = new Bola(windowWidth * 0.85, windowHeight * 0.70, tamanioBola);
//         //slingshot[0].attach(bola[0].body);
//         slingshot[1].attach(bola[1].body);
//     }
//
// }

//
function mouseReleased() {
    setTimeout(() => {
        slingshot[1].fly();
        setTimeout( () => {
           bola[contadorBolas] = new Bola (tamanioAncho, tamanioAlto, tamanioBola);
           draw();
           slingshot[1].attach(bola[contadorBolas].body);
           contadorBolas++;
        }, 300);
    }, 50);
}
//
// Events.on(mConstraint, 'tick', (event) => {
//
//   if (engine.input.mouse.button === -1 && (rock.position.x > 190 || rock.position.y < 330)) {
//     rock = Bodies.polygon(170, 350, 20, 35, rockOptions);
//     ball.push(elastic.bodyB)
//     World.add(engine.world, rock);
//     elastic.bodyB = rock;
//   }
// });
//
// Events.on(mConstraint, 'tick', (event) => {
//        setTimeout(() => {
//            slingshot[1].fly();
//            setTimeout( () => {
//               bola[contadorBolas] = new Bola (tamanioAncho, tamanioAlto, tamanioBola);
//               draw();
//               slingshot[1].attach(bola[contadorBolas].body);
//               contadorBolas++;
//            }, 300);
//        }, 50);
// } );
