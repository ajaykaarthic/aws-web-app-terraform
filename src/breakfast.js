var inventory = new Map([
    ['Egg', { name: 'Egg', category: 'breakfast', quantity: 50, image: '../images/breakfast/eggs.jpeg', price: 5.99 }],
    ['Bread', { name: 'Bread', category: 'breakfast', quantity: 50, image: '../images/breakfast/bread.jpeg', price: 5.99 }],
    ['Mapple Syrup', { name: 'Mapple Syrup', category: 'waffles', quantity: 5, image: '../images/breakfast/maple.jpeg', price: 0.99 }],
    ['Pan Cake', { name: 'Pan Cake', category: 'waffles', quantity: 30, image: '../images/breakfast/pancake.jpeg', price: 0.99 }],
    ['Cereal', { name: 'Cereal', category: 'cereal', quantity: 5, image: '../images/pantry/cereal.jpeg', price: 0.99 }],
    ['Milk 1 Gallon', { name: 'Milk 1 Gallon', category: 'cereal', quantity: 10, image: '../images/breakfast/milk.jpeg', price: 5.99 }],
    ['Oat Meal', { name: 'Oat Meal', category: 'oatmeal', quantity: 30, image: '../images/breakfast/oatmeal.jpeg', price: 0.99 }],
    ['Quaker Oats', { name: 'Oat Meal', category: 'oatmeal', quantity: 30, image: '../images/breakfast/quaker.jpeg', price: 0.99 }],
    ['Pizza', { name: 'Pizza', category: 'rollBacks', quantity: 30, image: '../images/pantry/pizza.jpeg', price: 0.99 }],
    ['Burger', { name: 'Burger', category: 'rollBacks', quantity: 30, image: '../images/breakfast/burger.jpeg', price: 0.99 }],
]);
var cart = new Map();
var cartItems = new Map([]);

function addToCart(product) {
    // Get the existing cart details
    var existingCartArray = JSON.parse(localStorage.getItem("cartItems"));
    console.log("existingCartArray: " + JSON.stringify(existingCartArray));
    
    // Convert the JSON string to JSON map
    var newCartItems = new Map(existingCartArray);
    console.log("newCartItems", newCartItems);
    
    // Get the item object
    var item = newCartItems.get(product.name);
    var item_stock = item ? inventory.get(product.name).quantity - item.quantity : inventory.get(product.name).quantity;
    try {
        if (item_stock <= 0) {
            console.log(`${product.name} is out of stock.`);
            toastMessage(product.name, product.name+" is out of stock");
            // alert(product.name + " is out of stock");
        } else if (!newCartItems.has(product.name)) {
            console.log('Item not found in the cart.');
            var quantity = (cart.get(product.name) || 0);
            quantity += 1;
            cart.set(product.name, quantity);
            // cart object to store in cart
            var cartItem = { 
                name: product.name,
                quantity: quantity,
                price: product.price 
            };
            newCartItems.set(cartItem.name, cartItem);
            // var newCartArray = Array.from(cartItems);
            localStorage.setItem("cartItems", JSON.stringify(Array.from(newCartItems)));
            toastMessage(product.name);
        } else {
                // Update the quantity
                item.quantity += 1;
                console.log("item "+JSON.stringify(item));

                // Set the updated item back in the cart
                newCartItems.set(product.name, item);
                console.log("updated cart items ", JSON.stringify(Array.from(newCartItems)));
            
                // Convert the Map back to an array and save it in localStorage
                localStorage.setItem("cartItems", JSON.stringify(Array.from(newCartItems)));
            
                console.log('Quantity updated successfully.');
                toastMessage(product.name);
            } 
    } catch(error) {
        console.log("Error: ", error);
    }
}

function toastMessage(name, message, duration=2000) {
    if(!message) message= name+' added to cart';
    console.log(message);
    var toastContainer = document.getElementById(name+'_stock_status');
    toastContainer.innerHTML = '';
    // Create the toast element
    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.innerText = message;
  
    // Append the toast element to the document
    toastContainer.appendChild(toast);
  
    // Set the timeout for the toast to disappear
    setTimeout(function() {
      toast.remove();
    }, duration);
}

document.addEventListener('DOMContentLoaded', function() {
    function updateDateTime() {
        var now = new Date();
        var datetimeElement = document.getElementById("datetime");
        var localDate = now.toLocaleDateString();
        var localTime = now.toLocaleTimeString();
        datetimeElement.innerText = `Date: ${localDate} | Time: ${localTime}`;
    }
    updateDateTime();
    setInterval(updateDateTime, 1000);

    function displayProducts(category) {
        var productContainer = document.getElementById('productContainer');
        productContainer.innerHTML = '';

        var productTable = document.createElement('table'); // Create a table element
        var row = document.createElement('tr'); // Create a table row element

        inventory.forEach(function(product) {
            if (category === 'all' || product.category == category) {
                var productItem = document.createElement('td'); // Create a table data element
                productItem.classList.add('product-item');
                productItem.setAttribute('id', `${product.name}`);
                productItem.innerHTML = `
                    <img src="${product.image}">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <button id="addToCart" onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
                    <p id="${product.name}_stock_status"></p>
                `;

                row.appendChild(productItem); // Append the product item to the row
                // Check if the row contains two items, if so, create a new row
                if (row.childElementCount == 2) {
                    productTable.appendChild(row); // Append the row to the table
                    row = document.createElement('tr'); // Create a new row
                }
                productContainer.appendChild(productTable);
            }
        });
    }
    
    try {
        document.getElementById('category').addEventListener('change', function() {
            var selectedCategory = this.value;
            displayProducts(selectedCategory);
        });
    } catch(error) {

    }
    
    displayProducts('all');
});

function openHTML(target) {
    window.open(target, '_blank');
}