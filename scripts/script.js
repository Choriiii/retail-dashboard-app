
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








