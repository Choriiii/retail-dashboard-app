//Update quantity with plus and minus

const plusButton = document.getElementById('plus')
const minusButton = document.getElementById('minus');
const quantityDisplay = document.getElementById('quantity');
let quantity = 1;
const updateQuantity = () => {
    quantityDisplay.textContent = quantity;
};

plusButton.addEventListener('click', () => {
    quantity++;
    updateQuantity();
});
minusButton.addEventListener('click', () => {
    if (quantity > 1) {
        quantity--;
        updateQuantity();
    };
});