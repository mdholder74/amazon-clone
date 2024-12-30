// Description: This file contains the money utility functions.
// The formatCurrency function takes a price in cents/ number and returns a string with two decimal places.
export function formatCurrency(priceCents) {
    return (Math.round(priceCents) / 100).toFixed(2);

}

export default formatCurrency;