var scorer=0;



function Score(){
    document.getElementById("Score").innerHTML=scorer;
    if (contadorBolas >= 2) {
        if (((bola[contadorBolas - 2 ].body.position.y) >= (cloth.bodies[0].position.y ))  &&  ((bola[contadorBolas - 2].body.position.y ) <= (cloth.bodies[0].position.y + 10))) {
           if ( ((bola[contadorBolas - 2 ].body.position.x) >= (cloth.bodies[0].position.x))  &&  ((bola[contadorBolas - 2].body.position.x) <= (cloth.bodies[4].position.x) )) {
            score++;
              if (idRep !== bola[contadorBolas - 2 ].body.id ) {
                //scoreText = game.add.text(5, 5, 'puntuacion: 0', { font: '18px Arial', fill: '#0095DD' });
                puntuacion = puntuacion + 1;
               // puntuacion+=10;
                //scoreText.setText('Points: '+puntuacion);
                //console.log('puntuacion: ' + puntuacion)
                idRep = bola[contadorBolas - 2 ].body.id;
             }

           }
        }
    }
}