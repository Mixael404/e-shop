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
    const wrapper = document.querySelector('.buttonWrapper');


    const button = createElement('button', 'button', '', wrapper);
    button.addEventListener('click', addItemTOBasket);
    const buttonText = createElement('div', 'textBtn', 'Add to basket', button);
    const buttonAmount = createElement('div', 'button__amount', '', button);
    const buttonMinus = createElement('div', 'button__minus', '-', buttonAmount);
    buttonMinus.addEventListener('click', diffFromBasket);
    const buttonValue = createElement('div', 'button__value', '', buttonAmount);
    const buttonPlus = createElement('div', 'button__plus', '+', buttonAmount);

    // buttonMinus.addEventListener('click', changeBasket);
    // buttonPlus.addEventListener('click', changeBasket);

    if (currentAmount === 0) {
        buttonAmount.classList.add('hidden');
    } else {
        buttonText.classList.add('hidden');
        buttonValue.textContent = currentAmount;
    }
}

// function changeBasket(e) {
//     if (e.target.classList.contains("button__minus")) {
//         currentAmount--;
//     } else {
//         currentAmount++;
//     }
//     const btnControls = e.target.closest('.button__amount');
//     const value = btnControls.querySelector('.button__value');
//     value.textContent = currentAmount;
//     state[id] = currentAmount;
//     console.log(btnControls);
//     if (currentAmount == 0) {
//         // Почему не находит btnControls?
//         console.log(btnControls);
//         e.target.closest('.button').remove();
//         delete state[id];
//         createElement('button', 'button', '', buttonWrapper);
//         createButton();
//     }
//     setStructureToStorage('state', state);
// }

    function addItemTOBasket(e){
        const button = e.currentTarget;
        if(currentAmount == 0){
            button.children[0].classList.add('hidden');
            button.children[1].classList.remove('hidden');
        }
        currentAmount++;
        const valueWrp = button.children[1].children[1];
        valueWrp.textContent = currentAmount;
        state[id] = currentAmount;
        setStructureToStorage('state', state);
    }

    function diffFromBasket(e){
        const button = e.currentTarget;
        const mainBtn = button.closest('.button');
        console.log(mainBtn);
        const valueWrp = mainBtn.children[1].children[1];
        currentAmount--;
        valueWrp.textContent = currentAmount;
        state[id] = currentAmount;


        if(currentAmount == 0){
            mainBtn.children[0].classList.remove('hidden');
            mainBtn.children[1].classList.add('hidden');
            // mainBtn.textContent = "Add to basket";
            delete state[id];
        }

        setStructureToStorage('state', state);
        e.stopPropagation();
    }

createProductInfo();
console.log(product);