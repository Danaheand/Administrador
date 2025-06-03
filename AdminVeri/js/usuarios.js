$(document).ready(function() {
    // Llamar a la función para cargar los usuarios cuando se cargue la página
    obtenerUsuarios();
});

// Función para obtener la lista de usuarios
function obtenerUsuarios() {
    $.ajax({
        url: 'http://eltragolocorest.runasp.net/api/Usuario', // Ruta que obtiene todos los usuarios
        method: 'GET',
        success: function(usuarios) {
            if (usuarios.length > 0) {
                let usuariosHtml = `
                    <table class="table table-striped table-hover shadow-sm rounded">
                        <thead class="table-dark">
                            <tr class="text-center">
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Teléfono</th>
                                <th>Ciudad</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                `;
                usuarios.forEach(function(usuario) {
                    usuariosHtml += `
                        <tr class="text-center align-middle">
                            <td>${usuario.UsuNombre}</td>
                            <td>${usuario.UsuEmail}</td>
                            <td>${usuario.UsuTelefono}</td>
                            <td>${usuario.UsuCiudad}</td>
                            <td>
                                <a href="/Admin/EditarUsuario?id=${usuario.UsuCiRuc}" class="btn btn-warning btn-sm fw-bold me-2">✏️ Editar</a>
                                <a href="/Admin/DetalleUsuario?id=${usuario.UsuCiRuc}" class="btn btn-info btn-sm fw-bold me-2">🔍 Ver</a>
                                <a href="#" class="btn btn-danger btn-sm fw-bold" onclick="eliminarUsuario('${usuario.UsuCiRuc}', '${usuario.UsuNombre}')">🗑️ Eliminar</a>
                            </td>
                        </tr>
                    `;
                });
                usuariosHtml += `</tbody></table>`;
                $('#usuariosTableContainer').html(usuariosHtml);
            } else {
                $('#usuariosTableContainer').html('<div class="alert alert-info text-center">No hay usuarios registrados todavía.</div>');
            }
        },
        error: function() {
            $('#usuariosTableContainer').html('<div class="alert alert-danger text-center">Ocurrió un error al cargar los usuarios.</div>');
        }
    });
}

// Función para eliminar un usuario
function eliminarUsuario(ciRuc, nombre) {
    if (confirm(`⚠️ ¿Estás seguro que deseas eliminar el usuario "${nombre}"? Esta acción no se puede deshacer.`)) {
        $.ajax({
            url: `/Admin/EliminarUsuario?id=${ciRuc}`,  // Ruta para eliminar usuario
            method: 'POST',
            success: function(response) {
                alert(response.Mensaje);
                obtenerUsuarios();  // Recargar la lista de usuarios después de eliminar
            },
            error: function() {
                alert("Error al intentar eliminar el usuario.");
            }
        });
    }
}
