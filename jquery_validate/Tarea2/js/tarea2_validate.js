$("#formulario").validate({
  onkeyup: false,
  onfocusout: false,
  onclick: false,
  rules: {
    nombre: {
      required: true,
      minlength: 2
    },
    email: "required",
    comentarios: "required",
    cuenta: "cuentabanco"
  }
});


