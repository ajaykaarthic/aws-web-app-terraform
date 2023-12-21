document.addEventListener('DOMContentLoaded', function() {
    // Retrieve cart from local storage and convert it back to an array of objects
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));

    var cartItemsContainer = document.getElementById('cartItems');
    var cartTotalContainer = document.getElementById('cartTotal');
    
    console.log("cartItems: ",cartItems);

    if (cartItems) {
        var  total = parseFloat(0);
        console.log(typeof(total));
        cartItems.forEach(function(item) {
            console.log("item", item[1]);
            var netItemPrice = parseFloat(item[1].price * item[1].quantity);
            var itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <p>Name: ${item[1].name}</p>
                <p>Quantity: ${item[1].quantity}</p>
                <p>Price: ${netItemPrice.toFixed(2)}</p>
            `;            
            total += netItemPrice;
            cartItemsContainer.appendChild(itemElement);
        });

        var totalElement = document.createElement('div');
        totalElement.innerHTML = `Total: $${total.toFixed(2)}`;
        cartTotalContainer.appendChild(totalElement);
    } else {
        var emptyCartElement = document.createElement('p');
        emptyCartElement.innerHTML = 'Your cart is empty.';
        cartItemsContainer.appendChild(emptyCartElement);
    }

    function updateDateTime() {
        var now = new Date();
        var datetimeElement = document.getElementById("datetime");
        var localDate = now.toLocaleDateString();
        var localTime = now.toLocaleTimeString();
        datetimeElement.innerText = `Date: ${localDate} | Time: ${localTime}`;
    }
    updateDateTime();
    setInterval(updateDateTime, 1000);
});
