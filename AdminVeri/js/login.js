
$('#loginAdminForm').on('submit', function(event) {
    event.preventDefault();

    var cedula = $('input[name="cedula"]').val();
    var contrasena = $('input[name="contrasena"]').val();

    if (cedula.length < 10 || cedula.length > 13) {
        alert("La cédula o RUC debe tener entre 10 y 13 caracteres.");
        return false;
    }

    if (contrasena.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        return false;
    }

    // Aquí puedes hacer validación con backend si deseas

    // 🔁 Simulamos que es válido y redireccionamos
    window.location.href = "/Dashboard.html";
});



