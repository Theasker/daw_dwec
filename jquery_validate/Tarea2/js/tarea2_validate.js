$(document).ready(function() {
  $("#formulario").validate({
    onkeyup: false,
    onfocusout: false,
    onclick: false,
    rules: {
      nombre: {
        required: true,
        lettersonly: true,
      },
      apellidos: {
        required: true,
        lettersonly: true
      },
      telefono: {
        required: true,
        digits: true,
        minlength: 9,
        maxlength: 9
      },
      email: {
        required: true,
        email: true,
        remote: "php/validar_email_db.php"
      },
      email2: {
        required: true,
        equalTo: email
      },
      demandante: {
        required: true
      },
      nif: {
        required: true,
        remote: "php/validar_nif_db.php"
      },
      razonsocial: {
        required: true
      },
      direccion: {
        required: true
      },
      localidad: {
        required: true
      },
      cp: {
        required: true,
        digits: true,
      },
      provincia: {
        required: true
      },
      pais: {
        required: true
      },
      ctacte: {
        required: true
      },
      pago: {
        required: true
      },
      usuario: {
        required: true
      },
      pass: {
        required: true
      },
      pass2: {
        equalTo: pass
      }
    },
    messages: {
      nombre: {
        lettersonly: "Sólo letras por favor"
      },
      apellidos: {
        lettersonly: "Sólo letras por favor"
      },
      telefono: {
        digits: "Sólo números por favor",
        minlength: "9 números",
        maxlength: "9 números"
      },
      email: {
        email: "el email no es correcto",
        remote: "email ya resgistrado"
      },
      nif:{
        remote: "nif/dni ya registrado"
      },
      cp: {
        digits: "Sólo números por favor",
        minlength: "5 numeros",
        maxlength: "5 numeros"
      }
    }
  });
  // Rellenamos 0 el cp hasta completar 5 dígitos
  $("#cp").focusout(function() {
    var cp = $("#cp").val();
    if (cp.length < 5){
      var num = 5 - cp.length;
      var res = "";
      for (var cont = 1; cont <= num; cont++){
        res += 0;
      }
      res += cp;
      $("#cp").val(res);
    }
  });
  
  // El campo razonsocial es la suma de los campos nombre + apellidos
  function nomape(){
    var nom = $("#nombre").val();
    var ape = $("#apellidos").val();
    nom = nom + " " + ape;
    $("#prueba").html(nom);
    $("#razonsocial").val(nom);
  }
  $("#nombre").focusout(function(){nomape()});
  $("#apellidos").focusout(function(){nomape()});
  
  // Comprobación del cambio de demandante (Particular/Empresa)
//  $("#demandante").change(function(){
//    $("#prueba").html("funciona");
//  })
});

