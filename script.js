import products from './productData.js';

document.querySelectorAll('.Products').forEach(productElement => {
    productElement.addEventListener('click', () => {
        const productId = productElement.dataset.id; //get the id of the prouct in Casual.html
        const selected = products.find(p => p.id === productId); //Find the element that contains the id
        localStorage.setItem('selectedProduct', JSON.stringify(selected));
        window.location.href = 'product.html';
    });
});

// Select the items to display them in the products page 
const productJSON = localStorage.getItem('selectedProduct')
const product = JSON.parse(productJSON);
document.getElementById('product-name').textContent = product.name;
document.getElementById('product-price').textContent = product.price;
document.getElementById('product-description').textContent = product.description;
document.getElementById('product-image').src = product.image;
document.getElementById('product-image').alt = product.name;
document.getElementById('model-img').src = product.images[0];
document.getElementById('model-img').alt = 'model-image';
document.getElementById('image-2').src = product.images[1];
document.getElementById('model-img').alt = 'Image-2';
document.getElementById('image-3').src = product.images[2];
document.getElementById('model-img').alt = 'Image-3';
document.getElementById('color-1').style.backgroundColor = product.colors[0];
document.getElementById('color-2').style.backgroundColor = product.colors[1];

