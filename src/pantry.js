// var jsonInventory = new Map([
//     ['Pasta', { name: 'Pasta', category: 'pastaPizza', quantity: 50, image: '../images/pantry/pasta.jpeg', price: 5.99 }],
//     ['Pizza', { name: 'Pizza', category: 'pastaPizza', quantity: 50, image: '../images/pantry/pizza.jpeg', price: 5.99 }],
//     ['Rice', { name: 'Rice', category: 'cannedGoods', quantity: 5, image: '../images/pantry/rice.jpeg', price: 0.99 }],
//     ['Corn', { name: 'Corn', category: 'cannedGoods', quantity: 5, image: '../images/pantry/corn.jpeg', price: 0.99 }],
//     ['Flour', { name: 'Flour', category: 'condiments', quantity: 10, image: '../images/pantry/flour.jpeg', price: 5.99 }],
//     ['Sugar', { name: 'Sugar', category: 'condiments', quantity: 20, image: '../images/pantry/sugar.jpeg', price: 0.99 }],
//     ['Cereal', { name: 'Cereal', category: 'rollBacks', quantity: 30, image: '../images/pantry/cereal.jpeg', price: 0.99 }],
//     ['Poha', { name: 'Poha', category: 'rollBacks', quantity: 30, image: '../images/pantry/poha.jpeg', price: 0.99 }],
//     ['Peanut Butter', { name: 'Peanut Butter', category: 'pbSpread', quantity: 20, image: '../images/pantry/peanutbutter.jpeg', price: 0.99 }],
//     ['Strawberry Jelly', { name: 'Strawberry Jelly', category: 'pbSpread', quantity: 20, image: '../images/pantry/jelly.jpeg', price: 0.99 }],
//     ['Canned Mixed Veggies', { name: 'Canned Mixed Veggies', category: 'cannedVegetable', quantity: 20, image: '../images/pantry/vegies.jpeg', price: 0.99 }],
//     ['Canned Carrots', { name: 'Canned Carrots', category: 'cannedVegetable', quantity: 20, image: '../images/pantry/carrots.jpeg', price: 0.99 }]
// ]);

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
var xmlInventory = 
`<?xml version="1.0" encoding="UTF-8"?>
<inventory>
  <item>
    <name>Pasta</name>
    <category>pastaPizza</category>
    <quantity>50</quantity>
    <image>../images/pantry/pasta.jpeg</image>
    <price>5.99</price>
  </item>
  <item>
    <name>Pizza</name>
    <category>pastaPizza</category>
    <quantity>50</quantity>
    <image>../images/pantry/pizza.jpeg</image>
    <price>5.99</price>
  </item>
  <item>
    <name>Rice</name>
    <category>cannedGoods</category>
    <quantity>5</quantity>
    <image>../images/pantry/rice.jpeg</image>
    <price>0.99</price>
  </item>
  <item>
    <name>Corn</name>
    <category>cannedGoods</category>
    <quantity>5</quantity>
    <image>../images/pantry/corn.jpeg</image>
    <price>0.99</price>
  </item>
  <item>
    <name>Flour</name>
    <category>condiments</category>
    <quantity>10</quantity>
    <image>../images/pantry/flour.jpeg</image>
    <price>5.99</price>
  </item>
  <item>
    <name>Sugar</name>
    <category>condiments</category>
    <quantity>20</quantity>
    <image>../images/pantry/sugar.jpeg</image>
    <price>0.99</price>
  </item>
  <item>
    <name>Cereal</name>
    <category>rollBacks</category>
    <quantity>30</quantity>
    <image>../images/pantry/cereal.jpeg</image>
    <price>0.99</price>
  </item>
  <item>
    <name>Poha</name>
    <category>rollBacks</category>
    <quantity>30</quantity>
    <image>../images/pantry/poha.jpeg</image>
    <price>0.99</price>
  </item>
  <item>
    <name>Peanut Butter</name>
    <category>pbSpread</category>
    <quantity>20</quantity>
    <image>../images/pantry/peanutbutter.jpeg</image>
    <price>0.99</price>
  </item>
  <item>
    <name>Strawberry Jelly</name>
    <category>pbSpread</category>
    <quantity>20</quantity>
    <image>../images/pantry/jelly.jpeg</image>
    <price>0.99</price>
  </item>
  <item>
    <name>Canned Mixed Veggies</name>
    <category>cannedVegetable</category>
    <quantity>20</quantity>
    <image>../images/pantry/vegies.jpeg</image>
    <price>0.99</price>
  </item>
  <item>
    <name>Canned Carrots</name>
    <category>cannedVegetable</category>
    <quantity>20</quantity>
    <image>../images/pantry/carrots.jpeg</image>
    <price>0.99</price>
  </item>
</inventory>`

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
