
  function cerrarSesion() {
    localStorage.removeItem("isAdmin");
    window.location.href = "/Index.html";
  }

  function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu.style.display === 'none' || menu.style.display === '') {
      menu.style.display = 'block';
    } else {
      menu.style.display = 'none';
    }
  }

  // Cierra el menú si se hace clic fuera de él o del botón
  document.addEventListener('click', function(event) {
    const menu = document.getElementById('mobileMenu');
    const toggleBtn = document.querySelector('.menu-toggle');
    if (!menu.contains(event.target) && !toggleBtn.contains(event.target)) {
      menu.style.display = 'none';
    }
  });
