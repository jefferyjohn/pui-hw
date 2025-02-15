// Reference: https://github.com/interactive-structures/pui-materials/blob/main/in-lab-examples/puinote-lab04/select-example/app.js
// Reference: https://github.com/interactive-structures/pui-materials/tree/main/in-lab-examples/puinote-lab04/url-params

let totalPrice = 0;
let cart = [];

let rollType;
let glazingSelect;
let packSelect;

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

// customize page from link url
function updateHeading() {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);

    rollType = params.get('roll');

    // Update the header text
    const productTitle = document.querySelector('#product-name');
    productTitle.innerText = rollType + ' Cinnamon Roll';

    // Update the image
    const productImage = document.querySelector('#product-image');
    productImage.src = '../assets/products/' + rolls[rollType].imageFile;
}
updateHeading();

// Bun Bun Bake Shop - provided glazing and pack sizes
let glazingOptions = [
    {
        option: 'Keep original',
        price: 0,
    },
    {
        option: 'Sugar milk',
        price: 0,
    },
    {
        option: 'Vanilla milk',
        price: 0.5,
    },
    {
        option: 'Double chocolate',
        price: 1.5,
    }
];

let packOptions = [
    {
        option: 1,
        price: 1,
    },
    {
        option: 3,
        price: 3,
    },
    {
        option: 6,
        price: 5,
    },
    {
        option: 12,
        price: 10,
    }
];

// for all elements in glazingOptions, create an option element and append
let selectElement = document.querySelector('#glazing-select');
for (let i = 0; i < glazingOptions.length; i++) {
    let option = document.createElement('option');
    option.text = glazingOptions[i].option;
    option.value = i;
    selectElement.add(option);
}
selectElement.addEventListener('change', onSelectValueChange);

// for all elements in packOptions, create an option element and append 
selectElement = document.querySelector('#pack-select');
for (let i = 0; i < packOptions.length; i++) {
    let option = document.createElement('option');
    option.text = packOptions[i].option;
    option.value = i;
    selectElement.add(option);
}
selectElement.addEventListener('change', onSelectValueChange);

// when the user selects a new value -> update the price
function onSelectValueChange(event) {
    glazingSelect = document.querySelector('#glazing-select');
    packSelect = document.querySelector('#pack-select');

    let glazingPrice = glazingOptions[glazingSelect.value].price;
    let packPrice = packOptions[packSelect.value].price;
    document.querySelector('#total-price').innerHTML = totalPrice;

    updatePrice(glazingPrice, packPrice)
}

// (basePrice + glazingPrice) * packPrice
function updatePrice(glazingPrice, packPrice) {
    const basePrice = rolls[rollType].basePrice;
    totalPrice = (basePrice + glazingPrice) * packPrice;
    document.querySelector('#total-price').innerHTML = totalPrice;

    let formattedPrice = totalPrice.toFixed(2);
    document.querySelector('#total-price').innerHTML = "$" + formattedPrice;
}

// add to cart
function addToCart() {

    glaze = glazingOptions[glazingSelect.value].option;
    pack = packOptions[packSelect.value].option;
    price = rolls[rollType].basePrice;

    item = new Roll(rollType, glaze, pack, price);
    cart.push(item);
    console.log(cart);
}