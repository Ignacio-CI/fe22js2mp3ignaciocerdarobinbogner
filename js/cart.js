const cart = JSON.parse(localStorage.getItem('products'));
const cartContainer = document.querySelector('#cart-container');
let total = 0;

cart.forEach(({name, price}) => {

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

console.log(total); 