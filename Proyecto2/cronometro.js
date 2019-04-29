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
        //document.write("Se acabo el tiempo");


        setTimeout(5000);
        redireccionar();
        record();


        clearTimeOut(llamada);
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
 function redireccionar(){
       // document.getElementById("puntaje").value=score;
    window.location="index2.html"



 }
