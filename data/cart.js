export let cart;

loadFromStorage();

export function loadFromStorage() {
  // This uses JSON.parse to get the cart from localStorage. If there is no cart, it sets the cart to an array with two objects. Each object has a productId and a quantity. The productId is the id of a product in the products array. The quantity is the number of that product in the cart.
  cart = JSON.parse(localStorage.getItem('cart'))

  if (!cart) {
      cart = [{
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

// ADD/INCREASE QUANTITY TO CART FUNCTION
export function addToCart(productId) {
    let matchingItem;

    // CHECKS IF PRODUCT IS ALREADY IN CART
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    // IF PRODUCT IS IN CART, INCREASE QUANTITY BY 1
    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {// IF PRODUCT IS NOT IN CART, ADD PRODUCT TO CART
      cart.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1',
      })
    }

    saveToStorage();
}

//REMOVES ITEM FROM CART BASED ON PRODUCT ID
export function removeFromCart(productId) {
  const newCart = [];
// This loops through the cart array and adds all items to the newCart array except the item with the productId that we want to remove.
  cart.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
          newCart.push(cartItem);
      }
  });

  cart = newCart;

  saveToStorage();

}