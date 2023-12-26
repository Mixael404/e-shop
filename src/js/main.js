console.log("This is my first e-shop");
import {setStructureToStorage, getStructureFromStorage} from "./helpers.js";

class Shop {
  constructor() {
    this.buttons = Array.from(document.querySelectorAll(".button"));
    this.state = {};
    this.products = [
      {
        id: 1,
        name: "iPhone 14 Pro Max",
        description: "The most advanced iPhone ever",
        oldPrice: 1099,
        currentPrice: 999,
      },
      {
        id: 2,
        name: "Samsung Galaxy S23 Ultra",
        description: "The best Android phone on the market",
        oldPrice: 999,
        currentPrice: 899,
      },
      {
        id: 3,
        name: "MacBook Pro M2",
        description: "The most powerful MacBook ever",
        oldPrice: 1299,
        currentPrice: 1199,
      },
      {
        id: 4,
        name: "iPad Air 5",
        description: "The most versatile iPad ever",
        oldPrice: 599,
        currentPrice: 499,
      },
      {
        id: 5,
        name: "Apple Watch Series 8",
        description: "The most advanced Apple Watch ever",
        oldPrice: 399,
        currentPrice: 349,
      },
    ];

    this.basketBtn = document.getElementById('basket');
    this.removeItemBtns = Array.from(document.querySelectorAll('.button__minus'));

    this.addEventListeners();
    this.init();
  }

  init(){
    this.state = getStructureFromStorage('state') || {};
    console.log(this.state);
    this.updateAmountOfProducts();
    
    this.buttons.forEach((btn) => {
      const buttonAmountBlock = btn.children[1];
      const productId = btn.closest('.item').id;
      if(this.state.hasOwnProperty(productId)){
        btn.children[0].classList.add("hidden");
        buttonAmountBlock.classList.remove("hidden");
        buttonAmountBlock.children[1].textContent = this.state[productId];
      }
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
    console.log("State: ", this.state);
    this.updateAmountOfProducts();
  }

  removeItemFromBasket(e){
    const minusBtn = e.currentTarget;
    const parentBtn = minusBtn.closest('.button');
    const id = minusBtn.closest('.item').id;
    this.state[id]--;
    if(this.state[id] === 0){
      parentBtn.children[0].classList.remove('hidden');
      parentBtn.children[1].classList.add('hidden');
      delete this.state[id];
    }
    minusBtn.nextElementSibling.textContent = this.state[id];
    e.stopPropagation();
    console.log("State: ", this.state);
    this.updateAmountOfProducts();
  }

  updateAmountOfProducts(){
    const basket = this.state;
    let total = 0;
    for (let productId in basket){
      total += basket[productId];
    }
    if (total === 0){
      // TODO: Нужен ли вообще дата атрибут?
      this.basketBtn.textContent = "Корзина";
    } else{
      this.basketBtn.textContent = total;
    }
    // TODO: Оставить здесь или делать при добавлении и удалении? 
    setStructureToStorage("state", this.state);
  }

  addEventListeners(){
    this.buttons.forEach((btn) => {
      btn.addEventListener("click", this.addItemTOBasket.bind(this));
    });
    this.removeItemBtns.forEach((btn) => {
      btn.addEventListener('click', this.removeItemFromBasket.bind(this));
    })
  }

}

const shop = new Shop();


