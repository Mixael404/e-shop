console.log("This is my first e-shop");
import { setStructureToStorage, getStructureFromStorage, createElement } from "./helpers.js";
import {products} from './products.js';
console.log(products);

class Shop {
  constructor() {
    // this.buttons = Array.from(document.querySelectorAll(".button"));
    this.state = {};
    this.products = products;

    this.basketBtn = document.getElementById('basket');
    // this.removeItemBtns = Array.from(document.querySelectorAll('.button__minus'));
    this.itemsWrapper = document.querySelector('.items__body');
    this.sorter = document.querySelector('.sorter');
    console.log(this.sorter);
    this.addEventListeners();
    this.init();
    // this.products.forEach((product) => {
    //   this.createProductCards(product);
    // })
  }

  init() {
    this.state = getStructureFromStorage('state') || {};
    console.log(this.state);
    const sortMode = localStorage.getItem('sortMode') || "popular";
    this.sorter.value = sortMode;
    this.sortProducts(sortMode);
    this.updateAmountOfProducts();
    
    // this.buttons.forEach((btn) => {
    //   const buttonAmountBlock = btn.children[1];
    //   const productId = btn.closest('.item').id;
    //   if (this.state.hasOwnProperty(productId)) {
    //     btn.children[0].classList.add("hidden");
    //     buttonAmountBlock.classList.remove("hidden");
    //     buttonAmountBlock.children[1].textContent = this.state[productId];
    //   }
    // })
  }


  sortProducts(mode){
    switch(mode){
      case 'popular':
        this.products.sort((a,b) => a.id - b.id);
        break;
      case 'cheap':
        this.products.sort((a,b) => a.currentPrice - b.currentPrice);
        break;
      case 'expensive':
        this.products.sort((a,b) => b.currentPrice - a.currentPrice);
        break;
      default:
        this.products.sort((a,b) => a.id - b.id);
        break;
    }

  
    this.itemsWrapper.innerHTML = '';
    this.products.forEach((product) => {
      this.createProductCards(product);
    })
    
  }

  addItemTOBasket(e) {
    const id = e.currentTarget.closest('.item').id;
    const button = e.currentTarget;
    button.children[0].classList.add("hidden");
    const buttonAmount = button.children[1];
    buttonAmount.classList.remove("hidden");
    if (this.state.hasOwnProperty(id)) {
      this.state[id]++;
    } else {
      this.state[id] = 1;
    }
    buttonAmount.children[1].textContent = this.state[id];
    this.updateAmountOfProducts();
  }

  removeItemFromBasket(e) {
    const minusBtn = e.currentTarget;
    const parentBtn = minusBtn.closest('.button');
    const id = minusBtn.closest('.item').id;
    this.state[id]--;
    if (this.state[id] === 0) {
      parentBtn.children[0].classList.remove('hidden');
      parentBtn.children[1].classList.add('hidden');
      delete this.state[id];
    } else{
      minusBtn.nextElementSibling.textContent = this.state[id];
    }
    e.stopPropagation();
    this.updateAmountOfProducts();
  }

  updateAmountOfProducts() {
    const basket = this.state;
    let total = 0;
    for (let productId in basket) {
      total += basket[productId];
    }
    if (total === 0) {
      this.basketBtn.textContent = "Корзина";
    } else {
      this.basketBtn.textContent = total;
    }
    // TODO: Оставить здесь или делать при добавлении и удалении? 
    setStructureToStorage("state", this.state);
  }

  addEventListeners() {
    this.sorter.addEventListener('change', this.changeSortMode.bind(this));
  }

  changeSortMode(e){
    console.log('select');
    const mode = this.sorter.value;
    localStorage.setItem('sortMode', mode);
    this.sortProducts(mode);
  }

  createProductCards(product) {
    // TODO: Отрефакторить функцию
    const item = createElement('div', 'item', '', this.itemsWrapper, product.id);

    const itemImg = createElement('div', 'item__image', '', item);
    const img = createElement('img', '', '', itemImg);
    img.src = product.imgUrl;

    const name = createElement('div', 'item__name', product.name, item);

    const info = createElement('div', 'item__info', '', item);
    const description = createElement('div', 'item__description', product.description, info);
    const price = createElement('div', 'item__price', '', info);
    const currentPrice = createElement('div', 'item__current-price', product.currentPrice + ' руб', price);
    const oldPrice = createElement('div', 'item__old-price', product.oldPrice + ' руб', price);

    const btn = createElement('button', 'button', '', item);
    const btnText = createElement('div', 'button__text', 'В корзину', btn);
    const btnAmount = createElement('div', 'button__amount', '', btn);

    
    const btnMinus = createElement('div', 'button__minus', '-', btnAmount);
    btnMinus.addEventListener('click', this.removeItemFromBasket.bind(this));

    let value;
    if (this.state.hasOwnProperty(product.id)){
      btnText.classList.add('hidden');
      value = this.state[product.id];
    } else{
      btnAmount.classList.add('hidden');
      value = 0;
    }
    const btnValue = createElement('div', 'button__value', value, btnAmount);

    const btnPlus = createElement('div', 'button__plus', '+', btnAmount);
    btn.addEventListener('click', this.addItemTOBasket.bind(this));
  }

  
}

const shop = new Shop();


