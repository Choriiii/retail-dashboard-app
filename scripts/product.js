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
  document.getElementById('color-2').style.backgroundColor = productData.colors[1];
}