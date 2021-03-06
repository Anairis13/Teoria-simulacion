
const {World, Bodies, Mouse, MouseConstraint, Constraint, Vector } = Matter;
var   Events = Matter.Events,
      Engine = Matter.Engine;


var ground;
var box;
var bola = [];
var world, engine;
var mConstraint;
var slingshot;
var tamanioBola;
var ballImg;
var tamanioAncho;
var tamanioAlto;
var contadorBolas = 1;
var mouse;
var malla;
var Composites = Matter.Composites;
var cuadradoPrueba;
var Body = Matter.Body;
var backboard;
var group;
var particleOptions;
var cloth;
var puntuacion = 0;
var idRep = null;
// var game = new Phaser.Game(480, 320, Phaser.AUTO, null, {preload: preload, create: create, update: update});
var score=0;
var vectorA;
var vectorB;

// var group;


function preload() {
    ballImg = loadImage('ball.png');
    fondo = loadImage('img/fondoplay.jpg');
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
      tamanioAlto = windowHeight*0.69 ;
    } else{
      if (windowHeight < 900) {
          tamanioAlto = windowHeight*0.75;
      } else {
          tamanioAlto = windowHeight*0.81;
      }
    }
}

function setup() {
    const canvas = createCanvas(windowWidth, windowHeight - 4);
    engine = Engine.create();
    world = engine.world;
    ground = new Ground(width / 2, height , width, 20);
    //creación de la primera bola
    bola[0] = new Bola(windowWidth - tamanioAncho, tamanioAlto, tamanioBola);
    //box = new Box(windowWidth - tamanioAncho, windowHeight  - tamanioAlto, tamanioBola*3, 10);
    //creación de la onda que lanzará las bolas
    slingshot = new SlingShot(windowWidth - tamanioAncho,tamanioAlto, bola[0].body);
    //cuadradoPrueba = rect(200, 200, 50, 100 );
    // console.log(cuadradoPrueba);

    console.log(bola[contadorBolas - 1]);
    /********************************************************************************/

   group = Body.nextGroup(true);
   particleOptions = { friction: 0.00001, collisionFilter: { group: group}, render: { visible: true } };
   cloth = Composites.softBody(95, 150, 5, 5, 8, 5, false, tamanioBola*0.2, particleOptions);
   backboard = new Box (100, 100, 1, 110 );

   cloth.bodies[0].isStatic = true;
   cloth.bodies[4].isStatic = true;
   World.add(world, cloth);
   World.add(world, backboard);
    /*******************************************************************************/

    mouse = Mouse.create(canvas.elt);
    const options = {
        mouse: mouse
    }
    mouse.pixelRatio = pixelDensity();
    mConstraint = MouseConstraint.create(engine, options);
    World.add(world, mConstraint);
}


function draw() {
    background(106,159,167);
    Engine.update(engine);
    ground.show();
    slingshot.show();
    for ( i = 0 ; i < contadorBolas ; i++ ) {
      bola[i].show();
   }
   stroke(1);
   strokeWeight(4);
   backboard.show();

   // Creación de las lineas de la canasta
   line(cloth.bodies[0].position.x, cloth.bodies[0].position.y, cloth.bodies[4].position.x, cloth.bodies[4].position.y);
   for (var i = 0; i < cloth.bodies.length-1; i++) {
      rect(cloth.bodies[i].position.x, cloth.bodies[i].position.y, 1, 1);
      line(cloth.bodies[i].position.x, cloth.bodies[i].position.y, cloth.bodies[i+1].position.x, cloth.bodies[i+1].position.y);
   }
   line(cloth.bodies[0].position.x, cloth.bodies[0].position.y, cloth.bodies[5].position.x, cloth.bodies[5].position.y);
   line(cloth.bodies[5].position.x, cloth.bodies[5].position.y, cloth.bodies[10].position.x, cloth.bodies[10].position.y);
   line(cloth.bodies[10].position.x, cloth.bodies[10].position.y, cloth.bodies[15].position.x, cloth.bodies[15].position.y);
   line(cloth.bodies[15].position.x, cloth.bodies[15].position.y, cloth.bodies[20].position.x, cloth.bodies[20].position.y);
   line(cloth.bodies[4].position.x, cloth.bodies[4].position.y, cloth.bodies[9].position.x, cloth.bodies[9].position.y);
   line(cloth.bodies[9].position.x, cloth.bodies[9].position.y, cloth.bodies[14].position.x, cloth.bodies[14].position.y);
   line(cloth.bodies[14].position.x, cloth.bodies[14].position.y, cloth.bodies[19].position.x, cloth.bodies[19].position.y);
   line(cloth.bodies[19].position.x, cloth.bodies[19].position.y, cloth.bodies[24].position.x, cloth.bodies[24].position.y);

   // Gracias a esto tenemos en cuenta las canastas hechas por el jugador
   if (contadorBolas >= 2) {
      if (( ((bola[contadorBolas - 2 ].body.position.y) >= (cloth.bodies[0].position.y ))  &&
            ((bola[contadorBolas - 2].body.position.y ) <= (cloth.bodies[0].position.y + 10))) &&
            (((bola[contadorBolas - 2 ].body.position.x) >= (cloth.bodies[0].position.x ))  &&
            ((bola[contadorBolas - 2].body.position.x ) <= (cloth.bodies[4].position.x)) )) {
         if (idRep !== bola[contadorBolas - 2 ].body.id ) {
            puntuacion = puntuacion + 1;
            idRep = bola[contadorBolas - 2 ].body.id;
            $("#puntuacion").text(puntuacion);
         }
      }
   }
}

// como su nombre lo indica, función que nos servirá para lanzar la bola despues de arrastrarla
function mouseReleased( event ) {
   if (bola[contadorBolas - 1].body == mConstraint.body ) {
      setTimeout(() => {
       slingshot.fly();
       setTimeout( () => {
             bola[contadorBolas] = new Bola (windowWidth - tamanioAncho, tamanioAlto, tamanioBola);
             draw();
             slingshot.attach(bola[contadorBolas].body);
             contadorBolas++;
          }, 200);
      }, 70);
   }
}

// como su nombre lo indica, "escucha" el envento del mouse siendo arreatrado despues de un click con esta función manejamos el ángula y la velocidad
function mouseDragged ( event ) {
   if (bola[contadorBolas - 1].body == mConstraint.body ) {
      vectorA = slingshot.sling.pointA;
      vectorB = slingshot.sling.bodyB.position;
      $("#angulo").text((Vector.angle(vectorA, vectorB)* 57.2957).toFixed(2));
      $("#velocidad").text(sqrt(((vectorA.x - vectorB.x)*(vectorA.x - vectorB.x)) + ((vectorA.y - vectorB.y)*(vectorA.y - vectorB.y))).toFixed(2));
   }
}
