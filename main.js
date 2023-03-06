// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, ref, get, onValue } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js"

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyBVGKXt0navmTtlydS0X82fEUJTqxxcvg8",

  authDomain: "javascript2-mp3-store.firebaseapp.com",

  databaseURL: "https://javascript2-mp3-store-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "javascript2-mp3-store",

  storageBucket: "javascript2-mp3-store.appspot.com",

  messagingSenderId: "619437220811",

  appId: "1:619437220811:web:96295158981c815d3fcc4e"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


//Hämta products från databasen
const productsRef = ref(database, 'products');

const productsSnapshot = await get(productsRef);
const products = productsSnapshot.val();

console.log(products);

//posta produkter på DOM
const container = $('#products-container');
Object.values(products).forEach(({name, imgUrl, price, saldo}) => {

  const productDiv = $('<div>', { class: 'card' });

  const productImage = $('<img>', { src: imgUrl });

  const productName = $('<h2>', { text: name });

  const productPrice = $('<p>', { text: `${price} kr`});

  const productQuantity = $('<p>', { text: `In stock : ${saldo}` });

  const addToCartBtn = $('<button>', { text: 'Add to cart', class: 'add-btn'});

  productDiv.append(productImage, productName, productPrice, productQuantity, addToCartBtn);
  container.append(productDiv);

});

// Add event listener to add-btn
$('.add-btn').on('click', function(){
  // Get the product name and price
  const productName = $(this).siblings('h2').text(); // Get the text of the h2 element that is a sibling of the add-btn
  const productPrice = $(this).siblings('p').text(); // Get the text of the p element that is a sibling of the add-btn 

  // Create a new object with the product name and price
  const product = {
    name: productName,
    price: productPrice
  };

  // Get the products from localStorage
  let products;

  if (localStorage.getItem('products') === null) {
    products = [];
  } else {
    products = JSON.parse(localStorage.getItem('products'));
  }

  // Add the new product to the products array
  products.push(product);

  // Save the products array back to localStorage
  localStorage.setItem('products', JSON.stringify(products));

  console.log('Product added to cart');
});
// const addToCartBtns = document.querySelectorAll('.add-btn');
// addToCartBtns.forEach((btn) => {
//   btn.addEventListener('click', (event) => {
//     // Get product name and price from DOM elements
//     const productName = event.target.parentElement.querySelector('h2').textContent;
//     const productPrice = parseFloat(event.target.parentElement.querySelector('p').textContent.split(' ')[0]);

//     // Check if item is already in cart
//     let cart = JSON.parse(localStorage.getItem('cart')) || {};
//     if (cart.hasOwnProperty(productName)) {
//       cart[productName].quantity += 1;
//     } else {
//       cart[productName] = {
//         price: productPrice,
//         quantity: 1
//       };
//     }

//     // Save cart to local storage
//     localStorage.setItem('cart', JSON.stringify(cart));
//   });
// });


$("#cart-btn").on("click", event => {
  event.preventDefault()
  location.assign('./html/cart.html');
});

onValue(productsRef, (snapshot) => {
  const data = snapshot.val();
  console.log(data)
})
