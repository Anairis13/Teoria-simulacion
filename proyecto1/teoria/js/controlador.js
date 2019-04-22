
$("#btn-calcular").click(function(){
    $("#contenedorTabla").css("display","none");
    $("#contenedorGrafica").css("display","none");   
    document.getElementById('cuerpoTabla').innerHTML ="";

    // variables entrada, salida, estado
    var CantidadDias = $("#dias").val(); //entrada
    var cantidadTecnicos = 4; //estado
    var JornadaTrabajo = 8; // entrada
    var ordenOrdinaria =  0.70; //estado
    var OrdenPrioritaria = 0.30; //estado
    var tiempoPrioritaria = 4; //estado
    var tiempOrdinaria = 2;  //estado
    var x = []; //salida
    var resO = 0; // resultado ordinario
    var resP = 0; //resultado Prioritario
    var porcentaje = [];
    var pT=0; //porcentaje total
    var dia = []; 
    var valor=true;
    
    // validacion de la caja de texto
    if (!/^([0-9])*$/.test(CantidadDias)){
        alert("El valor " + CantidadDias + " no es un número");
        return
      }
    
    $("#contenedorTabla").css("display","block");
    $("#contenedorGrafica").css("display","block");

    //calculo de la eficiencia 
    for (var i = 0; i < CantidadDias; i++) {
        var horasTotal = aleatorio(8,12); 
        resO = horasTotal*ordenOrdinaria;
        resP = horasTotal-resO; 
        x [i]= ((resO* tiempOrdinaria ) + ( resP*tiempoPrioritaria))/ (JornadaTrabajo*cantidadTecnicos);
        pT+=x[i];
        porcentaje[i] = x[i]*100;
        dia[i]= i;
        document.getElementById('cuerpoTabla').innerHTML +=`
        <tr>
            <td>${cantidadTecnicos}</td>
            <td>${i}</td>
            <td>${horasTotal}</td>
            <td>${porcentaje[i]}</td>
        </tr> 
        `; 
    }
    
    pT=(pT*100)/CantidadDias;
    document.getElementById('porcentaje').innerHTML =`
    El Porcentaje de ultilización total para <spam class="color">${CantidadDias}</spam> dias es: <spam class="color">${pT}% </spam>
    `;
    // grafica a imprimir
    grafica(CantidadDias,dia, porcentaje);  
          
});


    function grafica(CantidadDias,dia, porcentaje){
        var canvas = document.getElementById('myChart').getContext('2d');
        function addData(chart, label, data) {
            chart.data.labels.push(label);
            chart.data.datasets.forEach((dataset) => {
                dataset.data.push(data);
            });
            chart.update();
        }
    var myChart = new Chart(canvas, {
        type: 'line',
        data: {
        labels:["Dia "+dia[0]], 
        datasets: [{
            label: 'Eficiencia de empleados',
            data: [porcentaje[0]], //aqui tiene que ir el array de porcentaje
            backgroundColor: ['rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
            borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }           
            });
            // agregando valores a la grafica
            for (var i = 1; i < porcentaje.length; i++) {
                myChart.data.labels.push("Dia "+dia[i]);
                myChart.data.datasets.forEach((dataset) => {
                            dataset.data.push(porcentaje[i]);
                        });
                    myChart.update();
                }
                
            }
                    

    function aleatorio(minimo,maximo){
        return Math.round(Math.random() * (maximo - minimo) + minimo);
    }

  
                    