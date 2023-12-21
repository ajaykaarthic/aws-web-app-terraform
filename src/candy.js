var inventory = new Map([
    ['Lollipop', { name: 'Lollipop', category: 'candy', quantity: 10, image: '../images/candy/lollipop.jpeg', price: 5.99 }],
    ['Hersheys', { name: 'Hersheys', category: 'softChocolate', quantity: 5, image: '../images/candy/hersheys.jpeg', price: 0.99 }],
    ['Gummy Bars', { name: 'Gummy Bars', category: 'softChocolate', quantity: 10, image: '../images/candy/gummybars.jpeg', price: 5.99 }],
    ['Stripped Candy', { name: 'Stripped Candy', category: 'candy', quantity: 10, image: '../images/candy/strippedcandy.jpeg', price: 0.99 }],
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
        var quantity;
        if((parseInt(document.getElementById('quantity_'+product.name).value))) {
            quantity = (parseInt(document.getElementById('quantity_'+product.name).value));
        } else if (cart.get(product.name) || 0) {
            quantity = (cart.get(product.name) || 0) + 1;
        }
        console.log("quantity: ",quantity);
        if (item_stock - quantity < 0) {
            console.log(`${product.name} is out of stock.`);
            toastMessage(product.name, 0, message=`${product.name}  is out of stock`);
            // alert(product.name + " is out of stock");
        } else if (!newCartItems.has(product.name)) {
            console.log('Item not found in the cart.');
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
            toastMessage(product.name, quantity);
        } else {
                // Update the quantity
                item.quantity = quantity;
                console.log("item "+JSON.stringify(item));

                // Set the updated item back in the cart
                newCartItems.set(product.name, item);
                console.log("updated cart items ", JSON.stringify(Array.from(newCartItems)));
            
                // Convert the Map back to an array and save it in localStorage
                localStorage.setItem("cartItems", JSON.stringify(Array.from(newCartItems)));
            
                console.log('Quantity updated successfully.');
                toastMessage(product.name, quantity);
            } 
    } catch(error) {
        console.log("Error: ", error);
    }
}

function toastMessage(name, quantity, message, duration=2000) {
    console.log("message: ",message);
    if(!message) {
        message = quantity+' '+name+' added to cart';
    }
    console.log("message: ",message);
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

function searchInventory() {
    var input, filter, productContainer, productItem, productName, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    if((/^\d+$/).test(filter)) { 
        alert("Number is not a valid input")
    };
    productContainer = document.getElementById('productContainer');
    productItem = productContainer.getElementsByClassName('product-item');

    for (i = 0; i < productItem.length; i++) {
    productName = productItem[i].getElementsByTagName("h3")[0];
    if (productName) {
        txtValue = productName.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            productItem[i].style.display = "";
        } else {
            // alert("invalid search");
            productItem[i].style.display = "none";
        }
    }       
}

// Now search in the inventory map
var matchingProducts = [];
inventory.forEach(function(product, key) {
    if (key.toUpperCase().indexOf(filter) > -1) {
        matchingProducts.push(product);
    }
});

// Render HTML for matching products
var searchResultsContainer = document.getElementById('searchResults');
searchResultsContainer.innerHTML = '';

matchingProducts.forEach(function(product) {
    var productItem = document.createElement('div');
    productItem.classList.add('product-item');
    productItem.innerHTML = `
        <img src="${product.image}">
        <h3>${product.name}</h3>
        <p>${product.price}</p>
        <button id="addToCart" onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
    `;

    searchResultsContainer.appendChild(productItem);
});
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
                    <div class="quantity-container">
                    <label for="quantity_${product.name}">Quantity:</label>
                    <input type="number" id="quantity_${product.name}" min="1" value="1">
                    </div>
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