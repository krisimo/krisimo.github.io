


// Load Cart from Local Storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
console.log("Loaded Cart:", cart);

// Save Cart to Local Storage
function saveCart() {
    console.log("Saving Cart:", cart);
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Update the Cart Counter
function updateCartDisplay() {
    console.log("Updating Cart Counter...");
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartDisplay = document.getElementById("cart-count");

    if (cartDisplay) {
        cartDisplay.textContent = cartCount > 0 ? cartCount : "0";
        console.log("Cart Counter Updated:", cartCount);
    }
}






// -------------------------------------------------------------adds a jacket to the cart when the "Add to Cart" button is clicked-----------------------------------------------------------





function addToCart(jacketId) {
    console.log(`ADD TO CART CLICKED: Jacket ID ${jacketId}`);

    const jacketElement = document.querySelector(`[data-id='${jacketId}']`);
    if (!jacketElement) {
        console.log("⚠️ Jacket element not found!");
        return;
    }

    const sizeDropdown = jacketElement.closest(".jacket-item").querySelector(".size-selector");
    const selectedSize = sizeDropdown ? sizeDropdown.value : "M";

    let existingItem = cart.find(item => item.id === jacketId && item.size === selectedSize);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        const jacket = {
            id: jacketId,
            name: jacketElement.closest(".jacket-item").querySelector("h3").textContent,
            size: selectedSize,
            price: parseFloat(jacketElement.closest(".jacket-item").querySelector("h2").textContent.replace("$", "")),
            image: jacketElement.closest(".jacket-item").querySelector("img").src,
            quantity: 1
        };

        console.log("Adding Jacket to Cart:", jacket);
        cart.push(jacket);
    }

    saveCart();
    updateCartDisplay();
    console.log("Cart Updated:", cart);

}

// ---------------------------------------------------------------------------------------End------------------------------------------------------------------------------------------------------



// ----------------------------------------------------------removes specific jacket from the cart------------------------------------------------------------------------------------------------



function removeFromCart(jacketId, size) {
    console.log(`Removing Jacket ID: ${jacketId} (Size: ${size})`);

    cart = cart.filter(item => !(item.id === jacketId && item.size === size));
    saveCart();
    displayCart();
    updateCartDisplay();
}


// ---------------------------------------------------------------------------------------End------------------------------------------------------------------------------------------------------




// --------------------------------------------------------updates and displays the cart items, calculates the total price and adds remove buttons----------------------------------------------------
function displayCart() {

    console.log("Running displayCart()");
    console.log("Found Remove Buttons:", document.querySelectorAll(".remove-item"));



    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("total-amount");

    if (!cartItemsContainer || !cartTotal) {
        console.log("Cart elements not found in DOM!");
        return;
    }

    cartItemsContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.textContent = "$0.00";
        return;
    }

    // loops through each item in the cart and dynamically creates an HTML list item
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const li = document.createElement("li");
        li.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="50">
            <span>${item.name} (${item.size}) - $${item.price} x ${item.quantity}</span>
            <button class="remove-item" data-id="${item.id}" data-size="${item.size}">Remove</button>`;

        cartItemsContainer.appendChild(li);
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
    updateCartDisplay();

}

// ---------------------------------------------------------------------------------------End------------------------------------------------------------------------------------------------------



// Clear Cart Button
const clearCartButton = document.getElementById("clear-cart");
if (clearCartButton) {
    clearCartButton.addEventListener("click", () => {
        console.log("Clearing Cart...");
        localStorage.removeItem("cart"); 
        cart = []; 
        displayCart(); 
        updateCartDisplay(); 
    });
}







// Attach Event Listeners for "Add to Cart" Buttons
function attachCartListeners() {
    console.log("Attaching 'Add to Cart' Listeners...");

    setTimeout(() => {
        const buttons = document.querySelectorAll(".add-to-cart");
        console.log("Found Add to Cart buttons:", buttons.length);

        buttons.forEach(button => {
            button.removeEventListener("click", handleAddToCart);
            button.addEventListener("click", handleAddToCart);
        });

        console.log("Add to Cart Listeners Successfully Attached!");
    }, 500);
}







// -----------------------------------------------------------------Functoin for add to cart eventlistner---------------------------------------------------------------------

function handleAddToCart(event) {
    event.preventDefault();
    const jacketId = event.target.dataset.id;

    if (!jacketId) {
        console.error(" Jacket ID not found!");
        return;
    }

    console.log(" Add to Cart Clicked! Jacket ID:", jacketId);
    addToCart(jacketId);
}

document.addEventListener("DOMContentLoaded", () => {
    console.log(" Setting Up Cart...");
    attachCartListeners();
    updateCartDisplay();
    updateCartDisplay();

});

// ---------------------------------------------------------------------------------------End------------------------------------------------------------------------------------------------------





// ----------------------------------------------------------------------Complete PUrchase BTN-----------------------------------------------------------------------------------------------------




document.addEventListener("DOMContentLoaded", () => {
    const completePurchaseBtn = document.getElementById("complete-purchase");
    const confirmationBox = document.getElementById("confirmation-box");
    const closeConfirmationBtn = document.getElementById("close-confirmation");
    const blurOverlay = document.getElementById("blur-overlay");
    const phoneInput = document.getElementById("phone");
    const emailInput = document.getElementById("email");
    const nameInput = document.getElementById("name");
    const addressInput = document.getElementById("address");
    const cardNumberInput = document.getElementById("card-number");
    const expirationDateInput = document.getElementById("expiry-date");
    const cvvInput = document.getElementById("cvv");

    if (!completePurchaseBtn || !confirmationBox || !closeConfirmationBtn || !blurOverlay || !phoneInput || !emailInput || !nameInput || !addressInput || !cardNumberInput || !expirationDateInput || !cvvInput) {
        console.log("One or more required elements are missing!");
        return;
    }

    completePurchaseBtn.addEventListener("click", () => {
        console.log("Checking form before purchase...");

        const phoneNumber = phoneInput.value.trim();
        const email = emailInput.value.trim();
        const fullName = nameInput.value.trim();
        const address = addressInput.value.trim();
        const cardNumber = cardNumberInput.value.trim();
        const expirationDate = expirationDateInput.value.trim();
        const cvv = cvvInput.value.trim();

        // <parameters
        if (!phoneNumber) {
            alert("⚠️ Please enter your phone number before proceeding.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("⚠️ Please enter a valid email address before proceeding.");
            return;
        }
      
        if (!fullName) {
            alert("⚠️ Please enter a valid name before proceeding.");
            return;
        }

        if (!address) {
            alert("⚠️ Please enter a valid address before proceeding.");
            return;
        }

        const cardRegex = /^\d{4} \d{4} \d{4} \d{4}$/;
        if (!cardRegex.test(cardNumber)) {
            alert("⚠️ Please enter a valid card number (format: 1234 5678 9012 3456).");
            return;
        }

        const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!expiryRegex.test(expirationDate)) {
            alert("⚠️ Please enter a valid expiration date (MM/YY).");
            return;
        }

        const cvvRegex = /^\d{3}$/;
        if (!cvvRegex.test(cvv)) {
            alert("⚠️ Please enter a valid 3-digit CVV.");
            return;
        }

        console.log("All fields are filled! Proceeding with purchase...");

        confirmationBox.classList.add("show");
        blurOverlay.classList.add("show");

        localStorage.removeItem("cart");
        updateCartDisplay();
        displayCart();
    });

    closeConfirmationBtn.addEventListener("click", () => {
        confirmationBox.classList.remove("show");
        blurOverlay.classList.remove("show");
    });
});



// ---------------------------------------------------------------------------------------End------------------------------------------------------------------------------------------------------





// ------------------------------------------------------------------------------Card numbet and expriationdate fixer------------------------------------------------------------------------------


document.addEventListener("DOMContentLoaded", function () {
    const cardNumberInput = document.getElementById("card-number");
    const expiryDateInput = document.getElementById("expiry-date");


    // Auto-format card number wit space every 4 number 
    if (cardNumberInput) {
        cardNumberInput.addEventListener("input", function (e) {
            let value = e.target.value.replace(/\D/g, "");
            value = value.replace(/(.{4})/g, "$1 ").trim();
            e.target.value = value;
        });
    }
    // Auto-format card date with / after 2. number 
    if (expiryDateInput) {
        expiryDateInput.addEventListener("input", function (e) {
            let value = e.target.value.replace(/\D/g, "");
            if (value.length > 2) {
                value = value.replace(/(\d{2})(\d{1,2})/, "$1/$2");
            }
            e.target.value = value;
        });
    }
});


// ---------------------------------------------------------------------------------------End------------------------------------------------------------------------------------------------------



// ------------------------------------------------------------------Runs displayCart() automatically when the page loads--------------------------------------------------------------------------



document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Loaded, Running displayCart()...");
    displayCart(); 
});


// ---------------------------------------------------------------------------------------End------------------------------------------------------------------------------------------------------



// ----------------------------------------------------------Listen for clicks on remove buttons and remove the corresponding item from the cart------------------------------------------------------


document.addEventListener("click", event => {
    if (event.target.classList.contains("remove-item")) {
        console.log("Remove Button Clicked!", event.target);
        
        const id = event.target.getAttribute("data-id");
        const size = event.target.getAttribute("data-size");

        if (!id || !size) {
            console.log("⚠️ Remove button missing ID or size!");
            return;
        }

        console.log(`Removing Jacket ID: ${id}, Size: ${size}`);
        removeFromCart(id, size);
    }
});

// ---------------------------------------------------------------------------------------End------------------------------------------------------------------------------------------------------



// -----------------------------------------------------------Toggle checkout form visibility when checkout button is clicked-------------------------------------------------------------------


document.addEventListener("DOMContentLoaded", () => {
    const checkoutButton = document.getElementById("checkout-button");
    const checkoutFormContainer = document.querySelector(".checkout-container"); 

    if (!checkoutButton || !checkoutFormContainer) {
        console.log("Checkout button or form not found!");
        return;
    }

    checkoutFormContainer.style.display = "none";

    checkoutButton.addEventListener("click", () => {
        console.log("Checkout button clicked!");

        if (checkoutFormContainer.style.display === "none" || checkoutFormContainer.style.opacity === "0") {
            checkoutFormContainer.style.display = "block";
            setTimeout(() => {
                checkoutFormContainer.style.opacity = "1";
                checkoutFormContainer.style.transform = "translateY(0)"; 
            }, 10);
        } else {
            checkoutFormContainer.style.opacity = "0";
            checkoutFormContainer.style.transform = "translateY(-20px)"; 
            setTimeout(() => {
                checkoutFormContainer.style.display = "none";
            }, 500);
        }
    });
});
// ---------------------------------------------------------------------------------------End------------------------------------------------------------------------------------------------------
