import {cart, addToCart} from '../data/cart-class.js';
import {products, loadProducts} from '../data/products.js';
import { formatCurrency} from './utils/money.js';


// STORES THE PRODUCTS HTML ELEMENTS
// Each time we loop through the array, we will add it inside the productsHTML variable. This is called  Accumulator pattern because we are accumulating the data inside the variable.
let productsHTML = '';

// Loop through the products and generate HTML elements
// Next we insert template literals so the data changes dynamically based on the product
  products.forEach((product) => {
      productsHTML +=` 
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
              ${product.getPrice()}
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

// SELECTS THE PRODUCTS GRID CLASS IN THE AMAZON.HTML
// This grabs the element with the js-products-grid class and uses the innerHTML property to change the text inside the element to the productsHTML variable.
document.querySelector('.js-products-grid').innerHTML = productsHTML;

// UPDATE CART QUANTITY FUNCTION
function updateCartQuantity(){
  let cartQuantity = 0;
  // Each time the cart quantity is updated, the function loops through the cart array and adds the quantity of each item to the cartQuantity variable. 
  // Finally, the function sets the innerHTML of the element with the class js-cart-quantity to the cartQuantity.
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  // This grabs the element with the class js-cart-quantity and uses the innerHTML property to change the text inside the element to the cartQuantity variable.
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  }

// ADD-TO-CART BUTTON FUNCTIONALITY/INTERACTIVITY
document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;// This gets the product id from the data-product-id attribute located in the button element
    addToCart(productId);// This calls the addToCart function from the cart.js file and passes the productId as an argument
    updateCartQuantity();// This calls the updateCartQuantity function to update the cart quantity after adding a product to the cart
    });
  });