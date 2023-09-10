// Your existing JavaScript code
document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault(); // stop form from submitting

    let quantity = document.getElementById('quantity').value;
    let productCost = 299.99; // the cost of the product

    let shippingMethod = document.querySelector('input[name="shipping"]:checked').value;
    let shippingCost = 0;
    let shippingTimeMessage = "";

    switch(shippingMethod) {
        case 'overnight':
            shippingCost = 19.99;
            shippingTimeMessage = "Next-day delivery";
            break;
        case '2day':
            shippingCost = 9.99;
            shippingTimeMessage = "2-day delivery";
            break;
        case 'budget':
            shippingTimeMessage = "4-8 days delivery";
            // Display a popup for the budget shipping method
            openShippingPopup(shippingTimeMessage);
            break;
        default:
            shippingCost = 0;
            break;
    }

    let totalCost = (productCost * quantity) + shippingCost;

    // Display the price breakdown in the modal
    const modalContent = `
      <img src="3dprinter.jpeg" alt="3D Printer Kit" />
      <p>Product Details:</p>
      <p>Quantity: ${quantity}</p>
      <p>Price per unit: $${productCost.toFixed(2)}</p>
      <p>Shipping Method: ${shippingTimeMessage}</p>
      <p>Shipping Cost: $${shippingCost.toFixed(2)}</p>
      <p>Total Price: $${totalCost.toFixed(2)}</p>
      <button id="confirmBtn">Confirm Order</button>
    `;

    openModal(modalContent);
});

// Function to open a modal
function openModal(content) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = content;
    document.body.appendChild(modal);

    // Add event listener to the "Confirm Order" button
    document.getElementById('confirmBtn').addEventListener('click', function() {
        closeModal();
        openConfirmationPage();
    });
}

// Function to close the modal
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

// Function to open the confirmation page
function openConfirmationPage() {
    // Redirect to the confirmation page
    window.location.href = 'confirmation.html';
}

// Function to open a popup for budget shipping method
function openShippingPopup(message) {
    const popupContent = `
      <div class="popup">
        <p>${message}</p>
        <button id="okBtn">OK</button>
      </div>
    `;

    const popup = document.createElement('div');
    popup.classList.add('popup-container');
    popup.innerHTML = popupContent;
    document.body.appendChild(popup);

    // Add event listener to the "OK" button
    document.getElementById('okBtn').addEventListener('click', function() {
        closePopup();
    });

    // Close popup when clicking outside
    popup.addEventListener('click', function(event) {
        if (event.target === popup) {
            closePopup();
        }
    });
}

// Function to close the shipping popup
function closePopup() {
    const popup = document.querySelector('.popup-container');
    if (popup) {
        popup.remove();
    }
}

// Additional JavaScript code from your previous script
document.getElementById('same-address').addEventListener('change', function() {
    if (this.checked) {
        document.getElementById('saddress').value = document.getElementById('baddress').value;
        document.getElementById('scity').value = document.getElementById('bcity').value;
        document.getElementById('sstate').value = document.getElementById('bstate').value;
        document.getElementById('szip').value = document.getElementById('bzip').value;
    } else {
        document.getElementById('saddress').value = '';
        document.getElementById('scity').value = '';
        document.getElementById('sstate').value = '';
        document.getElementById('szip').value = '';
    }
});

document.getElementById('email').addEventListener('input', function (event) {
    let email = event.target.value;
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!email.match(pattern)) {
        document.getElementById('email-error').style.display = 'block';
        document.getElementById('email-error').innerHTML = "<p>Please make sure your email is correct.</p>";
    } else {
        document.getElementById('email-error').style.display = 'none';
        document.getElementById('email-error').innerHTML = "";
    }
});

document.getElementById('paypal').addEventListener('change', function() {
    document.getElementById('credit-card-fields').style.display = 'none';
    document.getElementById('paypal-fields').style.display='block';
});

document.getElementById('credit-card').addEventListener('change', function() {
    document.getElementById('credit-card-fields').style.display = 'block';
    document.getElementById('paypal-fields').style.display='none';
});
