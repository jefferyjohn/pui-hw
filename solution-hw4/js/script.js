// Reference: https://github.com/interactive-structures/pui-materials/blob/main/in-lab-examples/puinote-lab04/select-example/app.js
let totalPrice = 0;

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
    let glazingSelect = document.querySelector('#glazing-select');
    let packSelect = document.querySelector('#pack-select');

    let glazingPrice = glazingOptions[glazingSelect.value].price;
    let packPrice = packOptions[packSelect.value].price;
    document.querySelector('#total-price').innerHTML = totalPrice;

    updatePrice(glazingPrice, packPrice)
}

// (basePrice + glazingPrice) * packPrice
function updatePrice(glazingPrice, packPrice) {
    const basePrice = 2.49;
    totalPrice = (basePrice + glazingPrice) * packPrice;
    document.querySelector('#total-price').innerHTML = totalPrice;
    console.log(totalPrice)


    let formattedPrice = totalPrice.toFixed(2);
    document.querySelector('#total-price').innerHTML = "$" + formattedPrice;
}