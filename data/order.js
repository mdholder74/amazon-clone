export const orders = JSON.parse(localStorage.getItem('orders')) || [];// Retrieves the orders array from localStorage or sets it to an empty array if there are no orders.

export function addOrder(order) {
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));// Saves the orders array to localStorage.
}
