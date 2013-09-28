var nuevaVentana;
//crearNueva();
varios();
//Creación de nueva ventana
function crearNueva() {
  var opciones = "menubar=false, toolbar=false, location=false, directories=false, resizable=false,scrollbars=0";
  nuevaVentana = window.open("http://www.google.es", "", opciones);
  nuevaVentana.setResizeable = false;
  nuevaVentana.resizable = false;
  nuevaVentana.document.writeln("<h3>Ejemplo de Ventana Nueva</h3>");
  nuevaVentana.document.writeln("<b>La url de la nueva ventana es:</b> ", nuevaVentana.document.URL, "<br />");
  nuevaVentana.document.writeln("<b>El protocolo usado es:</b> ", nuevaVentana.location.protocol, "<br />");
  nuevaVentana.document.writeln("<b>El navegador usado es:</b> ", nuevaVentana.navigator.appCodeName, "<br />");
  // Comprobamos La utilización de Java en la nueva ventana
  nuevaVentana.document.write("<b>Disponibilidad de Java: </b>");
  if (nuevaVentana.navigator.javaEnabled()) {
    nuevaVentana.document.write("Java SI disponible en esta ventana<br />");
  } else {
    nuevaVentana.document.write("Java NO disponible en esta ventana<br />"); 
  }
  crearFrame();
}
function crearFrame() {
    ifrm = nuevaVentana.document.createElement("iframe");
    ifrm.setAttribute("id", "idiframe");
    
    ifrm.setAttribute("src", "http://stackoverflow.com");
    ifrm.style.display = "block";
    ifrm.style.width = 800 + "px";
    ifrm.style.height = 600 + "px";
    ifrm.style.color = "red";
    nuevaVentana.document.body.appendChild(ifrm);
}

// Continuación del proceso del ejercicio (parte 2)
function varios(){
    // encuentra el elemento titulo
    document.getElementById('titulo').innerHTML="<center><h1>TAREA DWEC03</h1></center>";
    /*
    var nomApe = window.prompt("Introduce tu nombre y apellidos");
    while(!nomApe || nomApe === "" || nomApe === null){
        nomApe=window.prompt("El nombre no puede estar en blanco\nIntroduzca su nombre y apellidos");
    }
    */
    var fechaNac = window.prompt("Introduce la fecha que naciste (dd-mm-aa)");
    var fecha = fechaNac.split('/');
    var dia = parseInt(fecha[0]);
    var mes = parseInt(fecha[1]);
    var anio = parseInt(fecha[2]);
    while(!(validarFecha(dia,mes,anio)) || isNaN(dia) || isNaN(mes)|| isNaN(anio)){
        fechaNac = window.prompt("No has introducido una fecha válida.\nIntroduce la fecha que naciste (dd/mm/aa)");
    }
    alert("comprobación final");
    document.write((!(validarFecha(dia,mes,anio)) || isNaN(dia) || isNaN(mes)|| isNaN(anio)));
}

function validarFecha(dia,mes,anio){
    var correcto = false;
    var fecha = new Date();
    var diasMes = new Array();
    var errores = "";
    diasMes[1] = 31;
    diasMes[2] = 29;
    diasMes[3] = 31;
    diasMes[4] = 30;
    diasMes[5] = 31;
    diasMes[6] = 30;
    diasMes[7] = 31;
    diasMes[8] = 31;
    diasMes[9] = 30;
    diasMes[10] = 31;
    diasMes[11] = 30;
    diasMes[12] = 31;
    alert("voy a comprobar");
    if(dia<1 || dia>31 || mes<1 || mes>12 || anio<1 || anio>fecha.getFullYear()){
        correcto = false;
        errores = "NO está dentro del margen de dias de los meses\n";
        alert("comprobado y false");
    }else{
        correcto = true;
        errores += "está dentro del margen de dias de los meses\n";
        alert("dia:"+dia+"diasMes["+mes+"]:"+diasMes[mes]+".."+(dia>diasMes[mes]));
        // Comprobamos que el dia está dentro del margen de los días de cada mes
        if(dia>diasMes[mes]){
            correcto = false;
            errores += "el mes "+mes+" no tiene "+dia+" días\n";
            alert("comprobado3");
        }
    }
    alert("comprobacion 4");
    errores += errores+"("+correcto+")";
    alert(errores);
    return correcto;
}

function cerrarNueva() {
  if (nuevaVentana) {
    nuevaVentana.close();
    nuevaVentana = null;
  }
}
