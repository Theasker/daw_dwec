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
        todasletras: true
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
        // comprobaremos el DNI o el NIF según se haya seleccionado en demandante
        required: true,
        validarDNI: function(){
          if ($("input:radio[name=demandante]:checked").val() == "particular"){
            return true
          }
        },
        validarCIF: function(){
          if ($("input:radio[name=demandante]:checked").val() == "empresa"){
            return true
          }
        },
        remote: function(){
          if ($("input:radio[name=demandante]:checked").val() == "particular"){
            return "php/validar_nif_db.php"
          }
        }
      },
      razonsocial: {
        required: true
      },
      direccion: {
        required: true
      },
      localidad: {
        required: true,
        todasletras: true
      },
      cp: {
        required: true,
        digits: true,
        minlength: 5,
        maxlength: 5
      },
      provincia: {
        required: true,
      },
      pais: {
        required: true,
        todasletras: true
      },
      ctacte: {
        required: true,
        validarIBAN: true
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
        validarNIF: true,
        remote: "nif/dni ya registrado"
      },
      cp: {
        digits: "Sólo números por favor",
        minlength: "5 numeros",
        maxlength: "5 numeros"
      }
    },
    submitHandler: function() {
      var pago = $("#pago").val();
      var cantidad;
      var meses;
      switch (pago) {
        case "mensual":
          cantidad = "50€";
          meses = " un mes"
          break;
        case "trimestral":
          cantidad = "140€";
          meses = " tres meses"
          break;
        case "anual":
          cantidad = "550€";
          meses = " un año"
          break;
      }
      var texto = "Se le va a registrar el usuario y pasaremos la cantidad "
      texto += cantidad + " correspondientes a" + meses;
      if (confirm(texto)) {
        alert("El usuario ha sido registrado correctamente");
        form.submit();
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
      cp = res;
      $("#cp").val(res);
    }
    //$("#prueba").html(res+" "+res.length);
    if (cp.length == 5) { // si se ha introducido algo en código postal
      //$("#prueba").html(" ");
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
    //$("#prueba").html(nom);
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
    //$("#prueba").html(valor);
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
  $("#email").change(function() {
    $("#usuario").val($("#email").val());
  });
  //////////////////////////////////////////////////////////////////////////////
  //Contraseña compleja
  function passCompleja(value, element, param) {
    var medida = 0;
    $("#pass").complexify({}, function(valid, complexity) {
      medida = complexity;
    });
    if (medida < 30) {
      return false;
    } else {
      return true;
    }
  };
  $.validator.addMethod("passCompleja", passCompleja, "Contraseña débil (+30%)"); 
  //////////////////////////////////////////////////////////////////////////////
  // Función para el porcentaje
  $("#pass").change(function() {
    $("#pass").complexify({}, function(valid, complexity) {
      $("#valorpass").val(complexity);
      $("#porcentaje").html(parseFloat(complexity).toFixed(2) + "%");
    });
  });
  //////////////////////////////////////////////////////////////////////////////
  function validarIBAN(value, element, param) {
  if (!(/^([a-zA-Z0-9]{4} ){2,8}[a-zA-Z0-9]{1,4}|[a-zA-Z0-9]{12,34}$/.test(value))) {
    return false;
  }

  // check the country code and find the country specific format
  var iban = value.replace(/ /g, '').toUpperCase(); // remove spaces and to upper case
  var countrycode = iban.substring(0, 2);
  var bbancountrypatterns = {
    'AL': "\\d{8}[\\dA-Z]{16}",
    'AD': "\\d{8}[\\dA-Z]{12}",
    'AT': "\\d{16}",
    'AZ': "[\\dA-Z]{4}\\d{20}",
    'BE': "\\d{12}",
    'BH': "[A-Z]{4}[\\dA-Z]{14}",
    'BA': "\\d{16}",
    'BR': "\\d{23}[A-Z][\\dA-Z]",
    'BG': "[A-Z]{4}\\d{6}[\\dA-Z]{8}",
    'CR': "\\d{17}",
    'HR': "\\d{17}",
    'CY': "\\d{8}[\\dA-Z]{16}",
    'CZ': "\\d{20}",
    'DK': "\\d{14}",
    'DO': "[A-Z]{4}\\d{20}",
    'EE': "\\d{16}",
    'FO': "\\d{14}",
    'FI': "\\d{14}",
    'FR': "\\d{10}[\\dA-Z]{11}\\d{2}",
    'GE': "[\\dA-Z]{2}\\d{16}",
    'DE': "\\d{18}",
    'GI': "[A-Z]{4}[\\dA-Z]{15}",
    'GR': "\\d{7}[\\dA-Z]{16}",
    'GL': "\\d{14}",
    'GT': "[\\dA-Z]{4}[\\dA-Z]{20}",
    'HU': "\\d{24}",
    'IS': "\\d{22}",
    'IE': "[\\dA-Z]{4}\\d{14}",
    'IL': "\\d{19}",
    'IT': "[A-Z]\\d{10}[\\dA-Z]{12}",
    'KZ': "\\d{3}[\\dA-Z]{13}",
    'KW': "[A-Z]{4}[\\dA-Z]{22}",
    'LV': "[A-Z]{4}[\\dA-Z]{13}",
    'LB': "\\d{4}[\\dA-Z]{20}",
    'LI': "\\d{5}[\\dA-Z]{12}",
    'LT': "\\d{16}",
    'LU': "\\d{3}[\\dA-Z]{13}",
    'MK': "\\d{3}[\\dA-Z]{10}\\d{2}",
    'MT': "[A-Z]{4}\\d{5}[\\dA-Z]{18}",
    'MR': "\\d{23}",
    'MU': "[A-Z]{4}\\d{19}[A-Z]{3}",
    'MC': "\\d{10}[\\dA-Z]{11}\\d{2}",
    'MD': "[\\dA-Z]{2}\\d{18}",
    'ME': "\\d{18}",
    'NL': "[A-Z]{4}\\d{10}",
    'NO': "\\d{11}",
    'PK': "[\\dA-Z]{4}\\d{16}",
    'PS': "[\\dA-Z]{4}\\d{21}",
    'PL': "\\d{24}",
    'PT': "\\d{21}",
    'RO': "[A-Z]{4}[\\dA-Z]{16}",
    'SM': "[A-Z]\\d{10}[\\dA-Z]{12}",
    'SA': "\\d{2}[\\dA-Z]{18}",
    'RS': "\\d{18}",
    'SK': "\\d{20}",
    'SI': "\\d{15}",
    'ES': "\\d{20}",
    'SE': "\\d{20}",
    'CH': "\\d{5}[\\dA-Z]{12}",
    'TN': "\\d{20}",
    'TR': "\\d{5}[\\dA-Z]{17}",
    'AE': "\\d{3}\\d{16}",
    'GB': "[A-Z]{4}\\d{14}",
    'VG': "[\\dA-Z]{4}\\d{16}"
  };
  var bbanpattern = bbancountrypatterns[countrycode];
  // As new countries will start using IBAN in the
  // future, we only check if the countrycode is known.
  // This prevents false negatives, while almost all
  // false positives introduced by this, will be caught
  // by the checksum validation below anyway.
  // Strict checking should return FALSE for unknown
  // countries.
  if (typeof bbanpattern !== 'undefined') {
    var ibanregexp = new RegExp("^[A-Z]{2}\\d{2}" + bbanpattern + "$", "");
    if (!(ibanregexp.test(iban))) {
      return false; // invalid country specific format
    }
  }

  // now check the checksum, first convert to digits
  var ibancheck = iban.substring(4, iban.length) + iban.substring(0, 4);
  var ibancheckdigits = "";
  var leadingZeroes = true;
  var charAt;
  for (var i = 0; i < ibancheck.length; i++) {
    charAt = ibancheck.charAt(i);
    if (charAt !== "0") {
      leadingZeroes = false;
    }
    if (!leadingZeroes) {
      ibancheckdigits += "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(charAt);
    }
  }

  // calculate the result of: ibancheckdigits % 97
  var cRest = '';
  var cOperator = '';
  for (var p = 0; p < ibancheckdigits.length; p++) {
    var cChar = ibancheckdigits.charAt(p);
    cOperator = '' + cRest + '' + cChar;
    cRest = cOperator % 97;
  }
  return cRest === 1;

}
  $.validator.addMethod("validarIBAN", validarIBAN, "El IBAN no es correcto"); 
  //////////////////////////////////////////////////////////////////////////////
  function validarDNI(value, element, param) {
    var lockup = 'TRWAGMYFPDXBNJZSQVHLCKE';
    var valueDni = value.substr(0, value.length - 1);
    var letra = value.substr(value.length - 1, 1).toUpperCase();
    if (lockup.charAt(valueDni % 23) == letra)
      return true;
    return false;
  }
  $.validator.addMethod("validarDNI", validarDNI, "DNI incorrecto");
  //////////////////////////////////////////////////////////////////////////////
  function validarCIF(value, element, param) {
    var par = 0;
    var non = 0;
    var letras = "ABCDEFGHKLMNPQS";
    var let = value.charAt(0);
    var nn;
    if (value.length != 9) {
      //alert('El Cif debe tener 9 dígitos'); 
      return false;
    }
    if (letras.indexOf(let.toUpperCase()) == -1) {
      //alert("El comienzo del Cif no es válido"); 
      return false;
    }
    for (var zz = 2; zz < 8; zz += 2) {
      par = par + parseInt(value.charAt(zz));
    }
    for (var zz = 1; zz < 9; zz += 2) {
      nn = 2 * parseInt(value.charAt(zz));
      if (nn > 9)
        nn = 1 + (nn - 10);
      non = non + nn;
    }
    var parcial = par + non;
    var control = (10 - (parcial % 10));
    if (control == 10)
      control = 0;
    if (control != value.charAt(8)) {; 
      return false;
    }
    return true;
  }
  $.validator.addMethod("validarCIF", validarCIF, "CIF incorrecto");
  //////////////////////////////////////////////////////////////////////////////
  function todasletras(value, element, param){
    var cadena = value;
    var patron = /^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ_\s]+$/;
    if (cadena.match(patron)){
        return true;
    }else{
        return false;
    }
  }
  $.validator.addMethod("todasletras",todasletras,"Por favor, introduzca sÃ³lo letras");
});

