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
        minlength: 5,
        maxlength: 5
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
        required: true,
        minlength: 4
      },
      pass: {
        required: true,
        passCompleja: true
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
      nif: {
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
    if (cp.length < 5) {
      var num = 5 - cp.length;
      var res = "";
      for (var cont = 1; cont <= num; cont++) {
        res += 0;
      }
      res += cp;
      $("#cp").val(res);
    }
    if ((cp != "") && (cp.length == 5)) { // si se ha introducido algo en código postal
      var codprov = $("#cp").val();
      codprov = codprov.substr(0, 2);
      $("#provincia").val(codprov);
      var localidad = $("#provincia option[value='" + codprov + "']").text();
      $("#localidad").val(localidad);
    }
  });

  // El campo razonsocial es la suma de los campos nombre + apellidos
  function nomape() {
    var nom = $("#nombre").val();
    var ape = $("#apellidos").val();
    nom = nom + " " + ape;
    $("#prueba").html(nom);
    $("#razonsocial").val(nom);
  }
  $("#nombre").focusout(function() {
    nomape()
  });
  $("#apellidos").focusout(function() {
    nomape()
  });

  // Comprobación del cambio de demandante (Particular/Empresa)
  $(".demandante").change(function() {
    if ($("#particular").attr("checked")) {
      $(".cif").hide();
      $(".nif").show();
      nomape();
    } else if ($("#empresa").attr("checked")) {
      $(".cif").show();
      $(".nif").hide();
      $("#razonsocial").val("");
    }
  });
  
  // Se rellena automáticamente el usuario con el email. 
  // La comprobación del mínimo de 4 caráctres 
  $("#email").change(function(){
    $("#usuario").val($("#email").val());
  });
  
  //Contraseña compleja
  function passCompleja(value, element, param) {
//    if (value.length < 8){
//      return false;
//    }
    var medida = 0;
    $("#pass").complexify({}, function(valid, complexity) {
      medida = complexity;
    });
    if (medida < 30) {
      return false;
    } else {
      return true;
    }
  }
  ;

  $("#pass").change(function() {
    $("#pass").complexify({}, function(valid, complexity) {
      $("#valorpass").val(complexity);
      $("#porcentaje").html(parseFloat(complexity).toFixed(2) + "%");
    });
  });
  
    
  $.validator.addMethod("passCompleja", passCompleja, "Contraseña débil (+30%)");
});

