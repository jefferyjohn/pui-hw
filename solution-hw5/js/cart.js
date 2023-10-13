// references: https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots

// global variables
let cart = [];
let totalPrice = 0;

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


// provided class from hw4 + hw5 
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
    // Unclear if we're allowed to modify the class - https://hcicoursecomm.slack.com/archives/C05MH6MNQD9/p1696591317503099
    // calculatedPrice = calculatePrice(this.type, this.glazing, this.size);
}

// adaptation from hw4 - (basePrice + glazingPrice) * packPrice
function calculatePrice(rollOrder, glazeOrder, packOrder) {
    let order = rollOrder;
    let glazing = glazeOrder;
    let pack = packOrder;

    // convert to indices - NOTE: hw5 requirements don't comply w/ prev naming scheme
    if (glazing == 'Original') {
        glazing = 0;
    } else if (glazing == 'Sugar Milk') {
        glazing = 1;
    } else if (glazing == 'Vanilla Milk') {
        glazing = 2;
    } else if (glazing == 'Double Chocolate') {
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

    for (let i = 0; i < cart.length; i++) {
        totalPrice += Number(calculatePrice(cart[i].type, cart[i].glazing, cart[i].size));
    }
    formattedPrice = totalPrice.toFixed(2);

    // Display total price
    let finalPrice = document.getElementById('final-price');
    finalPrice.textContent = formattedPrice;

    return formattedPrice;
}

// initialize cart w/ rolls given by hw5
function initializeCart () {
    // Unclear about requirements - https://hcicoursecomm.slack.com/archives/C05MH6MNQD9/p1696591317503099
    roll1 = new Roll('Original', 'Sugar Milk', 1, rolls['Original'].basePrice);
    roll2 = new Roll('Walnut', 'Vanilla Milk', 12, rolls['Walnut'].basePrice);
    roll3 = new Roll('Raisin', 'Sugar Milk', 3, rolls['Raisin'].basePrice);
    roll4 = new Roll('Apple', 'Original', 3, rolls['Apple'].basePrice);

    cart.push(roll1);
    cart.push(roll2);
    cart.push(roll3);
    cart.push(roll4);

    calculateCart();
}
initializeCart();


document.addEventListener("DOMContentLoaded", function () {
    // Get references to elements
    const rollCheckout = document.getElementById("roll-checkout");
    const rollTemplate = document.getElementById("roll-template");

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

            //console.log(cart);

            calculateCart();
        });
        rollCheckout.appendChild(copy);
    }

    // For each item in the JS cart, create Roll and send to DOM with unique id
    for (let i = 0; i < cart.length; i++) {
        rollName = cart[i].type;
        rollGlazing = cart[i].glazing;
        rollQuantity = cart[i].size;
        rollPrice = calculatePrice(cart[i].type, cart[i].glazing, cart[i].size);

        let purchasedRoll = new Roll(rollName, rollGlazing, rollQuantity, rollPrice); 
        addRollToCart(purchasedRoll, i);
    }
});

