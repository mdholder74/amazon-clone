import {cart} from '../../data/cart-class.js';
import {getProduct} from '../../data/products.js';
import {getDeliveryOption} from '../../data/deliveryOptions.js';
import {formatCurrency} from '../utils/money.js';
import {addOrder} from '../../data/order.js';


export function renderPaymentSummary() {
    let productPriceCents = 0; // This variable will store the total price of all the products in the cart.
    let shippingPriceCents = 0; // This variable will store the total cost of shipping of all the delivery options in the cart.

    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;// This calculates the total price of all the products in the cart by multiplying the product price by the quantity of each product.
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;// This calculates the total cost of shipping of all the delivery options in the cart by adding the price of each delivery option.

    });

const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
const taxCents = totalBeforeTaxCents * 0.1;
const totalCents = totalBeforeTaxCents + taxCents;

const paymentSummaryHTML = `
 <div class="payment-summary-title">
    Order Summary
    </div>

    <div class="payment-summary-row">
        <div>Items (3):</div>
        <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary
    js-place-order">
        Place your order
    </button>
`;

document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

// USED BACKEDN REQUEST TO PLACE ORDER
// This adds an event listener to the Place-your-order-button. When the button is clicked, the function sends a POST request to the server with the cart products data. 
// If the request is successful, the function adds the order to the orders array and redirects the user to the orders page.
document.querySelector('.js-place-order').addEventListener('click', async () => {
    try {
        const response = await fetch('https://supersimplebackend.dev/orders', {// This is the URL path to the orders endpoint where the POST request is sent.
            method: 'POST',// POST sends data to the server.
            headers: {// Headers are required to send JSON data.
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({// This sends the cart data to the server as a JSON string.
                cart: cart
            })
        });
    
        const order = await response.json()// This converts the response from the server to JSON.
        addOrder(order);

    }catch (error) {
        console.error('Unexpected error. Try again later.')
    }

    window.location.href = 'orders.html';// Redirects to the orders page through the browser and the path.
});

}