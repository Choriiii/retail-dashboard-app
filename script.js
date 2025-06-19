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