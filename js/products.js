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
      },
      {
        nombre: "Panela con Especias",
        descripcion: "Panela artesanal con clavos, canela y jengibre",
        precio: 20000,
        region: "Córdoba",
        vendedor: "Sabores Caribeños",
        rating: 4,
        votos: 7,
        imagen: "../assets/Products/panela/panelaespecia.jpeg"
      }
    ],
    "Moda": [
      {
        nombre: "Vestido de Lino Caribeño",
        descripcion: "Vestido ligero y fresco para clima cálido",
        precio: 95000,
        region: "Barranquilla",
        vendedor: "Moda Caribe",
        rating: 4,
        votos: 12,
        imagen: "../assets/Products/vestido/vestido.jpg"
      },
      {
        nombre: "Camisa Guayabera",
        descripcion: "Camisa tradicional caribeña fresca y elegante",
        precio: 110000,
        region: "Santa Marta",
        vendedor: "Estilo Caribe",
        rating: 4,
        votos: 18,
        imagen: "../assets/Products/camisa-guayabera/camisa-guayabera.avif"
      }
    ],
    "Joyería": [
      {
        nombre: "Collar de Coral",
        descripcion: "Joya hecha con coral del mar Caribe",
        precio: 85000,
        region: "Santa Marta",
        vendedor: "Joyas del Mar",
        rating: 5,
        votos: 8,
        imagen: "../assets/Products/collar-coral/collar-coral.webp"
      },
      {
        nombre: "Pulsera Wayuu",
        descripcion: "Pulsera colorida tejida a mano",
        precio: 30000,
        region: "La Guajira",
        vendedor: "Accesorios Wayuu",
        rating: 5,
        votos: 20,
        imagen: "../assets/Products/pulsera/pulsera-wayuu.jpg"
      }
    ],
    "Decoración": [
      {
        nombre: "Tapiz de Palma",
        descripcion: "Decoración hecha con palma tejida",
        precio: 75000,
        region: "Cartagena",
        vendedor: "Manos del Caribe",
        rating: 4,
        votos: 9,
        imagen: "../assets/Products/tapiz/tapiz.webp"
      },
      {
        nombre: "Totumo Decorativo",
        descripcion: "Fruta seca utilizada para crear decoraciones únicas",
        precio: 45000,
        region: "Córdoba",
        vendedor: "Arte Totumo",
        rating: 3,
        votos: 5,
        imagen: "../assets/Products/ttotumo/totumo.png"
      }
    ]
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