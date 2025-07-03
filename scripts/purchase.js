
document.addEventListener('DOMContentLoaded', () => {
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', processPurchase);
    }
});

async function processPurchase() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }

    try {
       
        const response = await fetch('../productData.json');
        const products = await response.json();
        
        const outOfStockItems = [];
        
        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            if (product && product.stock < item.quantity) {
                outOfStockItems.push(item.name);
            }
        });
        
        if (outOfStockItems.length > 0) {
            alert(`The following items are out of stock: ${outOfStockItems.join(', ')}`);
            return;
        }
        
        
        const purchaseSuccessful = await simulatePurchase(cart);
        
        if (purchaseSuccessful) {
         
            cart.forEach(item => {
                const productIndex = products.findIndex(p => p.id === item.id);
                if (productIndex !== -1) {
                    products[productIndex].stock -= item.quantity;
                }
            });
            
        
            localStorage.setItem('cart', JSON.stringify([]));
            alert('Purchase successful! Your cart has been cleared.');
            window.location.href = 'index.html';
        } else {
            alert('Purchase failed. Please try again.');
        }
    } catch (error) {
        console.error('Error processing purchase:', error);
        alert('An error occurred during purchase. Please try again.');
    }
}

const API_BASE_URL = 'http://127.0.0.1:5501/index.html'; 

async function processPurchase() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ items: cart })
        });
        
        if (response.ok) {
            localStorage.setItem('cart', JSON.stringify([]));
            alert('Purchase successful!');
            window.location.href = 'index.html';
        } else {
            throw new Error('Purchase failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error processing purchase. Please try again.');
    }
}