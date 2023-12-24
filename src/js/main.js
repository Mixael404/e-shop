console.log("This is my first e-shop");


class Shop {
  constructor() {
    this.buttons = Array.from(document.querySelectorAll(".item__button"));
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
    if (this.basketBtn.dataset.isempty == "true") {
      this.basketBtn.textContent = "Корзина";
    }
    this.addEventListeners();
  }

  addItemTOBasket(e) {
    const id = e.target.closest('.item').id;
    console.log("Клик на кнопку", id);

    if (this.state.hasOwnProperty(id)) {
      this.state[id]++;
    } else {
      this.state[id] = 1;
    }
    console.log(this.state);
  }

  addEventListeners(){
    this.buttons.forEach((btn) => {
      console.log(btn);
      btn.addEventListener("click", this.addItemTOBasket.bind(this));
    })
  }

}
// console.log(buttons);

const shop = new Shop();





// basketBtn.addEventListener("click", (e) => {
//   console.log("Click main basket btn");
// })


