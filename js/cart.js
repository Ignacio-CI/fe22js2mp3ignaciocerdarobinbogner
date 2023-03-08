// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, ref, get, set, onValue, update, child } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js"
import _ from '../node_modules/underscore/underscore-esm.js'
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

const currentSaldoArr = [];

const logo = document.querySelector('.logo');
logo.addEventListener('click', event => {
    event.preventDefault();

    location.assign('../index.html');
})

const cart = JSON.parse(localStorage.getItem('products'));
console.log(cart);

function getItemsId(cart) {
    const itemsId = []

    cart.forEach(index => {
        itemsId.push(index[0])
    })

    return itemsId
}

const itemsIdArray = getItemsId(cart);
console.log(itemsIdArray);

const amountOfEachItem = itemsIdArray.reduce((obj, item) => {
    if (!obj[item]) {
        obj[item] = 0;
    }
    obj[item]++;
    return obj;
}, {});

const productAmountArray = _.pairs(amountOfEachItem);

productAmountArray.forEach(index => {
    getCurrentSaldo(index[0])
})

const cartContainer = document.querySelector('#cart-container');

let total = 0;

if (cart !== null) {
    cart.forEach(product => {
        const {name, price} = product[1];
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
    });
}

const emptyBtn = document.querySelector('#empty-btn');

emptyBtn.addEventListener('click', event => {
    event.preventDefault();
    localStorage.removeItem('products');
    location.reload()
});


const buyBtn = document.querySelector('#pay-btn');
buyBtn.addEventListener('click', event => {
    event.preventDefault();

    for(let i = 0; i < productAmountArray.length; i++) {
        const itemId = productAmountArray[i][0];
        const amountInCart = productAmountArray[i][1];
        const currentSaldo = currentSaldoArr[i]

        const newSaldo = currentSaldo - amountInCart;
       
        update(ref(database, `products/${itemId}` ), {
            saldo: newSaldo
        })
    }
    
    setTimeout(() => {
        localStorage.removeItem('products');
        location.assign('../index.html');
    }, 3000);

});

function getCurrentSaldo(id) {

    onValue(ref(database, `products/${id}`), (snapshot) => {
        currentSaldoArr.push(snapshot.val().saldo)
    })
}