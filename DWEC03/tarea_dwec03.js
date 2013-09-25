var nuevaVentana;
//crearNueva();
//varios();
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
    document.getElementById('titulo').innerHTML="W3Schools";
    
    var nomApe = window.prompt("Introduce tu nombre y apellidos");
    while(!nomApe || nomApe === "" || nomApe === null){
        nomApe=window.prompt("El nombre no puede estar en blanco\nIntroduzca su nombre y apellidos");
    }
    //console.log("prueba de console.log");
    alert("final");
}




function cerrarNueva() {
  if (nuevaVentana) {
    nuevaVentana.close();
    nuevaVentana = null;
  }
}
