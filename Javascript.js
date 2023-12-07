//search bar
function searchDishes() {
    var input, filter, ul, li, i, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    ul = document.getElementsByTagName('ul');

    //loop through all food category lists
    for (var j = 0; j < ul.length; j++) {
        li = ul[j].getElementsByTagName('li');

        //loop through all list items, and hide those who don't match the search query
        for (i = 0; i < li.length; i++) {
            txtValue = li[i].textContent || li[i].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }
}

function addToCart(itemName, price) {
    //retrieve the existing cart from localStorage or create a new one if it doesn't exist
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    //add the new item
    cart.push({ itemName, price, quantity: 1 });

    //save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(itemName + " added to cart!"); //user feedback
}

document.addEventListener('DOMContentLoaded', function() {
    //display cart items
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let orderSummary = document.getElementById('order-summary');
    
    cart.forEach(item => {
        let div = document.createElement('div');
        div.className = 'order-item';
        div.innerHTML = `
            <span class="item-name">${item.itemName}</span>
            <span class="item-quantity">x${item.quantity}</span>
            <span class="item-price">$${item.price}</span>
        `;
        orderSummary.appendChild(div);
    });

    //calculate and display total
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let totalDiv = document.createElement('div');
    totalDiv.className = 'order-total';
    totalDiv.innerHTML = `<strong>Total:</strong> <span>$${total.toFixed(2)}</span>`;
    orderSummary.appendChild(totalDiv);
});
function clearCart() {
    localStorage.removeItem('cart'); //clear the cart from localStorage
    updateCartDisplay(); //update the cart display
    alert("Cart has been cleared!"); //user feedback
}

//function to update cart display
function updateCartDisplay() {
    let orderSummary = document.getElementById('order-summary');
    orderSummary.innerHTML = '<h2>Your Order</h2><button id="clear-cart" onclick="clearCart()">Clear Cart</button>'; //reset the order summary content

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.forEach(item => {
        let div = document.createElement('div');
        div.className = 'order-item';
        div.innerHTML = `
            <span class="item-name">${item.itemName}</span>
            <span class="item-quantity">x${item.quantity}</span>
            <span class="item-price">$${item.price}</span>
        `;
        orderSummary.appendChild(div);
    });

    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let totalDiv = document.createElement('div');
    totalDiv.className = 'order-total';
    totalDiv.innerHTML = `<strong>Total:</strong> <span>$${total.toFixed(2)}</span>`;
    orderSummary.appendChild(totalDiv);
}

document.addEventListener('DOMContentLoaded', updateCartDisplay);