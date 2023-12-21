// var jsonInventory = new Map([
//     ['Apple', { name: 'Apple', category: 'fruits', quantity: 50, image: '../images/fresh/apple.jpeg', price: 5.99 }],
//     ['Avacados', { name: 'Avacados', category: 'fruits', quantity: 5, image: '../images/fresh/avacados.jpeg', price: 0.99 }],
//     ['Broccoli', { name: 'Broccoli', category: 'vegetables', quantity: 10, image: '../images/fresh/broccoli.jpeg', price: 5.99 }],
//     ['Carrots', { name: 'Carrots', category: 'vegetables', quantity: 30, image: '../images/fresh/carrots.jpeg', price: 0.99 }],
//     ['Tomato', { name: 'Tomato', category: 'vegetables', quantity: 20, image: '../images/fresh/tomato.jpeg', price: 0.99 }],
//     ['Spinach', { name: 'Spinach', category: 'vegetables', quantity: 10, image: '../images/fresh/spinach.jpeg', price: 0.99 }],
//     ['Chicken breasts', { name: 'Chicken breasts', category: 'newItems', quantity: 10, image: '../images/fresh/chickenbreasts.jpeg', price: 0.99 }],
//     ['Chicken legs', { name: 'Chicken legs', category: 'newItems', quantity: 10, image: '../images/fresh/chickenlegs.jpeg', price: 0.99 }],
//     ['Mangoes', { name: 'Mangoes', category: 'seasonProduce', quantity: 10, image: '../images/fresh/mango.jpeg', price: 0.99 }],
//     ['Cut Melons', { name: 'Cut Melons', category: 'preCutFruits', quantity: 10, image: '../images/fresh/cutmelons.jpeg', price: 0.99 }],
//     ['Cut Mixed Fruits', { name: 'Cut Mixed Fruits', category: 'preCutFruits', quantity: 10, image: '../images/fresh/cutfruit.jpeg', price: 0.99 }],
//     ['Red Tostitos Salsa', { name: 'Red Tostitos Salsa', category: 'salsaAndDips', quantity: 10, image: '../images/fresh/tostitos.jpeg', price: 0.99 }],
//     ['Green Tostitos Salsa', { name: 'Green Tostitos Salsa', category: 'salsaAndDips', quantity: 10, image: '../images/fresh/tostitos2.jpeg', price: 0.99 }],
//     ['Salmon', { name: 'Salmon', category: 'rollBacks', quantity: 10, image: '../images/fresh/salmon.jpeg', price: 0.99 }],
//     ['Lotus', { name: 'Lotus', category: 'rollBacks', quantity: 10, image: '../images/fresh/lotus.jpeg', price: 0.99 }],
//     ['Rose', { name: 'Rose', category: 'flowers', quantity: 10, image: '../images/fresh/rose.jpeg', price: 0.99 }],
//     ['Jasmine', { name: 'Jasmine', category: 'flowers', quantity: 5, image: '../images/fresh/jasmine.jpeg', price: 0.99 }]
// ]);

const xmlInventory = 
`<?xml version="1.0" encoding="UTF-8"?>
<inventory>
  <item>
    <name>Apple</name>
    <category>fruits</category>
    <quantity>50</quantity>
    <image>../images/fresh/apple.jpeg</image>
    <price>5.99</price>
  </item>
  <item>
    <name>Avacados</name>
    <category>fruits</category>
    <quantity>5</quantity>
    <image>../images/fresh/avacados.jpeg</image>
    <price>0.99</price>
  </item>
  <item>
    <name>Broccoli</name>
    <category>vegetables</category>
    <quantity>10</quantity>
    <image>../images/fresh/broccoli.jpeg</image>
    <price>5.99</price>
  </item>
  <item>
    <name>Carrots</name>
    <category>vegetables</category>
    <quantity>30</quantity>
    <image>../images/fresh/carrots.jpeg</image>
    <price>0.99</price>
  </item>
  <item>
    <name>Tomato</name>
    <category>vegetables</category>
    <quantity>20</quantity>
    <image>../images/fresh/tomato.jpeg</image>
    <price>0.99</price>
  </item>
  <item>
    <name>Spinach</name>
    <category>vegetables</category>
    <quantity>10</quantity>
    <image>../images/fresh/spinach.jpeg</image>
    <price>0.99</price>
  </item>
  <item>
    <name>Chicken breasts</name>
    <category>newItems</category>
    <quantity>10</quantity>
    <image>../images/fresh/chickenbreasts.jpeg</image>
    <price>0.99</price>
  </item>
  <item>
    <name>Chicken legs</name>
    <category>newItems</category>
    <quantity>10</quantity>
    <image>../images/fresh/chickenlegs.jpeg</image>
    <price>0.99</price>
  </item>
  <item>
    <name>Mangoes</name>
    <category>seasonProduce</category>
    <quantity>10</quantity>
    <image>../images/fresh/mango.jpeg</image>
    <price>0.99</price>
  </item>
  <item>
    <name>Cut Melons</name>
    <category>preCutFruits</category>
    <quantity>10</quantity>
    <image>../images/fresh/cutmelons.jpeg</image>
    <price>0.99</price>
  </item>
  <item>
    <name>Cut Mixed Fruits</name>
    <category>preCutFruits</category>
    <quantity>10</quantity>
    <image>../images/fresh/cutfruit.jpeg</image>
    <price>0.99</price>
  </item>
  <item>
    <name>Red Tostitos Salsa</name>
    <category>salsaAndDips</category>
    <quantity>10</quantity>
    <image>../images/fresh/tostitos.jpeg</image>
    <price>0.99</price>
  </item>
  <item>
    <name>Green Tostitos Salsa</name>
    <category>salsaAndDips</category>
    <quantity>10</quantity>
    <image>../images/fresh/tostitos2.jpeg</image>
    <price>0.99</price>
  </item>
  <item>
    <name>Salmon</name>
    <category>rollBacks</category>
    <quantity>10</quantity>
    <image>../images/fresh/salmon.jpeg</image>
    <price>0.99</price>
  </item>
  <item>
    <name>Lotus</name>
    <category>rollBacks</category>
    <quantity>10</quantity>
    <image>../images/fresh/lotus.jpeg</image>
    <price>0.99</price>
  </item>
  <item>
    <name>Rose</name>
    <category>flowers</category>
    <quantity>10</quantity>
    <image>../images/fresh/rose.jpeg</image>
    <price>0.99</price>
  </item>
  <item>
    <name>Jasmine</name>
    <category>flowers</category>
    <quantity>5</quantity>
    <image>../images/fresh/jasmine.jpeg</image>
    <price>0.99</price>
  </item>
</inventory>`;

function parseXMLInventory(xmlString) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "application/xml");
    const items = xmlDoc.querySelectorAll("item");

    let inventory = new Map();

    items.forEach((item) => {
        const name = item.querySelector("name").textContent;
        const category = item.querySelector("category").textContent;
        const quantity = parseInt(item.querySelector("quantity").textContent);
        const image = item.querySelector("image").textContent;
        const price = parseFloat(item.querySelector("price").textContent);

        inventory.set(name, { name, category, quantity, image, price });
    });

    return inventory;
}

const inventory = parseXMLInventory(xmlInventory);
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