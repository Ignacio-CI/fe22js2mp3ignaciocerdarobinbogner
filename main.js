// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, ref, get, set, onValue, update, child } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js"

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

const productIdArray = Object.keys(products);

// Kolla om produkten finns eller inte in stock
outOfStock(productIdArray);

const itemsInCart = JSON.parse(localStorage.getItem('products'));
console.log(itemsInCart)

const prodAmountElement = document.querySelector('#prod-amount');

// Kolla om det finns produkter i kundvagnen sedan en tidigare session så att antalet visas
if(localStorage.getItem('products') === null) {
  prodAmountElement.innerText = 0;
}
else {
  prodAmountElement.innerText = `${itemsInCart.length}`;
}

//Visa produkterna på DOM
const container = $('#products-container');
Object.values(products).forEach(({ name, imgUrl, price, saldo }) => {

  const productDiv = $('<div>', { class: 'card' });

  const productImage = $('<img>', { src: imgUrl });

  const productName = $('<h2>', { text: name });

  const productPrice = $('<p>', { text: `${price} kr` });

  const productQuantity = $('<h4>', { text: `In stock : ${saldo}` });
  
  const addToCartBtn = $('<button>', { text: 'Add to cart' });
  
  productDiv.append(productImage, productName, productPrice, productQuantity, addToCartBtn);
  container.append(productDiv);

});

const cart = [];

const addButtons = document.querySelectorAll('button');

for (let i = 0; i < addButtons.length; i++) {
  addButtons[i].className = productIdArray[i];

  
  addButtons[i].addEventListener('click', event => {
    event.preventDefault()
    
    const productId = event.target.className;
    
    updateCart(productId);
    
  })
}


function outOfStock(productIdArray) {
  const db = getDatabase();
  productIdArray.forEach(id => {
    onValue(ref(db, 'products/' + id), (snapshot) => {
      const saldo = snapshot.val().saldo;
      console.log(saldo) 
      if(saldo == 0) {
        const btn = document.getElementsByClassName(id);
        btn[0].disabled = true;
        btn[0].style.backgroundColor = 'gray';
      }    
    })

  })
}

function updateCart(id) {

  const db = getDatabase();
  const product = ref(db, 'products/' + id);

  onValue(product, (snapshot) => {
    const itemData = snapshot.val();
    cart.push(itemData);
    console.log(cart)
    const prodAmount = document.querySelector('#prod-amount');
    prodAmount.innerText = `${cart.length}`;
    localStorage.setItem('products', JSON.stringify(cart));
  });

}


































// Add event listener to add-btn
// $('.add-btn').on('click', function(){
//   // Get the product name, price, and stock
//   const productName = $(this).siblings('h2').text(); // Get the text of the h2 element that is a sibling of the add-btn
//   const productPrice = $(this).siblings('p').text(); // Get the text of the p element that is a sibling of the add-btn 
//   const productStock = parseInt($(this).siblings('h4').text().replace('In stock : ', '')); // Get the text of the h4 element that contains "In stock" and extract the stock level from it

//   // Check if the product is in stock
//   if (productStock > 0) {
//     // Create a new object with the product name, price, and reduced stock
//     const product = {
//       name: productName,
//       price: productPrice,
//       stock: productStock - 1
//     };

//     // Get the products from localStorage
// let products;
// if (localStorage.getItem('products') === null) {
//   products = [];
// } else {
//   products = JSON.parse(localStorage.getItem('products'));
// }

// // Add the new product to the products array
// products.push(product);

// // Save the products array back to localStorage
// localStorage.setItem('products', JSON.stringify(products));


// // Update the product stock in the DOM
// $(this).siblings('h4').text(`In stock : ${product.stock}`);

// // Update the cart count in the DOM
// const prodAmount = document.querySelector('#prod-amount');
// prodAmount.innerText = `${products.length}`;

//   };
// })



$("#cart-btn").on("click", event => {
  event.preventDefault()
  location.assign('./html/cart.html');
});


