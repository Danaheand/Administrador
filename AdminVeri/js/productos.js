const apiUrl = "/api/productos";  // Ajusta esta URL si tu API está en otra ruta

// Crear producto
$('#productoForm').on('submit', function (e) {
    e.preventDefault();

    const nombre = $('input[name="ProdNombre"]').val();
    const descripcion = $('textarea[name="ProdDescripcion"]').val();
    const precio = $('input[name="ProdPrecio"]').val();
    const stock = $('input[name="ProdStock"]').val();
    const categoria = $('select[name="CatId"]').val();
    const imagen = $('input[name="ProdImg"]')[0].files[0];

    if (!nombre || !descripcion || !precio || !stock || !categoria || !imagen) {
        alert("⚠️ Todos los campos son obligatorios.");
        return;
    }

    const formData = new FormData();
    formData.append("ProdNombre", nombre);
    formData.append("ProdDescripcion", descripcion);
    formData.append("ProdPrecio", precio);
    formData.append("ProdStock", stock);
    formData.append("CatId", categoria);
    formData.append("ProdImg", imagen);

    $.ajax({
        url: `${apiUrl}/crear`,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function () {
            alert("✅ Producto creado con éxito.");
            window.location.href = "/paginas/Productos/Index.html";
        },
        error: function () {
            alert("❌ Hubo un error al crear el producto.");
        }
    });
});

// Mostrar productos
function obtenerProductos() {
    $.ajax({
        url: `${apiUrl}/todos`,
        method: 'GET',
        success: function (productos) {
            let productosHtml = '';
            productos.forEach(function (producto) {
                productosHtml += `
                    <div class="producto card mb-3 p-3 shadow-sm">
                        <h3>${producto.prodNombre}</h3>
                        <p>${producto.prodDescripcion}</p>
                        <p><strong>Precio:</strong> $${producto.prodPrecio}</p>
                        <p><strong>Stock:</strong> ${producto.prodStock}</p>
                        <p><strong>Categoría:</strong> ${producto.catNombre || producto.prodCategoria}</p>
                        <img src="${producto.prodImg}" alt="Imagen del Producto" class="img-fluid" style="max-width: 200px;" />
                    </div>
                `;
            });
            $('#productosList').html(productosHtml);
        },
        error: function () {
            alert("❌ Error al obtener productos.");
        }
    });
}

// Llamar a obtenerProductos al cargar la página
$(document).ready(function () {
    if ($('#productosList').length) {
        obtenerProductos();
    }
});

// Navegación de botones
$('#manageProductsBtn').on('click', function () {
    window.location.href = "/paginas/Productos/Index.html";
});

$('#viewClientsBtn').on('click', function () {
    window.location.href = "/paginas/Usuarios/Index.html";
});

$('#viewInvoicesBtn').on('click', function () {
    window.location.href = "/paginas/Facturas/Index.html";
});
