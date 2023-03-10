import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, ref, get, set, onValue, update, child } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js"
import _ from '../node_modules/underscore/underscore-esm.js'
import  '../node_modules/jquery/dist/jquery.min.js'

// Web app's Firebase configuration
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

console.log(amountOfEachItem)
const productAmountArray = _.pairs(amountOfEachItem);

productAmountArray.forEach(index => {
    getCurrentSaldo(index[0])
})

const summaryContainer = document.querySelector('#summary-container');

let total = 0;

if (cart !== null) {
    cart.forEach(product => {
        const {name, price} = product[1];
        // const itemImg = document.createElement('img');
        // itemImg.src = `.${imgUrl}`;  

        const itemName = document.createElement('p');
        itemName.innerText = `Item: ${name}`;

        const itemPrice = document.createElement('p');
        itemPrice.innerText = `Price: ${price} kr`;

        summaryContainer.append(itemName, itemPrice);

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
        
        if(newSaldo < 0) {
            alert(`Sorry, there are not ${itemId} in stock. You have ${amountInCart} in the cart, but we just have ${currentSaldo} in stock. We redirect you to the homepage in a few seconds so you can place a new order.`);

            setTimeout(() => {
            localStorage.removeItem('products');
            location.assign('../index.html');
            }, 3000);
        }
        else {
            update(ref(database, `products/${itemId}` ), {
                saldo: newSaldo
            })
            
            setTimeout(() => {
                localStorage.removeItem('products');
                location.assign('../index.html');
                }, 3000);
        }
    }
    

});

function getCurrentSaldo(id) {

    onValue(ref(database, `products/${id}`), (snapshot) => {
        currentSaldoArr.push(snapshot.val().saldo)
    })
}