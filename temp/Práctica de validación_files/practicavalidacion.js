/*function validateCIF(value, element, param) {
 //Quitamos el primer caracter y el ultimo digito 
 var valueCif = value.substr(1, value.length - 2);
 var suma = 0;
 //Sumamos las cifras pares de la cadena 
 for (i = 1; i < valueCif.length; i = i + 2) {
 suma = suma + parseInt(valueCif.substr(i, 1));
 }
 var suma2 = 0;
 //Sumamos las cifras impares de la cadena 
 for (i = 0; i < valueCif.length; i = i + 2) {
 result = parseInt(valueCif.substr(i, 1)) * 2;
 if (String(result).length == 1) {
 // Un solo caracter 
 suma2 = suma2 + parseInt(result);
 } else {
 // Dos caracteres. Los sumamos... 
 suma2 = suma2 + parseInt(String(result).substr(0, 1))
 + parseInt(String(result).substr(1, 1));
 }
 }
 // Sumamos las dos sumas que hemos realizado 
 suma = suma + suma2;
 var unidad = String(suma).substr(1, 1);
 unidad = 10 - parseInt(unidad);
 var primerCaracter = value.substr(0, 1).toUpperCase();
 if (primerCaracter.match(/^[FJKNPQRSUVW]$/)) {
 //Empieza por .... Comparamos la ultima letra 
 if (String.fromCharCode(64 + unidad).toUpperCase() == value.substr(
 value.length - 1, 1).toUpperCase())
 return true;
 } else if (primerCaracter.match(/^[XYZ]$/)) {
 //Se valida como un dni 
 var newcif;
 if (primerCaracter == "X")
 newcif = value.substr(1);
 else if (primerCaracter == "Y")
 newcif = "1" + value.substr(1);
 else if (primerCaracter == "Z")
 newcif = "2" + value.substr(1);
 return validateDNI(newcif);
 } else if (primerCaracter.match(/^[ABCDEFGHLM]$/)) {
 //Se revisa que el ultimo valor coincida con el calculo 
 if (unidad == 10)
 unidad = 0;
 if (value.substr(value.length - 1, 1) == String(unidad))
 return true;
 } else {
 //Se valida como un dni 
 return validateDNI(value,element,param);
 }
 return false;
 }*/
function validateCIF(value, element, param) {
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
  if (control != value.charAt(8)) {
    //alert("El Cif no es válido"); 
    return false;
  }
  //alert("El Cif es válido"); 
  return true;
}
function validateDNI(value, element, param) {
  var lockup = 'TRWAGMYFPDXBNJZSQVHLCKE';
  var valueDni = value.substr(0, value.length - 1);
  var letra = value.substr(value.length - 1, 1).toUpperCase();
  if (lockup.charAt(valueDni % 23) == letra)
    return true;
  return false;
}
function validateIBAN(value, element, param) {
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
function contrasenaCompleja(value, element, param) {
  if (value.length < 8)
    return false;
  if (value.match(/[0-9]+/) == null)
    return false;
  if (value.match(/[a-z]+/) == null)
    return false;
  if (value.match(/[A-Z]+/) == null)
    return false;
  return true;

}
$(document).ready(function() {
  $("#formulario").validate({
    onkeyup: false,
    onfocusout: false,
    onclick: false,
    rules: {
      nombre: {
        required: true,
        lettersonly: true
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
      emailRep: {
        required: true,
        equalTo: email
      },
      tipoeEmpresa: {
        required: true
      },
      cifnif: {
        required: true,
        esDNI: function() {
          if ($("input:radio[name=tipoEmpresa]:checked").val() == "particular") {
            return true
          }
        },
        esCIF: function() {
          if ($("input:radio[name=tipoEmpresa]:checked").val() == "empresa") {
            return true
          }
        },
        remote: function() {
          if ($("input:radio[name=tipoEmpresa]:checked").val() == "particular") {
            return "php/validar_nif_db.php"
          }
        }
      },
      nombreempresa: {
        required: true
      },
      direccion: {
        required: true
      },
      cp: {
        required: true,
        digits: true,
        minlength: 4,
        maxlength: 5
      },
      localidad: {
        required: true
      },
      provincia: {
        required: true
      },
      pais: {
        required: true
      },
      iban: {
        required: true,
        esIban: true
      },
      pago: {
        required: true
      },
      usuario: {
        required: true
      },
      pass: {
        required: true,
        esCompleja: true
      },
      passRep: {
        equalTo: pass
      }
    },
    messages: {
      nombre: {
        lettersonly: "Sólo letras"
      },
      apellidos: {
        lettersonly: "Sólo letras"
      },
      telefono: {
        digits: "Sólo números",
        minlength: "debe tener 9 dígitos",
        maxlength: "debe tener 9 dígitos"
      },
      email: {
        email: "email no válido",
        remote: "email ya resgistrado"
      },
      emailRep: {
        equalTo: "emails no coinciden"
      },
      cifnif: {
        remote: "documento ya registrado"
      },
      cp: {
        digits: "debe ser numérico de 4 o 5 dígitos",
        minlength: "debe ser numérico de 4 o 5 dígitos",
        maxlength: "debe ser numérico de 4 o 5 dígitos"
      },
      passRep: {
        equalTo: "Las contraseñas no coinciden"
      }
    },
    submitHandler: function() {
      var pago = $("#pago").val();
      var cantidad;
      if (pago == "mensual")
        cantidad = "50€";
      if (pago == "trimestral")
        cantidad = "140€";
      if (pago == "anual")
        cantidad = "550€";
      if (confirm("Se va a proceder a pasarle la primera cuota de " + cantidad)) {
        form.submit();
      }
    }
  });

  $("#cp").focusout(function() {
    var caracteres = $("#cp").val();
    if (caracteres.length == 4)
      $("#cp").val("0" + caracteres);
    if ($(this).val() != "") {
      var dato = $(this).val();
      if (dato.length >= 2) {
        if (dato.substring(0, 1) != "0") {
          dato = dato.substring(0, 2);
        } else {
          dato = dato.substring(1, 2);
        }
      }
      $("#provincia").val(dato);
      var loc = $("#provincia option[value='" + dato + "']").text();
      $("#localidad").val(loc);
    }
  });
  $("#email").change(function() {
    var usuario = $(this).val();
    /*var i = email.lastIndexOf("@");
     var usuario = email.substring(0,i);*/
    if (usuario.length >= 4) {
      $("#usuario").val(usuario);
    } else {
      if (usuario.length == 3)
        $("#usuario").val(usuario + "0");
      if (usuario.length == 2)
        $("#usuario").val(usuario + "00");
      if (usuario.length == 1)
        $("#usuario").val(usuario + "000");
    }
  });
  $("input:radio[name=tipoEmpresa]").change(function() {
    var valor = $("input:radio[name=tipoEmpresa]:checked").val();
    if (valor == "empresa") {
      $(".cif").show();
      $(".nif").hide();
      $("#nombreempresa").val("");
    }
    if (valor == "particular") {
      $(".nif").show();
      $(".cif").hide();
      var nombre = $("#nombre").val();
      var apellidos = $("#apellidos").val();
      $("#nombreempresa").val(nombre + " " + apellidos);
    }
  });
  $("#nombre,#apellidos").change(function() {
    if ($("input:radio[name=tipoEmpresa]:checked").val() == "particular") {
      var nombre = $("#nombre").val();
      var apellidos = $("#apellidos").val();
      $("#nombreempresa").val(nombre + " " + apellidos);
    }
  });
  $.validator.addMethod("esIban", validateIBAN, "El nº IBAN introduco no es correcto");
  $.validator.addMethod("esCompleja", contrasenaCompleja, "La contraseña debe contener 8 caracteres, al menos un n&uacute;mero, una may&uacute;scula y una min&uacute;scula");
  $.validator.addMethod("esDNI", validateDNI, "El DNI no es válido");
  $.validator.addMethod("esCIF", validateCIF, "El CIF no es válido");
  /*$("#formulario input:button").click(function(){
   var pago = $("#pago").val();
   var cantidad;
   if(pago=="mensual") cantidad = "50€";
   if(pago=="trimestral") cantidad = "140€";
   if(pago=="anual") cantidad = "550€";
   var seguir = confirm("Se va a proceder a pasarle la primera cuota de "+cantidad);
   if(seguir==true){
   $.ajax({
   type: "POST",
   url:"redireccion.html"
   });
   }
   });*/
})
