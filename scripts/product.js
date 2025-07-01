
// product.js
const productJSON = localStorage.getItem('selectedProduct');
if (productJSON) {
  const productData = JSON.parse(productJSON);
  document.getElementById('product-name').textContent = productData.name;
  document.getElementById('product-price').textContent = productData.price;
  document.getElementById('product-description').textContent = productData.description;
  document.getElementById('product-image').src = productData.image;
  document.getElementById('product-image').alt = productData.name;
  document.getElementById('model-img').src = productData.images[0];
  document.getElementById('model-img').alt = 'model-image';
  document.getElementById('image-2').src = productData.images[1];
  document.getElementById('image-2').alt = 'Image-2';
  document.getElementById('image-3').src = productData.images[2];
  document.getElementById('image-3').alt = 'Image-3';
  document.getElementById('color-1').style.backgroundColor = productData.colors[0];
  document.getElementById('color-1-radio').value = productData.colors[0];
  document.getElementById('color-2').style.backgroundColor = productData.colors[1];
  document.getElementById('color-2-radio').value = productData.colors[1];
  // ... (tu código existente para mostrar los datos del producto)


    // Manejar añadir al carrito
    document.querySelector('.black-buttons').addEventListener('click', () => {
        const selectedColor = document.querySelector('input[name="color"]:checked')?.value;
        const selectedSize = document.querySelector('input[name="size"]:checked')?.value;
        
        if (!selectedColor || !selectedSize) {
            alert('Please select both color and size');
            return;
        }

        const productToAdd = {
            ...productData,
            selectedColor,
           selectedSize,
            quantity: parseInt(document.getElementById('quantity').textContent)
        };

        addToCart(productToAdd);
    });
};

function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Buscar si ya existe el mismo producto con mismo color y talla
    const existingItem = cart.find(item => 
        item.id === product.id && 
        item.selectedColor === product.selectedColor && 
        item.selectedSize === product.selectedSize
    );

    if (existingItem) {
        existingItem.quantity += product.quantity;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} (${product.selectedSize}, ${product.selectedColor}) added to cart!`);
}
