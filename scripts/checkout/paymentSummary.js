import {cart} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { formatCurrency } from '../utils/money.js';
import { addOrder } from '../../data/order.js';


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

}