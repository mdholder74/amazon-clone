//The first four imports are named imports. We use curly braces to import
// Default exports dont need curly braces when importing.Each file can only have one default export.
import {cart, removeFromCart, updateDeliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js' 
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';


export function renderOrderSummary() {
// STORES THE-CART-SUMMARY HTML ELEMENTS
// Each time we loop through the array, we will add it inside the cartSummaryHTML variable. This is called  Accumulator pattern because we are accumulating the data inside the variable.
  let cartSummaryHTML = '';

// For each item in the cart, we will get the product and delivery option and add it to the cartSummaryHTML variable.
  cart.forEach((cartItem) => {
    const productId = cartItem.productId
    const matchingProduct = getProduct(productId);// This gets the product from the products array that matches the productId in the cartItem. This gives us access to the product's name, image, and price.
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);

// USING DAYJS EMS LIBRARY
// Gets the current date and add the delivery days from the delivery option to get the delivery date.
  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
  const dateString = deliveryDate.format('dddd, MMMM D');
  
  // This generates the HTML for the cart item by looping through the cart array and adding the product name, image, price, quantity, and delivery option to the cartSummaryHTML variable.
  cartSummaryHTML += `
  <div class="cart-item-container 
  js-cart-item-container
  js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${matchingProduct.getPrice()}
          </div>
          <div class="product-quantity js-product-quantity-${matchingProduct.id}">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}"
            data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>
    `;
  });

  // UPDATE DELIVERY OPTION FUNCTIONALITY/INTERACTIVITY
  function deliveryOptionsHTML(matchingProduct, cartItem) {
   // STORES THE DELIVERY-OPTIONS HTML ELEMENTS
    // Each time we loop through the array, we will add it inside the html variable. This is called  Accumulator pattern because we are accumulating the data inside the
    let html = '';

    // For each delivery option, we will add the delivery date and price to the html variable.
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');// This gets the current date and adds the delivery days from the delivery option to get the delivery date.
      const dateString = deliveryDate.format('dddd, MMMM D');// This takes the delivery date and formats it to display the day of the week, month, and day in a string format.
      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} `;// This checks if the delivery option is free and sets the priceString to 'FREE' if it is. If the delivery option is not free, it sets the priceString to the price in dollars.
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;// This checks if the delivery option id matches the deliveryOptionId in the cartItem and sets the isChecked variable to true if it does.
    
      // This generates the HTML for the delivery options by looping through the deliveryOptions array and adding the delivery date and price to the html variable when the delivery option matches the deliveryOptionId in the cartItem.
      html +=`
        <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
                <input type="radio"
                ${isChecked ? 'checked' : ''}
                  class="delivery-option-input"
                  name="delivery-option-${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                    ${dateString}
                  </div>
                  <div class="delivery-option-price">
                    ${priceString} - Shipping
                  </div>
                </div>
              </div>
        `
    });

  return html;

  }

// SELECTS THE ORDER SUMMARY CLASS IN THE CHECKOUT.HTML
// This grabs the element with the js-order-summary class and uses the innerHTML property to change the text inside the element to the cartSummaryHTML variable.
document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

// DELETE QUANTITY FUNCTIONALITY/INTERACTIVITY 
document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;// This gets the product id from the data-product-id attribute located in the link element that we want to delete.
        removeFromCart(productId);

        // This removes the cart item container with the product info from the order summary when the delete link is clicked.
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();

        renderPaymentSummary();

    });
});

// UPDATE QUANTITY FUNCTIONALITY/INTERACTIVITY
document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const productId = element.dataset.productId;// This gets the product id and delivery option id from the data-product-id and data-delivery-option-id attributes located in the element that we want to update.
      const deliveryOptionId = element.dataset.deliveryOptionId;// This gets the delivery option id from the data-delivery-option-id attribute located in the element that we want to update.
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();

    });
  });

}

