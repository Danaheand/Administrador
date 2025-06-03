const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json())    // <==== parse request body as JSON


// Carpeta paginas como estática
app.use('/paginas', express.static(path.join(__dirname, 'paginas')));

// Carpeta raíz para servir archivos como Dashboard.html
app.use(express.static(__dirname)); // Esto sirve todos los archivos de la raíz, incluidos Dashboard.html, Index.html

// Ruta raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'paginas', 'Index.html'));
});

// Proxy para obtener todos los productos
app.get('/api/productos', async (req, res) => {
  try {
    const response = await fetch('http://eltragolocorest.runasp.net/api/Producto'); // endpoint real
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Error al obtener productos' });
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error en /api/productos/todos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// NUEVA RUTA: Proxy para obtener producto por ID
app.get('/api/productos/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const response = await fetch(`http://eltragolocorest.runasp.net/api/Producto/${id}`);
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Producto no encontrado' });
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error en /api/productos/:id:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/api/categorias', async (req, res) => {
  try {
    const response = await fetch('http://eltragolocorest.runasp.net/api/Categoria');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error en el proxy de categorías:", error);
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
});

// Proxy para obtener todos los usuarios
app.get('/api/Usuario', async (req, res) => {
  try {
    const response = await fetch('http://eltragolocorest.runasp.net/api/Usuario'); // Cambia esta URL por la real de tu API
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Error al obtener usuarios' });
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error en /api/Usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

//proxy para obtener usuarios por cédula
app.get('/api/usuarios/:ciRuc', async (req, res) => {
  const ciRuc = req.params.ciRuc;
  try {
    const response = await fetch(`http://eltragolocorest.runasp.net/api/Usuario?ciRuc=${ciRuc}`);
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Usuario no encontrado' });
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error en /api/usuarios/:ciRuc:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

//PROXY PARA CREAR PRODUCTO
app.post('/api/Producto', async (req, res) => {
  try {
    const producto = req.body;
    const response = await fetch('http://eltragolocorest.runasp.net/api/Producto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(producto)
    });  

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const result = await response.json();
    res.status(201).json(result);
  } catch (error) {
    console.error("Error en proxy POST /api/Producto:", error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.put('/api/Producto/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const producto = req.body;

    const response = await fetch(`http://eltragolocorest.runasp.net/api/Producto/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(producto)
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    // En PUT, si el backend devuelve 204 No Content, no hay body
    if (response.status === 204) {
      return res.sendStatus(204);
    }

    const result = await response.json();
    res.status(200).json(result);

  } catch (error) {
    console.error("❌ Error en proxy PUT /api/Producto/:id:", error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
