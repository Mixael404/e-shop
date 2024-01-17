const searchParams = new URLSearchParams(window.location.search);
import { products } from './products.js';
import { setStructureToStorage, getStructureFromStorage, createElement } from "./helpers.js";


const id = searchParams.get('id');
console.log(id);

const product = products.find((prod) => {
    if (id == prod.id) {
        return true;
    }
})

const state = getStructureFromStorage('state');
let currentAmount = state[id] ?? 0;
console.log("Amount: " + currentAmount);


function createProductInfo() {
    const nameWrapper = document.querySelector('.itemName');
    nameWrapper.textContent = product.name;
    const img = document.querySelector('.imgWrapper>img');
    img.src = product.imgUrl;
    const description = document.querySelector(".description");
    description.textContent = product.description;
    const price = document.querySelector('.price');
    price.textContent = product.currentPrice + ' RUB';

    createButton();
}

// TODO: Доделать функционал кнопки
function createButton() {
    const button = document.querySelector('.button');
    if (currentAmount === 0) {
        button.textContent = 'Add to basket';
        button.addEventListener('click', changeBasket);
    } else {
        const buttonAmount = createElement('div', 'button__amount', '', button);
        const buttonMinus = createElement('div', 'button__minus', '-', buttonAmount);
        const buttonValue = createElement('div', 'button__amount', '', buttonAmount);
        const buttonPlus = createElement('div', 'button__plus', '+', buttonAmount);

        buttonValue.textContent = currentAmount;
        // console.log("This :", this);
        buttonMinus.addEventListener('click', changeBasket);
        buttonPlus.addEventListener('click', changeBasket);
    }
}

function changeBasket(e){
    if(e.target.classList.contains("button__minus")){
        currentAmount--;
    } else{
        currentAmount++;
    }
    state[id] = currentAmount;
    setStructureToStorage('state', state);
    e.target.closest('.button__amount').remove();
    // removeEventListener('')
    createButton();
}


createProductInfo();
console.log(product);