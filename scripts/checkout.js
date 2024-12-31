import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {products, loadProductsFetch} from '../data/products.js';
import {loadCart} from '../data/cartClass.js';

// This loads the page when the user navigates to the checkout page.
async function loadPage() {
    try {
        console.log('Currently Fetching products...');
        await loadProductsFetch();
        console.log('Successfully fetched products!');
        console.log('Displaying Products Array:', products); // Debugging line

        console.log('Currently Fetching cart...');
        await loadCart(); // Wait for the cart to load
        console.log('Successfully fetched cart!');

        renderOrderSummary();
        renderPaymentSummary();
    } catch (error) {
        console.error('Error loading page:', error);
    }
}

loadPage();



