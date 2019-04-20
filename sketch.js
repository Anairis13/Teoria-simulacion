
const {World, Bodies, Mouse, MouseConstraint, Constraint } = Matter;
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
// var group;

function preload() {
    ballImg = loadImage('ball.png');
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


    /********************************************************************************/

   group = Body.nextGroup(true);
   particleOptions = { friction: 0.00001, collisionFilter: { group: group}, render: { visible: true } };
   cloth = Composites.softBody(95, 150, 5, 5, 8, 5, false, tamanioBola*0.2, particleOptions);
   backboard = new Box (100, 100, 1, 110 );

   cloth.bodies[0].isStatic = true;
   cloth.bodies[4].isStatic = true;
   World.add(world, cloth);
   World.add(world, backboard);


   console.log(cloth.bodies[0].position.y);
    /*******************************************************************************/

    mouse = Mouse.create(canvas.elt);
    const options = {
        mouse: mouse
    }
    mouse.pixelRatio = pixelDensity();
    mConstraint = MouseConstraint.create(engine, options);
    World.add(world, mConstraint);

    console.log(bola[contadorBolas-1]);
    console.log(engine);
    console.log(cloth.bodies);
    console.log(bola);

}


function draw() {
    background(248);
    Engine.update(engine);
    ground.show();
    slingshot.show();
    for ( i = 0 ; i < contadorBolas ; i++ ) {
      bola[i].show();
   }
   stroke(0);
   strokeWeight(4);
   //box.show();
   backboard.show();
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
   // for (var i = 0; i < bola.length; i++) {
//   setTimeout( () => {
      if (contadorBolas >= 2) {
         if (((bola[contadorBolas - 2 ].body.position.y) >= (cloth.bodies[0].position.y ))  &&  ((bola[contadorBolas - 2].body.position.y ) <= (cloth.bodies[0].position.y + 10))) {
            if ( ((bola[contadorBolas - 2 ].body.position.x) >= (cloth.bodies[0].position.x))  &&  ((bola[contadorBolas - 2].body.position.x) <= (cloth.bodies[4].position.x) )) {
               // console.log('yes, we can');

               if (idRep !== bola[contadorBolas - 2 ].body.id ) {
                  puntuacion = puntuacion + 1;
                  console.log('puntuacion: ' + puntuacion)
                  idRep = bola[contadorBolas - 2 ].body.id;
               }
            }
         }
      }
//   }, 20 );
   // }
}


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
