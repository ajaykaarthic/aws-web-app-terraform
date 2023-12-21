var inventory = new Map([
    ['Chocolate Ice Cream', { name: 'Chocolate Ice Cream', category: 'dessert', quantity: 50, image: '../images/frozen/chocolateicecream.jpeg', price: 5.99 }],
    ['Mango Ice Cream', { name: 'Mango Ice Cream', category: 'dessert', quantity: 50, image: '../images/frozen/mangoicecream.jpeg', price: 5.99 }],
    ['Chicken Nuggets', { name: 'Chicken Nuggets', category: 'snacks', quantity: 5, image: '../images/frozen/frozenchickennuggets.jpeg', price: 0.99 }],
    ['Potato Nuggets', { name: 'Potato Nuggets', category: 'snacks', quantity: 5, image: '../images/frozen/potatonuggets.jpeg', price: 0.99 }],
    ['Mango', { name: 'Mango', category: 'meals', quantity: 10, image: '../images/frozen/frozenmango.jpeg', price: 5.99 }],
    ['Sandwich', { name: 'Sandwich', category: 'meals', quantity: 10, image: '../images/frozen/sandwich.jpeg', price: 5.99 }],
    ['Mixed Veggies', { name: 'Mixed Veggies', category: 'vegetables', quantity: 30, image: '../images/frozen/mixedveggies.jpeg', price: 0.99 }],
    ['Cauliflower', { name: 'Cauliflower', category: 'vegetables', quantity: 30, image: '../images/frozen/cauliflower.jpeg', price: 0.99 }],
    ['Pepperoni Pizza', { name: 'Pepperoni Pizza', category: 'pizza', quantity: 20, image: '../images/frozen/pepperonipizza.jpeg', price: 0.99 }],
    ['Cheese Pizza', { name: 'Cheese Pizza', category: 'pizza', quantity: 20, image: '../images/frozen/cheesepizza.jpeg', price: 0.99 }],
    ['Croissant', { name: 'Croissant', category: 'breakfast', quantity: 20, image: '../images/frozen/croissant.jpeg', price: 0.99 }],
    ['Bagel', { name: 'Bagel', category: 'breakfast', quantity: 20, image: '../images/frozen/bagel.jpeg', price: 0.99 }],
    ['Beef', { name: 'Beef', category: 'meat', quantity: 20, image: '../images/frozen/beef.jpeg', price: 0.99 }],
    ['Chicken', { name: 'Chicken', category: 'meat', quantity: 20, image: '../images/frozen/chicken.jpeg', price: 0.99 }],
    ['Vanilla Cones', { name: 'Vanilla Cones', category: 'rollBacks', quantity: 20, image: '../images/frozen/cone.jpeg', price: 0.99 }],
    ['Blueberry', { name: 'Blueberry', category: 'rollBacks', quantity: 20, image: '../images/frozen/blueberry.jpeg', price: 0.99 }]
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
            alert(product.name + " is out of stock");
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
            } 
    } catch(error) {
        console.log("Error: ", error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    function formValidate() {

        console.log("inside form validate");
        // Validation
        var firstName = document.getElementById("firstName").value;
        var lastName = document.getElementById("lastName").value;

        var phoneNumber = document.getElementById("phoneNumber").value;
        var email = document.getElementById("email").value;
        var gender = document.getElementsByName("gender");
        var comment = document.getElementById("comment").value;

        // Regular expressions for validation
        const nameRegex = /^[A-Z][a-zA-Z]*$/;
        const phoneRegex = /^\( \d{3}\) \d{3}-\d{4}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        let isValid = true;

        if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
            alert('First name and last name should be alphabetic and start with a capital letter.');
            isValid = false;
        }

        if (firstName === lastName) {
            alert('First name and last name cannot be the same.');
            isValid = false;
        }

        if (!phoneRegex.test(phoneNumber)) {
            alert('Phone number must be formatted as ( ddd) ddd-dddd.');
            isValid = false;
        }

        if (!emailRegex.test(email)) {
            alert('Invalid email address.');
            isValid = false;
        }

        if (!gender[0].checked && !gender[1].checked) {
            alert('Please select a gender.');
            isValid = false;
        }

        if (comment.length < 10) {
            alert('Comment must be at least 10 characters.');
            isValid = false;
        }

        // If all validations pass, you can submit the form
        console.log(isValid);
        if (isValid) {
            form.submit();
        }
    }
    try {
    document.getElementById("contactForm").addEventListener("submit", formValidate);
    } catch(error) {

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