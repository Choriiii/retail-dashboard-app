
document.addEventListener('DOMContentLoaded', () => {
    const productJSON = localStorage.getItem('selectedProduct');
    if (!productJSON) return;

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

    if (productData.reviews && productData.reviews.length > 0) {
        const averageRating = calculateAverageRating(productData.reviews);
        highlightStars(averageRating);
        
    }

    document.querySelector('.black-buttons').addEventListener('click', () => {
        addProductToCart(productData);
    });
});

// reviews average
function calculateAverageRating(reviews) {
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
}

// New rating
function highlightStars(averageRating) {
    const stars = document.querySelectorAll('.rating .star');
    stars.forEach((star, index) => {
        if (index < Math.floor(averageRating)) {
            star.style.color = 'gold';
        }
    });
}

// Reviews keywords
function analyzeReviewSentiment(reviews) {
    const positiveWords = ['great', 'good', 'excellent', 'love', 'perfect'];
    const negativeWords = ['bad', 'poor', 'terrible', 'disappoint', 'broken'];
    
    let positiveCount = 0;
    let negativeCount = 0;

    reviews.forEach(review => {
        const text = review.text.toLowerCase();
        positiveWords.forEach(word => {
            if (text.includes(word)) positiveCount++;
        });
        negativeWords.forEach(word => {
            if (text.includes(word)) negativeCount++;
        });
    });

    return { positiveCount, negativeCount };
}

function addProductToCart(productData) {
    const selectedColor = document.querySelector('input[name="color"]:checked')?.value;
    const selectedSize = document.querySelector('input[name="size"]:checked')?.value;
    const quantity = parseInt(document.getElementById('quantity').textContent);

    if (!selectedColor || !selectedSize) {
        alert('Please select both color and size');
        return;
    }

    const cartItem = {
        ...productData,
        selectedColor,
        selectedSize,
        quantity,
        addedAt: new Date().toISOString()
    };

    addToLocalCart(cartItem);
    
    
    // add BackendCart;
}

function addToLocalCart(item) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingIndex = cart.findIndex(cartItem => 
        cartItem.id === item.id && 
        cartItem.selectedColor === item.selectedColor && 
        cartItem.selectedSize === item.selectedSize
    );

    if (existingIndex >= 0) {
        cart[existingIndex].quantity += item.quantity;
    } else {
        cart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${item.name} (${item.selectedSize}, ${item.selectedColor}) added to cart!`);
}

async function addToBackendCart(item) {
    try {
        const response = await fetch('http://tu-backend.com/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item)
        });
        
        if (response.ok) {
            alert('Product added to cart successfully!');
        } else {
            throw new Error('Failed to add to cart');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error adding to cart. Using local storage instead.');
        addToLocalCart(item); 
    }
}