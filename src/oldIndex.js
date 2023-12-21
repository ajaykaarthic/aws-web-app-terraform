var inventory = [
    { name: 'Apple', category: 'fruits', quantity: 10, image: '../images/fresh/apple.jpeg', price: 5.99 },
    { name: 'Avacados', category: 'fruits', quantity: 1, image: '../images/fresh/avacados.jpeg', price: 0.99 },

    { name: 'Broccoli', category: 'vegetables', quantity: 1, image: '../images/fresh/broccoli.jpeg', price: 5.99 },
    { name: 'Carrots', category: 'vegetables', image: '../images/fresh/carrots.jpeg', price: 0.99 },
    { name: 'Tomato', category: 'vegetables', image: '../images/fresh/tomato.jpeg', price: 0.99 },
    { name: 'Spinach', category: 'vegetables', image: '../images/fresh/spinach.jpeg', price: 0.99 },

    { name: 'Chicken breasts', category: 'newItems', image: '../images/fresh/chickenbreasts.jpeg', price: 0.99 },

    { name: 'Mangoes', category: 'seasonProduce', image: '../images/fresh/mango.jpeg', price: 0.99 },

    { name: 'Cut Melons', category: 'preCutFruits', image: '../images/fresh/cutmelons.jpeg', price: 0.99 },
    { name: 'Cut Mixed Fruits', category: 'preCutFruits', image: '../images/fresh/cutfruit.jpeg', price: 0.99 },

    { name: 'Red Tostitos Salsa', category: 'salsaAndDips', image: '../images/fresh/tostitos.jpeg', price: 0.99 },
    { name: 'Green Tostitos Salsa', category: 'salsaAndDips', image: '../images/fresh/tostitos2.jpeg', price: 0.99 },

    { name: 'Salmon', category: 'rollBacks', image: '../images/fresh/salmon.jpeg', price: 0.99 },

    { name: 'Rose', category: 'flowers', image: '../images/fresh/rose.jpeg', price: 0.99 },
    { name: 'Jasmine', category: 'flowers', image: '../images/fresh/jasmine.jpeg', price: 0.99 },
];
// var inventory = new Map([
//     ['Apple', { name: 'Apple', category: 'fruits', quantity: 1, image: '../images/fresh/apple.jpeg', price: 5.99 }],
//     ['Avacados', { name: 'Avacados', category: 'fruits', quantity: 1, image: '../images/fresh/avacados.jpeg', price: 0.99 }],
//     ['Broccoli', { name: 'Broccoli', category: 'vegetables', quantity: 1, image: '../images/fresh/broccoli.jpeg', price: 5.99 }],
//     ['Carrots', { name: 'Carrots', category: 'vegetables', image: '../images/fresh/carrots.jpeg', price: 0.99 }],
//     ['Tomato', { name: 'Tomato', category: 'vegetables', image: '../images/fresh/tomato.jpeg', price: 0.99 }],
//     ['Spinach', { name: 'Spinach', category: 'vegetables', image: '../images/fresh/spinach.jpeg', price: 0.99 }],
//     ['Chicken breasts', { name: 'Chicken breasts', category: 'newItems', image: '../images/fresh/chickenbreasts.jpeg', price: 0.99 }],
//     ['Mangoes', { name: 'Mangoes', category: 'seasonProduce', image: '../images/fresh/mango.jpeg', price: 0.99 }],
//     ['Cut Melons', { name: 'Cut Melons', category: 'preCutFruits', image: '../images/fresh/cutmelons.jpeg', price: 0.99 }],
//     ['Cut Mixed Fruits', { name: 'Cut Mixed Fruits', category: 'preCutFruits', image: '../images/fresh/cutfruit.jpeg', price: 0.99 }],
//     ['Red Tostitos Salsa', { name: 'Red Tostitos Salsa', category: 'salsaAndDips', image: '../images/fresh/tostitos.jpeg', price: 0.99 }],
//     ['Green Tostitos Salsa', { name: 'Green Tostitos Salsa', category: 'salsaAndDips', image: '../images/fresh/tostitos2.jpeg', price: 0.99 }],
//     ['Salmon', { name: 'Salmon', category: 'rollBacks', image: '../images/fresh/salmon.jpeg', price: 0.99 }],
//     ['Rose', { name: 'Rose', category: 'flowers', image: '../images/fresh/rose.jpeg', price: 0.99 }],
//     ['Jasmine', { name: 'Jasmine', category: 'flowers', image: '../images/fresh/jasmine.jpeg', price: 0.99 }]
// ]);

var cart = [];

function addToCart(product) {
    console.log("inside add to cart");
    console.log(`product quantity: ${product.quantity}`)
    inventory.forEach(function(item) {
        if(item.name == product.name) {
             if (checkInventory(item.quantity)) {
                cart.push(product);
                console.log(`${product.name} added to cart.`);
                item.quantity -= 1;
                product.quantity = item.quantity;
             } else {
                console.log(`${product.name} is out of stock.`);
            }
        }
    });
    console.log(cart);
}

function checkInventory(item_quantity) {
    return item_quantity > 0;
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

    // function displayProducts(category) {
    //     var productContainer = document.getElementById('productContainer');
    //     productContainer.innerHTML = '';

    //     var filteredProducts = inventory.filter(function(product) {
    //         console.log("category: " + category);
    //         if (product.category.includes(category)) {
    //             console.log("Success");
    //         }
    //         return category === 'all' || product.category == category;
    //     });
    //     console.log(filteredProducts);
    //     filteredProducts.forEach(function(product) {
    //         var productItem = document.createElement('div');
    //         productItem.classList.add('product-item');
    //         productItem.innerHTML = `
    //             <img src="${product.image}">
    //             <h3>${product.name}</h3>
    //             <p>$${product.price}</p>
    //         `;

    //         productContainer.appendChild(productItem);
    //     });
    // }
    function displayProducts(category) {
        var productContainer = document.getElementById('productContainer');
        productContainer.innerHTML = '';

        var filteredProducts = inventory.filter(function(product) {
            return category === 'all' || product.category == category;
        });      

        filteredProducts.forEach(function(product) {
            var productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.setAttribute('id', `${product.name}`);
            productItem.innerHTML = `
                <img src="${product.image}">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
                <button id="addToCart" onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
            `;
    
            productContainer.appendChild(productItem);
        });
        // ...
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
