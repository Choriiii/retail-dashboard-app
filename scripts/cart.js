
document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const $ = id => document.getElementById(id);
    const cartItemsContainer = $('cart-items');
    const subtotalElement = $('subtotal');
    const shippingElement = $('shipping');
    const totalElement = $('total');
    const checkoutBtn = $('checkout-btn');

    const saveCart = () => localStorage.setItem('cart', JSON.stringify(cart));

    const formatPrice = value => `$${value.toFixed(2)}`;

    const updateTotals = () => {
        const subtotal = cart.reduce((sum, { price, quantity = 1 }) =>
            sum + parseFloat(price.replace('$', '')) * quantity, 0
        );
        const shipping = subtotal > 100 ? 0 : 10;
        const total = subtotal + shipping;

        subtotalElement.textContent = formatPrice(subtotal);
        shippingElement.textContent = shipping === 0 ? 'FREE' : formatPrice(shipping);
        totalElement.textContent = formatPrice(total);
    };

    const createCartItemHTML = ({ image, name, price, quantity = 1, selectedColor, selectedSize }, index) => `
    <div class="cart-item">
        <div class="cart-item-image">
            <img src="${image}" alt="${name}">
        </div>
        <div class="cart-item-details">
            <h3>${name}</h3>
            <p>${price}</p>
            ${selectedColor ? `<p>Color: ${selectedColor}</p>` : ''}
            ${selectedSize ? `<p>Size: ${selectedSize}</p>` : ''}
            <div class="quantity-controls">
                <button class="quantity-btn" data-index="${index}" data-action="decrease">-</button>
                <span class="quantity">${quantity}</span>
                <button class="quantity-btn" data-index="${index}" data-action="increase">+</button>
            </div>
            <button class="remove-btn" data-index="${index}">Remove</button>
        </div>
    </div>
`;


    const renderCartItems = () => {
        cartItemsContainer.innerHTML = cart.length
            ? cart.map(createCartItemHTML).join('')
            : '<p>Your cart is empty</p>';

        updateTotals();
    };

    const updateQuantity = (index, action) => {
        const item = cart[index];
        item.quantity = item.quantity || 1;

        if (action === 'increase') {
            item.quantity += 1;
        } else if (action === 'decrease' && item.quantity > 1) {
            item.quantity -= 1;
        }

        saveCart();
        renderCartItems();
    };

    cartItemsContainer.addEventListener('click', e => {
        const target = e.target;
        const index = +target.dataset.index;

        if (target.classList.contains('remove-btn')) {
            cart.splice(index, 1);
            saveCart();
            renderCartItems();
        } else if (target.classList.contains('quantity-btn')) {
            updateQuantity(index, target.dataset.action);
        }
    });
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (!cart.length) {
                alert('Your cart is empty');
            } else {
                alert('Proceeding to checkout');
                // window.location.href = '/checkout';
            }
        });
    }


    renderCartItems();
});
