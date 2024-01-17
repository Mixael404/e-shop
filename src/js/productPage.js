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
const buttonWrapper = document.querySelector('.buttonWrapper');
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

// TODO: Переделать логику функции,использовать класс + сделать логику чище.
function createButton() {
    const button = document.querySelector('.button');
    button.addEventListener('click', addToBasket);
    const buttonAmount = createElement('div', 'button__amount', '', button);
    const buttonMinus = createElement('div', 'button__minus', '-', buttonAmount);
    const buttonValue = createElement('div', 'button__value', '', buttonAmount);
    const buttonPlus = createElement('div', 'button__plus', '+', buttonAmount);

    buttonMinus.addEventListener('click', changeBasket);
    buttonPlus.addEventListener('click', changeBasket);

    if (currentAmount === 0) {
        buttonAmount.classList.add('hidden');
        button.textContent = 'Add to basket';
    } else {
        buttonValue.textContent = currentAmount;
    }
}

function changeBasket(e) {
    if (e.target.classList.contains("button__minus")) {
        currentAmount--;
    } else {
        currentAmount++;
    }
    const btnControls = e.target.closest('.button__amount');
    const value = btnControls.querySelector('.button__value');
    value.textContent = currentAmount;
    state[id] = currentAmount;
    console.log(btnControls);
    if (currentAmount == 0) {
        e.target.closest('.button').remove();
        delete state[id];
        createElement('button', 'button', '', buttonWrapper);
        createButton();
    }
    setStructureToStorage('state', state);
}


function addToBasket(e) {
    if (e.currentTarget.textContent !== "Add to basket") return;
    e.currentTarget.textContent = "";
    currentAmount = 1;
    createButton();
}

createProductInfo();
console.log(product);