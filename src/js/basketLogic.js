console.log("Basket");
import {createElement} from './helpers.js';


class Basket {
    constructor() {
        this.products = [
            // TODO: Разобраться с подстановкой пути файла при сборке.
            {
                id: 1,
                name: "Slimming Gel Body",
                description: "Гель для тела для похудения",
                imgUrl: "../assets/1.png",
                oldPrice: 1099,
                currentPrice: 999,
                volume: 50,
            },
            {
                id: 2,
                name: "Slimming Gel Body",
                description: "Гель для тела для похудения",
                imgUrl: "../assets/2.png",
                oldPrice: 999,
                currentPrice: 899,
                volume: 50,
            },
            {
                id: 3,
                name: "Slimming Gel Body",
                description: "Гель для тела для похудения",
                imgUrl: "../assets/3.png",
                oldPrice: 1299,
                currentPrice: 1199,
                volume: 50,
            },
            {
                id: 4,
                name: "Slimming Gel Body",
                description: "Гель для тела для похудения",
                imgUrl: "../assets/4.png",
                oldPrice: 599,
                currentPrice: 499,
                volume: 50,
            },
            {
                id: 5,
                name: "Slimming Gel Body",
                description: "Гель для тела для похудения",
                imgUrl: "../assets/5.png",
                oldPrice: 399,
                currentPrice: 349,
                volume: 50,
            },
        ];
        this.productsWrapper = document.querySelector('.order__items');
        this.products.forEach((product) => {
            this.createProductCard(product);
        })
    }

    createProductCard(product){
        // TODO: Отрефакторить функцию
        const productBody = createElement("div", "item", "", this.productsWrapper);
        const productLeftPart = createElement('div', 'item__leftPart', '', productBody);
        const productImg = createElement('div', 'item__image', '', productLeftPart);
        
        const img = createElement('img', '', '', productImg);
        img.src = product.imgUrl;
        
        const textInfo = createElement('div', 'item__textInfo', '', productLeftPart);
        const description = createElement('div', 'item__description', product.description, textInfo);
        const name = createElement('div', 'item__name', product.name, textInfo);
        const volume = createElement('div', 'item__volume', product.volume, textInfo);
        
        const totalCost = createElement('div', 'item__totalCost', '', productBody);
        const amount = createElement('div', 'item__amount', "", totalCost);
        const minus = createElement('div', 'item__minus', "-", amount);
        const value = createElement('div', 'item__value', "1", amount);
        const plus = createElement('div', 'item__plus', "+", amount);
        const deleteBtn = createElement('div', 'item__deleteBtn', "×", amount);

        const price = createElement('div', 'item__price', "", totalCost);
        const oldPrice = createElement('div', 'item__oldPrice', product.oldPrice + " руб", price);
        const newPrice = createElement('div', 'item__currentPrice', product.currentPrice + " руб", price);
    }


}

const basket = new Basket();