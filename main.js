// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js"

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



console.log('det här är en test');
















//-------------------------------------------------------------

//-------------------------------------------------------------











console.log('lalalla dfhkajhfefhasdkfh')
