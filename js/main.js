// Configura las rutas de las páginas
const routes = {
    '': 'home',
    '#': 'home',
    '#home': 'home',
    '#products': 'products',
    '#services': 'services',
    '#about': 'about',
    '#contact': 'contact',
    '#login': 'login',
    '#register': 'register'
};

// Componentes comunes que se cargan en todas las páginas
const commonComponents = ['header', 'footer'];

// Variables para seguimiento del estado de la aplicación
let currentPage = '';
let cartItems = [];

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    // Carga los componentes comunes (header y footer)
    loadCommonComponents();
    
    // Carga la página inicial basada en el hash actual o 'home' por defecto
    loadPage(window.location.hash);
    
    // Configura el listener para cambios de hash (navegación)
    window.addEventListener('hashchange', () => {
        loadPage(window.location.hash);
    });
    
    // Inicializa el carrito desde localStorage si existe
    initCart();
});

// Cargar los componentes comunes (header, footer)
function loadCommonComponents() {
    commonComponents.forEach(component => {
        fetch(`components/${component}.html`)
            .then(response => response.text())
            .then(html => {
                document.getElementById(`${component}-container`).innerHTML = html;
                
                // Inicializa eventos específicos del componente después de cargarlo
                if (component === 'header') {
                    initializeHeaderEvents();
                }
            })
            .catch(error => console.error(`Error loading ${component}:`, error));
    });
}

// Cargar una página específica
function loadPage(hash) {
    // Determinar qué página cargar
    const pageId = routes[hash] || routes['#' + hash.substring(1)] || 'home';
    
    if (currentPage === pageId) return; // Evitar recargar la misma página
    
    currentPage = pageId;
    
    // Cargar la página
    fetch(`pages/${pageId}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById('main-content').innerHTML = html;
            
            // Cargar estilos específicos de la página
            loadPageStyles(pageId);
            
            // Cargar scripts específicos de la página
            loadPageScripts(pageId);
            
            // Inicializar la página recién cargada
            initializePage(pageId);
            
            // Desplazar al inicio de la página
            window.scrollTo(0, 0);
        })
        .catch(error => console.error(`Error loading page ${pageId}:`, error));
}

// Cargar estilos específicos de la página
function loadPageStyles(pageId) {
    const styleContainer = document.getElementById('page-styles');
    
    // Limpiar estilos de páginas anteriores
    styleContainer.innerHTML = '';
    
    // Crear nuevo link para los estilos de la página actual
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `css/pages/${pageId}.css`;
    
    styleContainer.appendChild(link);
}

// Cargar scripts específicos de la página
function loadPageScripts(pageId) {
    const scriptContainer = document.getElementById('page-scripts');
    
    // Limpiar scripts de páginas anteriores
    scriptContainer.innerHTML = '';
    
    // Crear nuevo script para la página actual
    const script = document.createElement('script');
    script.src = `js/pages/${pageId}.js`;
    
    scriptContainer.appendChild(script);
}

// Inicializar eventos específicos del header
function initializeHeaderEvents() {
    // Actualizar contador del carrito
    updateCartCounter();
    
    // Agregar evento al botón del carrito
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', showCart);
    }
    
    // Destacar el enlace de navegación activo
    highlightActiveNavLink();
}

// Inicializar la página cargada
function initializePage(pageId) {
    switch (pageId) {
        case 'home':
            // Inicializar la página de inicio
            if (typeof initHomePage === 'function') {
                initHomePage();
            }
            break;
        case 'products':
            // Inicializar la página de productos
            if (typeof initProductsPage === 'function') {
                initProductsPage();
            }
            break;
        // Agregar casos para otras páginas según sea necesario
    }
    
    // Destacar el enlace de navegación activo
    highlightActiveNavLink();
}

// Destacar el enlace de navegación activo
function highlightActiveNavLink() {
    // Remover la clase 'active' de todos los enlaces
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Agregar la clase 'active' al enlace activo
    const activeLink = document.querySelector(`.nav-link[href="#${currentPage}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Funciones para el carrito de compras
function initCart() {
    // Recuperar el carrito del localStorage
    const savedCart = localStorage.getItem('caribeCart');
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
        updateCartCounter();
    }
}

function updateCartCounter() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);
    }
}

function addToCart(product) {
    // Verificar si el producto ya está en el carrito
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
        // Incrementar la cantidad si ya existe
        existingItem.quantity += 1;
    } else {
        // Agregar nuevo producto al carrito
        cartItems.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    // Guardar en localStorage
    saveCart();
    
    // Actualizar contador
    updateCartCounter();
    
    // Mostrar notificación
    showNotification('Producto agregado al carrito');
}

function removeFromCart(productId) {
    cartItems = cartItems.filter(item => item.id !== productId);
    saveCart();
    updateCartCounter();
    
    // Si el carrito está abierto, actualizar su visualización
    if (document.getElementById('cartModal')) {
        showCart();
    }
}

function updateCartItemQuantity(productId, quantity) {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
        item.quantity = parseInt(quantity);
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartCounter();
        }
    }
}

function saveCart() {
    localStorage.setItem('caribeCart', JSON.stringify(cartItems));
}

function showCart() {
    // Si ya existe un modal de carrito, eliminarlo
    const existingModal = document.getElementById('cartModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Crear el modal del carrito
    const modalHTML = `
        <div class="modal fade" id="cartModal" tabindex="-1" aria-labelledby="cartModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="cartModalLabel">Carrito de Compras</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ${cartItems.length > 0 ? renderCartItems() : '<p class="text-center">Tu carrito está vacío</p>'}
                    </div>
                    <div class="modal-footer">
                        <div class="text-end me-auto">
                            <h5>Total: $${calculateCartTotal().toLocaleString('es-CO')}</h5>
                        </div>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Seguir Comprando</button>
                        <button type="button" class="btn btn-primary" ${cartItems.length === 0 ? 'disabled' : ''} onclick="checkout()">Proceder al Pago</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Agregar el modal al body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Inicializar el modal
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
    
    // Agregar eventos a los botones de cantidad
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.dataset.productId;
            const action = this.dataset.action;
            const inputEl = document.querySelector(`.quantity-input[data-product-id="${productId}"]`);
            let quantity = parseInt(inputEl.value);
            
            if (action === 'increase') {
                quantity += 1;
            } else if (action === 'decrease' && quantity > 1) {
                quantity -= 1;
            }
            
            inputEl.value = quantity;
            updateCartItemQuantity(productId, quantity);
            
            // Actualizar subtotal
            const price = parseFloat(this.dataset.price);
            const subtotalEl = document.querySelector(`.subtotal[data-product-id="${productId}"]`);
            subtotalEl.textContent = `$${(price * quantity).toLocaleString('es-CO')}`;
            
            // Actualizar total
            document.querySelector('.modal-footer h5').textContent = `Total: $${calculateCartTotal().toLocaleString('es-CO')}`;
        });
    });
    
    // Agregar eventos a los botones de eliminar
    document.querySelectorAll('.remove-item-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.dataset.productId;
            removeFromCart(productId);
            
            // Actualizar la vista del carrito
            const itemEl = document.querySelector(`.cart-item[data-product-id="${productId}"]`);
            itemEl.remove();
            
            // Actualizar total
            document.querySelector('.modal-footer h5').textContent = `Total: $${calculateCartTotal().toLocaleString('es-CO')}`;
            
            // Si no hay más items, mostrar mensaje de carrito vacío
            if (cartItems.length === 0) {
                document.querySelector('.modal-body').innerHTML = '<p class="text-center">Tu carrito está vacío</p>';
                document.querySelector('.btn-primary').setAttribute('disabled', '');
            }
        });
    });
}

function renderCartItems() {
    return `
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    ${cartItems.map(item => `
                        <tr class="cart-item" data-product-id="${item.id}">
                            <td>
                                <div class="d-flex align-items-center">
                                    <img src="${item.image}" alt="${item.name}" class="img-thumbnail me-2" style="width: 50px;">
                                    <span>${item.name}</span>
                                </div>
                            </td>
                            <td>$${item.price.toLocaleString('es-CO')}</td>
                            <td>
                                <div class="input-group input-group-sm" style="width: 120px;">
                                    <button class="btn btn-outline-secondary quantity-btn" type="button" data-action="decrease" data-product-id="${item.id}" data-price="${item.price}">-</button>
                                    <input type="number" class="form-control text-center quantity-input" value="${item.quantity}" min="1" data-product-id="${item.id}">
                                    <button class="btn btn-outline-secondary quantity-btn" type="button" data-action="increase" data-product-id="${item.id}" data-price="${item.price}">+</button>
                                </div>
                            </td>
                            <td class="subtotal" data-product-id="${item.id}">$${(item.price * item.quantity).toLocaleString('es-CO')}</td>
                            <td>
                                <button class="btn btn-sm btn-danger remove-item-btn" data-product-id="${item.id}">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function calculateCartTotal() {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function checkout() {
    window.location.hash = '#checkout';
}

// Función para mostrar notificaciones
function showNotification(message, type = 'success') {
    // Crear el elemento de notificación
    const notification = document.createElement('div');
    notification.className = `toast align-items-center text-white bg-${type}`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'assertive');
    notification.setAttribute('aria-atomic', 'true');
    
    notification.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;
    
    // Agregar al contenedor de notificaciones o crear uno si no existe
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(toastContainer);
    }
    
    toastContainer.appendChild(notification);
    
    // Inicializar y mostrar la notificación
    const toast = new bootstrap.Toast(notification);
    toast.show();
    
    // Eliminar después de ocultarse
    notification.addEventListener('hidden.bs.toast', function() {
        notification.remove();
    });
}