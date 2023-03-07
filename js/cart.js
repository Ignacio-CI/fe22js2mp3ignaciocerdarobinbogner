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



const cart = JSON.parse(localStorage.getItem('products'));
const cartContainer = document.querySelector('#cart-container');
let total = 0;

cart.forEach(({ name, price }) => {

    // const itemImg = document.createElement('img');
    // itemImg.src = `.${imgUrl}`;  

    const itemName = document.createElement('h2');
    itemName.innerText = `${name}`;

    const itemPrice = document.createElement('h3');
    itemPrice.innerText = `${price}`;

    cartContainer.append(itemName, itemPrice);

    total += price;
    const totalValue = document.querySelector('#total-value')
    totalValue.innerText = 'Total price :' + total
    totalValue.innerText = 'Total price :' + total
});
const emptyBtn = document.querySelector('#empty-btn');

emptyBtn.addEventListener('click', event => {
  event.preventDefault();
  localStorage.removeItem('products');
  location.reload()
});


const buyBtn = document.querySelector('#pay-btn');
buyBtn.addEventListener('click', event => {
    event.preventDefault();
    localStorage.removeItem('products');
    location.reload()

    const db = getDatabase();
    productIdArray.forEach(id => {
      update(ref(db, 'products/' + id), (snapshot) => {
        const saldo = snapshot.val().saldo;
        console.log(saldo) 
         
      })
  
    })

  });