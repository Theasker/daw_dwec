var nuevaVentana;
varios();
function crearNueva() {
  var opciones = "menubar=false, toolbar=false, location=false, directories=false, resizable=false,scrollbars=0,width=800,height=600";
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
  nuevaVentana.document.write("Iframe<br />");
  
  ifrm = nuevaVentana.document.createElement("IFRAME");
  nuevaVentana.name('');
  ifrm.setAttribute("src","http://www.google.com");
  ifrm.style.display = "block";
  ifrm.style.width = 800 + "px";
  ifrm.style.height = 600 + "px";
  nuevaVentana.document.body.appendChild(ifrm);
}

// Continuación del proceso del ejercicio (parte 2)
function varios(){
    var titulo = document.getElementById("titulo"); // encuentra el elemento titulo
    titulo.innerHTML = "<h1>TAREA DWEC03</h1>";  // sustituye el elemento estado
    var nomApe = window.prompt("Introduce tu nombre y apellidos");
    // Se solicita el nombre y apellidos hasta que se introduce algo
    while(!nomApe || nomApe === "" || nomApe === null){
        nomApe=window.prompt("El nombre no puede estar en blanco\nIntroduzca su nombre y apellidos");
    }
}




function cerrarNueva() {
  if (nuevaVentana) {
    nuevaVentana.close();
    nuevaVentana = null;
  }
}
