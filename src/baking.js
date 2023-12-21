var inventory = new Map([
    ['Plain Pie Crust', { name: 'Plain Pie Crust', category: 'pieCrusts', quantity: 10, image: '../images/baking/piecrusts1.jpeg', price: 5.99 }],
    ['Flower Pie Crust', { name: 'Flower Pie Crust', category: 'pieCrusts', quantity: 10, image: '../images/baking/piecrusts2.jpeg', price: 5.99 }],
    ['Rectangle Pie Crust', { name: 'Rectangle Pie Crust', category: 'pieCrusts', quantity: 10, image: '../images/baking/piecrusts3.jpeg', price: 5.99 }],
    ['Muscle Man Apple', { name: 'Muscle Man Apple', category: 'puddingMixes', quantity: 10, image: '../images/baking/piefilling1.jpeg', price: 5.99 }],
    ['Pudding Mix', { name: 'Pudding Mix', category: 'pieFillings', quantity: 10, image: '../images/baking/piefilling4.jpeg', price: 5.99 }],
    ['Pie Pan', { name: 'Pie Pan', category: 'piePans', quantity: 10, image: '../images/baking/piepan1.jpeg', price: 5.99 }],
    ['New Pie Pan', { name: 'New Pie Pan', category: 'piePans', quantity: 10, image: '../images/baking/piepan2.jpeg', price: 5.99 }],
    ['Cherry', { name: 'Cherry', category: 'pieFillings', quantity: 10, image: '../images/baking/piefilling2.jpg', price: 5.99 }],
    ['Caramel Apple', { name: 'Caramel Apple', category: 'puddingMixes', quantity: 10, image: '../images/baking/piefilling3.jpeg', price: 5.99 }],
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
            console.log("selected category", selectedCategory);
            displayProducts(selectedCategory);
        });
    } catch(error) {

    }
    
    displayProducts('all');
});