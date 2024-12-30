import {cart, addToCart} from '../data/cart.js';
import {products, loadProducts} from '../data/products.js';
import { formatCurrency} from './utils/money.js';

// This selects the products-grid class in the amazon.html file 
// And uses the innerHTML property to insert the productsHTML elements inside the products-grid div
document.querySelector('.js-products-grid').innerHTML = productsHTML;

// This makes the Add to Cart button functional/interactive when clicked
document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;// This gets the product id from the data-product-id attribute located in the button element
    addToCart(productId);
    updateCartQuantity();
    });
  });


// This stores the products that will be displayed on the page
// Each time we loop through the array, we will add it inside the productsHTML variable. This is called  Accumulator pattern because we are accumulating the data inside the variable.
let productsHTML = '';

// Loop through the products and generate HTML elements
// Next we insert template literals so the data changes dynamically based on the product
  products.forEach((product) => {
      productsHTML = productsHTML + ` 
          <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${product.getStartsUrl()}">
              <div class="product-rating-count link-primary">
                ${product.rating.count} 
              </div>
            </div>

            <div class="product-price">
              $${product.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            
            ${product.extraInfoHTML()} 

            <div class="product-spacer"></div>

            <div class="added-to-cart">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button
            button-primary js-add-to-cart"
            data-product-id="${product.id}"> 
              Add to Cart
            </button>
          </div>`;
      
  });