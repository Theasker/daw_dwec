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
    var fechaNac = window.prompt("Introduce la fecha que naciste (dd/mm/aa)");    
    while(!(validarFecha(fechaNac)) || isNaN(dia) || isNaN(mes)|| isNaN(anio)){
        fechaNac = window.prompt("No has introducido una fecha válida.\nIntroduce la fecha que naciste (dd/mm/aa)");
    }

}

// validación de la fecha introducida
function validarFecha(fechaNac){
    var fecha = fechaNac.split('/');
    var dia = parseInt(fecha[0]);
    var mes = parseInt(fecha[1]);
    var anio = parseInt(fecha[2]);
    var correcto = false;
    var ahora = new Date();
    if(dia<1 || dia>31 || mes<1 || mes>12 || anio<1 || anio>ahora.getFullYear()){
        correcto = false;
    }else{
        correcto = true;
        bisiesto(dia,mes,anio);
    }
    return correcto;
}

function cerrarNueva() {
  if (nuevaVentana) {
    nuevaVentana.close();
    nuevaVentana = null;
  }
}
