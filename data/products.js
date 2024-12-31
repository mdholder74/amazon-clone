import {formatCurrency} from "../scripts/utils/money.js";

// Finds the product in the products array that matches the productId
export function getProduct (productId) {
  let matchingProduct;

  products.forEach((product) => {
      if (product.id === productId) {
          matchingProduct = product;
      }
  });

  return matchingProduct;

}

// CREATED A PRODUCT CLASS
class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  // SETUP CONSTRUCTOR CODE
  // This constructor takes in a product object and assigns the values to the properties of the class.
  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  getStartsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;

  }
  getPrice() {
    return `$${formatCurrency(this.priceCents)}`;

  }
  extraInfoHTML() {
    return '';
  }

}

// INHERITANCE
// The Clothing class inherits from the Product class such as properties and methods.
// The Clothing class has a sizeChartLink property and method that the Product class does not have.
class Clothing extends Product {
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails);// The super keyword is used to call the constructor of the parent class Product.
    this.sizeChartLink = productDetails.sizeChartLink;// This assigns the sizeChartLink property from the productDetails object to the sizeChartLink property of the Clothing class.
  }

  // This method returns a link to the size chart for the clothing item from the productDetails object.
  // We used method overriding to override the extraInfoHTML method from the Product class to make it more specific to the Clothing class.
  extraInfoHTML() {
    return `
    <a href="${this.sizeChartLink}" target="_blank">Size Chart</a>`
  }

}

// This is an empty array that will store the products fetched from the server.
export let products = []

// The fetch() method is a built-in JavaScript function that to make HTTPS requests to servers.
// Once the promise is returned, it will be saved in the parameter of the then(productsData) as a response.
export async function loadProductsFetch(callbackFun) {
  try {
      const response = await fetch('https://supersimplebackend.dev/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const productsData = await response.json();
      console.log('Fetched Products:', productsData); // Debugging line

      products = productsData.map((productDetails) => {//This maps over the products array and creates a new object based on the type of product. Its stored in a new array called products.
          if (productDetails.type === 'clothing') { // This checks if the productDetails object has a type property with a value of "clothing" and creates a new Clothing object if it does.
              return new Clothing(productDetails);
          }
          return new Product(productDetails); // This creates a new Product object if the productDetails object does not have a type property with a value of "clothing".
      });
      
      if(callbackFun)callbackFun();// This calls the function passed as an parameter to the loadProductsFetch function. This allows the function to be called after the products have been fetched and loaded.

      console.log('Products Array:', products); // Verify the products array
  } catch (error) {
      console.error('Error in loadProductsFetch:', error);
      throw error;
  }
}





