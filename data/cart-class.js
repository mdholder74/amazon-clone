// A class is a blueprint/template for creating objects. It defines the properties and methods that an object will have.
// A class is a way to group related data and functions together inside an object.

export default class Cart {
  cartItems;// This is a public property. It is accessible outside the class. It is used to store the items in the cart.
  #localStorageKey;// This is a private property. It is only accessible within the class. It is used to store the key for the localStorage item.

  // A constructor method that runs automatically when a new instance of the class is created. The constructor sets up the properties of the class.
  constructor(localStorageKey) {
      this.#localStorageKey = localStorageKey;// This sets the #localStorageKey to the localStorageKey parameter that is passed in when a new instance of the class is created.
      this.#loadFromStorage();// This calls the loadFromStorage method to load the cart from localStorage when a new instance of the class is created.
  }

  #loadFromStorage() {
        // This uses JSON.parse to get the cart from localStorage and converts it back to an array. 
      this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey))
      // If there is no cart, it sets the cart to an default array with two objects inside the cart. 
      if (!this.cartItems) {
          this.cartItems = [{
              productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
              quantity: 2,
              deliveryOptionId: '1',
          }, {
              productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
              quantity: 1,
              deliveryOptionId: '2',
          }];
      }
      }

  // SAVE TO LOCAL STORAGE METHOD
  // This method saves the data to localStorage. It uses JSON.stringify to convert the cart array to a string before saving it to localStorage.
  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  // ADD/INCREASE QUANTITY TO CART METHOD
  addToCart(productId) {
      let matchingItem;

      // CHECKS IF PRODUCT IS ALREADY IN CART
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
      // IF PRODUCT IS IN CART, INCREASE QUANTITY BY 1
      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {// IF PRODUCT IS NOT IN CART, ADD PRODUCT TO CART
        this.cartItems.push({
          productId: productId,
          quantity: 1,
          deliveryOptionId: '1',
        })
      }

      this.saveToStorage();// After we add the item to the cart, we call the saveToStorage function to save the cart to localStorage.
  }

  //REMOVES ITEM FROM CART BASED ON PRODUCT ID METHOD
  removeFromCart(productId) {
    const newCart = [];
  // This loops through the cart array and adds all items to the newCart array except the item with the productId that we want to remove.
  this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    this.cartItems = newCart;

    this.saveToStorage(); // After we remove the item from the cart, we call the saveToStorage function to save the cart to localStorage.

  }
  // UPDATES DELIVERY OPTION DATE BASED ON PRODUCT ID
  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  };
}

export let loadProducts = [];

export async function loadCart() {
    try {
        const response = await fetch('https://supersimplebackend.dev/cart');
        
        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
            throw new Error(`Error fetching cart data: ${response.statusText}`);
        }

        const cartData = await response.json(); // Parse the JSON response
        console.log(cartData); // Log the response data

        // You can return or process the data here as needed
        return cartData; // If you want to return the data for further use
    } catch (error) {
        console.error('Error loading cart:', error);
    }
}

