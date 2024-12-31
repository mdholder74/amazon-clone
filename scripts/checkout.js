import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
// import {loadProducts, loadProductsFetch} from '../data/products.js';
// import {loadCart} from '../data/cart-class.js';

/*
// EXAMPLE OF ASYNC/AWAIT
async function loadPage() {
    try{
        // throw 'error1';// This is how you manually throw an error with async/await

        await loadProductsFetch();

        const value = await new Promise((resolve, reject) => {// Use reject to throw an error in the future or async/await
            loadCart(() => {
                resolve('value3');
            });  
        });

    } catch (error) {// This is how you handle errors with async/await
        console.log(error);
    }


    renderOrderSummary();
    renderPaymentSummary();

}
loadPage();
*/

renderOrderSummary();
renderPaymentSummary();