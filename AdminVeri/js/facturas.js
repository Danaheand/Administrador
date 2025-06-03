// Este archivo JavaScript tiene el código necesario para manejar las facturas,
// tales como obtener la lista de facturas, ver detalles y anular facturas.

$(document).ready(function() {
    // Llamada para obtener las facturas al cargar la página
    obtenerFacturas();
});

// Función para obtener las facturas
function obtenerFacturas() {
    $.ajax({
        url: '/Facturas/Index',  // Ruta para obtener la lista de facturas
        method: 'GET',
        success: function(facturas) {
            if (facturas.length > 0) {
                var facturasHtml = `
                    <table class="table table-striped table-hover shadow-sm rounded">
                        <thead class="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Cliente</th>
                                <th>Fecha</th>
                                <th>Total</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                `;
                facturas.forEach(function(factura) {
                    facturasHtml += `
                        <tr>
                            <td>${factura.FacNumero}</td>
                            <td>${factura.UsuCiRuc}</td>
                            <td>${factura.FacFecha}</td>
                            <td>$${factura.FacTotal}</td>
                            <td>${factura.FacEstado === "PEN" ? "Pendiente" : "Anulada"}</td>
                            <td>
                                <button class="btn btn-info btn-sm" onclick="verDetalle('${factura.FacNumero}')">Ver Detalle</button>
                                <button class="btn btn-danger btn-sm" onclick="anularFactura('${factura.FacNumero}')">Anular</button>
                            </td>
                        </tr>
                    `;
                });
                facturasHtml += `</tbody></table>`;
                $('#facturasTableContainer').html(facturasHtml);
            } else {
                $('#messageContainer').html('<div class="alert alert-info text-center">No se encontraron facturas.</div>');
            }
        },
        error: function() {
            $('#messageContainer').html('<div class="alert alert-danger text-center">Ocurrió un error al cargar las facturas.</div>');
        }
    });
}

// Función para ver el detalle de una factura
function verDetalle(facNumero) {
    $.ajax({
        url: '/Facturas/Detalle',  // Ruta para obtener los detalles de la factura
        method: 'GET',
        data: { facNumero: facNumero },
        success: function(detalle) {
            var detalleHtml = `
                <div class="card p-4 shadow-sm rounded">
                    <h3>Detalle de la Factura #${detalle.FacNumero}</h3>
                    <p><strong>Cliente:</strong> ${detalle.UsuCiRuc}</p>
                    <p><strong>Fecha:</strong> ${detalle.FacFecha}</p>
                    <p><strong>Total:</strong> $${detalle.FacTotal}</p>
                    <p><strong>Estado:</strong> ${detalle.FacEstado === "PEN" ? "Pendiente" : "Anulada"}</p>
                    <h5>Productos:</h5>
                    <table class="table table-striped">
                        <thead class="table-dark">
                            <tr>
                                <th>Nombre</th>
                                <th>Cantidad</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
            `;
            detalle.Productos.forEach(function(producto) {
                detalleHtml += `
                    <tr>
                        <td>${producto.ProdNombre}</td>
                        <td>${producto.Cantidad}</td>
                        <td>$${producto.Total}</td>
                    </tr>
                `;
            });
            detalleHtml += `</tbody></table>`;
            $('#detalleFacturaContainer').html(detalleHtml);
        },
        error: function() {
            $('#detalleFacturaContainer').html('<div class="alert alert-danger">No se pudo obtener el detalle de la factura.</div>');
        }
    });
}

// Función para anular una factura
function anularFactura(facNumero) {
    if (confirm("⚠️ ¿Está seguro que desea anular esta factura? Esta acción no se puede deshacer.")) {
        $.ajax({
            url: '/Facturas/Anular',  // Ruta para anular la factura
            method: 'POST',
            data: { facNumero: facNumero },
            success: function(response) {
                alert(response.Mensaje);
                obtenerFacturas();  // Actualizar la lista de facturas después de anular
            },
            error: function() {
                alert("Error al intentar anular la factura.");
            }
        });
    }
}
