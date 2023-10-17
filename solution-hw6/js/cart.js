// references: lab notes (06)

/* global variables */
let cart;
let totalPrice = 0;

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

// provided data from hw4
const rolls = {
    "Original": {
        "basePrice": 2.49,
        "imageFile": "original-cinnamon-roll.jpg"
    },
    "Apple": {
        "basePrice": 3.49,
        "imageFile": "apple-cinnamon-roll.jpg"
    },
    "Raisin": {
        "basePrice": 2.99,
        "imageFile": "raisin-cinnamon-roll.jpg"
    },
    "Walnut": {
        "basePrice": 3.49,
        "imageFile": "walnut-cinnamon-roll.jpg"
    },
    "Double-Chocolate": {
        "basePrice": 3.99,
        "imageFile": "double-chocolate-cinnamon-roll.jpg"
    },
    "Strawberry": {
        "basePrice": 3.99,
        "imageFile": "strawberry-cinnamon-roll.jpg"
    }
};

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

// adaptation from hw4 - (basePrice + glazingPrice) * packPrice
function calculatePrice(rollOrder, glazeOrder, packOrder) {
    let order = rollOrder;
    let glazing = glazeOrder;
    let pack = packOrder;

    // convert to indices - NOTE: hw5 requirements don't comply w/ prev naming scheme
    if (glazing == 'Keep original') {
        glazing = 0;
    } else if (glazing == 'Sugar milk') {
        glazing = 1;
    } else if (glazing == 'Vanilla milk') {
        glazing = 2;
    } else if (glazing == 'Double chocolate') {
        glazing = 3;
    } else {
        glazing = -1;
        console.log('Error: glazing not found');
    }

    if (pack == 1) {
        pack = 0;
    } else if (pack == 3) {
        pack = 1;
    } else if (pack == 6) {
        pack = 2;
    } else if (pack == 12) {
        pack = 3;
    } else {
        pack = -1;
        console.log('Error: pack not found');
    }

    const basePrice = rolls[order].basePrice;
    const glazingPrice = glazingOptions[glazing].price;
    const packPrice = packOptions[pack].price;

    orderPrice = (basePrice + glazingPrice) * packPrice;

    return orderPrice.toFixed(2);
}

// calculate total price of cart
function calculateCart() {
    totalPrice = 0; // restart the count

    // Retrieve the cart from local storage and parse it
    let cart = JSON.parse(localStorage.getItem('cart'));

    if (!Array.isArray(cart)) {
        cart = [];
    }

    for (let i = 0; i < cart.length; i++) {
        totalPrice += Number(calculatePrice(cart[i].type, cart[i].glazing, cart[i].size));
    }
    formattedPrice = totalPrice.toFixed(2);

    // Display total price
    let finalPrice = document.getElementById('final-price');
    finalPrice.textContent = "$" + formattedPrice;

    return formattedPrice;
}

document.addEventListener("DOMContentLoaded", function () {
    // Get references to elements
    const rollCheckout = document.getElementById("roll-checkout");
    const rollTemplate = document.getElementById("roll-template");

    // initialize cart w/ rolls given by hw5
    function initializeCart() {

        // check local storage for cart
        if (localStorage.getItem('cart') != null) {
            cart = JSON.parse(localStorage.getItem('cart'));
        } else {
            cart = [];
        }

        for (let i = 0; i < cart.length; i++) {
            rollName = cart[i].type;
            rollGlazing = cart[i].glazing;
            rollQuantity = cart[i].size;
            rollPrice = calculatePrice(cart[i].type, cart[i].glazing, cart[i].size);

            let purchasedRoll = new Roll(rollName, rollGlazing, rollQuantity, rollPrice);
            addRollToCart(purchasedRoll, i);
        }

        calculateCart();
        console.log(cart);
    }
    initializeCart();

    // Add items to the cart
    function addRollToCart(purchase, id) {
        const copy = document.importNode(rollTemplate.content, true);
        const rollElement = copy.querySelector("li");
        const rollPictureElement = copy.querySelector(".roll-image");
        const rollNameElement = copy.querySelector(".roll-name");
        const rollGlazingElement = copy.querySelector(".roll-glazing");
        const rollQuantityElement = copy.querySelector(".roll-quantity");
        const rollPriceElement = copy.querySelector(".roll-price");
        const rollIdElement = copy.querySelector(".roll-id");
        const removeButton = copy.querySelector(".roll-remove");

        let rollImage = "../assets/products/" + purchase.type.toLowerCase() + "-cinnamon-roll.jpg";
        let rollName = purchase.type;
        let rollGlazing = purchase.glazing;
        let rollQuantity = purchase.size;
        let rollPrice = purchase.basePrice;

        rollPictureElement.src = rollImage;
        rollNameElement.textContent = rollName + " Cinnamon Roll";
        rollGlazingElement.textContent = rollGlazing;
        rollQuantityElement.textContent = "Pack size: " + rollQuantity;
        rollPriceElement.textContent = "$ " + rollPrice;

        // set element id to index of cart
        rollIdElement.setAttribute("id", id);

        removeButton.addEventListener("click", () => {

            // find index of roll to remove
            const rollId = rollElement.querySelector(".roll-id").id;

            let list = "";
            for (let i = 0; i < cart.length; i++) {
                list += cart[i].type + " ";
            }

            // remove just the roll from the cart
            cart = cart.toSpliced(rollId, 1);

            list = "";
            for (let i = 0; i < cart.length; i++) {
                list += cart[i].type + " ";
            }

            rollCheckout.removeChild(rollElement);

            // renumber the ids of the remaining rolls
            for (let i = 0; i < cart.length; i++) {

                // get an array of all the roll ids
                const rollIdElements = rollCheckout.querySelectorAll(".roll-id");

                // set the id of the roll to its index in the cart
                rollIdElements[i].setAttribute("id", i);
            }

            // update local storage
            localStorage.setItem('cart', JSON.stringify(cart));
            console.log(cart);

            calculateCart();
        });
        rollCheckout.appendChild(copy);
    }
});

