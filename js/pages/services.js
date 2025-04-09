document.addEventListener('DOMContentLoaded', () => {
    loadServices();
});

function loadServices() {
    const servicesList = document.getElementById('services-list');
    const template = document.getElementById('service-card-template').content;

    // Simulación de datos
    const services = [
        { id: 1, name: 'Tour por Manglares', price: 80000, location: 'Cartagena', image: '/api/placeholder/300/200' },
        { id: 2, name: 'Taller de Artesanías', price: 50000, location: 'Santa Marta', image: '/api/placeholder/300/200' }
    ];

    services.forEach(service => {
        const clone = template.cloneNode(true);
        clone.querySelector('.service-name').textContent = service.name;
        clone.querySelector('.service-price').textContent = `$${service.price.toLocaleString('es-CO')}`;
        clone.querySelector('.location-name').textContent = service.location;
        clone.querySelector('.service-image').src = service.image;
        servicesList.appendChild(clone);
    });
}
