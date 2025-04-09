document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});

function loadProducts() {
    const productsList = document.getElementById('products-list');
    const template = document.getElementById('product-card-template').content;

    // Simulación de datos
    const products = [
        { id: 1, name: 'Sombrero Vueltiao', price: 120000, seller: 'Artesanos de Córdoba', image: '/api/placeholder/300/200' },
        { id: 2, name: 'Collar de Coral', price: 80000, seller: 'Joyeros del Caribe', image: '/api/placeholder/300/200' }
    ];

    products.forEach(product => {
        const clone = template.cloneNode(true);
        clone.querySelector('.product-name').textContent = product.name;
        clone.querySelector('.product-price').textContent = `$${product.price.toLocaleString('es-CO')}`;
        clone.querySelector('.seller-name').textContent = product.seller;
        clone.querySelector('.product-image').src = product.image;
        productsList.appendChild(clone);
    });
}
