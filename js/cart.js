const cart = JSON.parse(localStorage.getItem('products'));
const cartContainer = document.querySelector('#cart-container');
console.log(cart)

cart.forEach(({name, price}) => {
    // console.log(imgUrl, name, price)

    // const itemImg = document.createElement('img');
    // itemImg.src = `.${imgUrl}`;

    const itemName = document.createElement('h2');
    itemName.innerText = `.${name}`;

    const itemPrice = document.createElement('h3');
    itemPrice.innerText = `.${price}`;
    
    cartContainer.append( itemName, itemPrice)

});
