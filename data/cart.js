

//ADD TO CART FUNCTION
export function addToCart(productId) {
    let matchingItem;

    //CHECKS IF PRODUCT IS ALREADY IN CART
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