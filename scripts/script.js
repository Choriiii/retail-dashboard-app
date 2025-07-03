
const productJSON = localStorage.getItem('selectedProduct');
productJSON && (() => {
    const productData = productJSON ? JSON.parse(productJSON) : null;
});
  fetch('../productData.json')
    .then(response => {
      if (!response.ok) throw new Error('something went wrong');
      return response.json();
    })
    .then(products => {
      const productElements = document.querySelectorAll('.Products');
      productElements.forEach(productElement => {
        productElement.addEventListener('click', () => {
          const productId = productElement.dataset.id;
          const selected = products.find(p => p.id === productId);

            if (selected) {
            localStorage.setItem('selectedProduct', JSON.stringify(selected));
            window.location.href = 'product.html';
          } else {
            console.warn(`Product with id ${productId} not found`);
          }
        });
      });
    })

function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
}

function getProductById(products, id) {
    return products.find(p => p.id === id);
}


document.addEventListener('DOMContentLoaded', () => {
    fetch('../productData.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch product data');
            return response.json();
        })
        .then(products => {
            document.querySelectorAll('.Products').forEach((el, index) => {
                const productId = el.dataset.id || String(index + 1);
                const product = getProductById(products, productId);
            });
        })
        .catch(err => console.error('Error loading products:', err));
});






