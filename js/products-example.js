// Simulamos un arreglo de productos
const productosPorCategoria = {
    "Artesanías": [
      {
        nombre: "Sombrero Vueltiao",
        descripcion: "Tradicional sombrero artesanal de Córdoba",
        precio: 120000,
        region: "Córdoba",
        vendedor: "Artesanías del Caribe",
        rating: 4,
        votos: 10,
        imagen: "../assets/Products/sombrero-vueltiao/sombrero-1.png"
      },
      {
        nombre: "Hamaca Wayuu",
        descripcion: "Hamaca tejida a mano por artesanas indígenas",
        precio: 140000,
        region: "La Guajira",
        vendedor: "Tierra y Arte",
        rating: 5,
        votos: 15,
        imagen: "../assets/Products/hamaca-wayuu/hamaca-wayuu.jpeg"
      }
    ],
    "Gastronomía": [
      {
        nombre: "Arepas de Huevo",
        descripcion: "Deliciosas arepas típicas de la región Caribe",
        precio: 15000,
        region: "Cartagena",
        vendedor: "Sabores de mi Tierra",
        rating: 4,
        votos: 10,
        imagen: "../assets/Products/arepa-huevo/arepa-huevo.jpeg"
      }
    ],
  };
  
  function cargarProductos() {
      const contenedor = document.getElementById("products-list");
      const template = document.getElementById("product-template");
  
      // Limpiar contenido existente
      contenedor.innerHTML = "";
  
      // Iterar sobre los productos
      Object.values(productosPorCategoria).flat().forEach(producto => {
          const clone = template.content.cloneNode(true);
  
          // Rellenar datos del producto
          clone.querySelector(".product-image").src = producto.imagen;
          clone.querySelector(".product-name").textContent = producto.nombre;
          clone.querySelector(".product-name").href = ``;
          clone.querySelector(".product-description").textContent = producto.descripcion;
          clone.querySelector(".product-price").textContent = `$${producto.precio.toLocaleString()}`;
          clone.querySelector(".seller-name").textContent = producto.vendedor;
  
          // Agregar al contenedor
          contenedor.appendChild(clone);
      });
  
      // Actualizar contador de productos
      document.getElementById("products-count").textContent = Object.values(productosPorCategoria).flat().length;
  }
  
  // Ejecutar al cargar la página
  window.addEventListener("DOMContentLoaded", cargarProductos);