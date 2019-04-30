var segundos = 0;
var minutos = 1;
var llamada;
var ceromin='';
var ceroseg='';
function cuentaAtras(){
    devolvercero(minutos,segundos);
    segundos = segundos % 60;
    document.getElementById("reloj").innerHTML=ceromin+minutos+':'+ceroseg+segundos;
     if (minutos ===0 && segundos ===0){
        // alert ("Se acabo el tiempo");
        // clearTimeOut(llamada);
        var fecha = new Date();
        $("#pantallaFin").css("display", "block");
        $("#actualPuntos").text(puntuacion);
        $("#actualLanzamientos").text((contadorBolas - 1));
        $("#actualFecha").text((fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear()));
        $("#actualEficiencia").text((puntuacion/(contadorBolas-1)*100).toFixed(2) + "%");

    }
    if (segundos ==0){
        minutos --;
        segundos+=60;
    }
    segundos --;
    var llamada = setTimeout(cuentaAtras,1000);
 }

 function devolvercero(minutos,segundos){
    if (minutos<10){
        ceromin='0';

    }
    if (segundos<10){
        ceroseg='0';

    }else {
        ceroseg='';
    }
     return ceroseg;return ceromin;
 }
