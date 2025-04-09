document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedProducts();
    loadFeaturedServices();
});

function loadFeaturedProducts() {
    const featuredProducts = document.getElementById('popular-products');
    // Simulación de productos destacados
    const products = [
        { id: 1, name: 'Hamaca Caribeña', price: 150000, image: '/api/placeholder/300/200' },
        { id: 2, name: 'Café Orgánico', price: 40000, image: '/api/placeholder/300/200' }
    ];

    products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'col-md-4';
        div.innerHTML = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="price">$${product.price.toLocaleString('es-CO')}</p>
                </div>
            </div>
        `;
        featuredProducts.appendChild(div);
    });
}

function loadFeaturedServices() {
    const featuredServices = document.getElementById('featured-services');
    // Simulación de servicios destacados
    const services = [
        { id: 1, name: 'Tour Histórico', price: 100000, image: '/api/placeholder/300/200' },
        { id: 2, name: 'Clase de Cocina', price: 60000, image: '/api/placeholder/300/200' }
    ];

    services.forEach(service => {
        const div = document.createElement('div');
        div.className = 'col-md-6';
        div.innerHTML = `
            <div class="service-card">
                <img src="${service.image}" alt="${service.name}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${service.name}</h5>
                    <p class="price">$${service.price.toLocaleString('es-CO')}</p>
                </div>
            </div>
        `;
        featuredServices.appendChild(div);
    });
}
