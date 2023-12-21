document.addEventListener('DOMContentLoaded', function() {
var btns = [
    { id: 1, name: 'Apple', category: 'Vegetables', image: '../images/fresh/apple.jpeg', price: 5.99 },
    { id: 2, name: 'Broccoli', category: 'Vegetables', image: '../images/fresh/broccoli.jpeg', price: 5.99 },
    { id: 3, name: 'Carrots', category: 'Vegetables', image: '../images/fresh/carrots.jpeg', price: 0.99 },
    { id: 4, name: 'Chicken breasts', category: 'new', image: '../images/fresh/avacados.jpeg', price: 0.99 },
    { id: 5, name: 'Avacados', category: 'Fruits', image: '../images/fresh/avacados.jpeg', price: 0.99 },
];

const filters = [...new Set(btns.map((btn)=> {
    return btn.category
}))];

document.getElementById('btns').innerHTML = filters.map((btn)=> {
    var {name,id} = btn;
    console.log(name);
    return (
        "<button class='fil-p' onclick='filterItems("+id+")'>"+name+"</button>"
    )
}).join('');
});

const displayItem = (items) => {
    document.getElementById('root').innerHTML = items.map((item)) =>
    {
        var (image, title, price) = item;
        return (
            `<div class=''box'`>
            <h3>${title}</h3>
            <div class='img-box'>
                <img class='images' src=${image}></img>
            </div>
            <div class='bottom'>
                <h2>$ ${price}.00</h2>
                <button>Add to cart</button>
            </div>
            </div>`
        )}).join('');
    }
}