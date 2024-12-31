// Gets the order array from localStorage and converts it to a JSON object. 
// If there is no order array in localStorage, it sets the orders array to an empty array.
export const orders = JSON.parse(localStorage.getItem('orders')) || [];

// Adds an order to the front of the orders array and saves it to localStorage.
export function addOrder(order) {
    orders.unshift(order);
    saveToStorage();
}

// Saves the orders array to localStorage as a JSON string.
function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}
