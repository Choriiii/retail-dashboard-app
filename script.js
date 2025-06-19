document.querySelectorAll('.Products').forEach(product =>{
    product.addEventListener('click', () =>{
        const name = product.dataset.name;
        const price = product.dataset.price;
        const image = product.dataset.image;

        const productData = {name: name, price: price, image: image};
        
        localStorage.setItem('selectedProduct', JSON.stringify(productData));
        window.location.href = 'product.html'
    })
})
// Selecte the items to display them in the products page 
    const productJSON = localStorage.getItem('selectedProduct')
        const product = JSON.parse(productJSON);
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-price').textContent = `Price: ${product.price}`;
        document.getElementById('product-image').src = product.image;
        document.getElementById('product-image').alt = product.name;