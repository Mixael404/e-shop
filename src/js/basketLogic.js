console.log("Basket");
import {createElement,setStructureToStorage, getStructureFromStorage} from './helpers.js';
const url = '../assets/items/1.png';
import yrl from '../assets/items/1.png';
console.log("URL: ", yrl);

class Basket {
    constructor() {
        this.products = [
            // TODO: Разобраться с подстановкой пути файла при сборке.
            // Сделал названия папок в src и dist разными. Теперь можно скопировать папку assets в dist и оставлять путь таким же.

            // TODO: ВРЕМЕННО!!! Для devServer путь с .. , для сборки - с одной точкой (для совпадения пути)
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
        this.basket = getStructureFromStorage("state");
        this.productsWrapper = document.querySelector('.order__items');
        this.init();


        this.sendOrder();
    }

    init(){
        this.drawTotalAmountOfProducts();
        this.setTotalCost();
        const order = this.constructProductsArrFromBasket();
        order.forEach((product) => {
            this.createProductCard(product);
        })
    }

    drawTotalAmountOfProducts(){
        // TODO: Сделать более специфичный селектор для безопасности
        const wrapper = document.querySelector('.order__amount');
        let total = 0;
        for(let key in this.basket){
            const amount = this.basket[key];
            total += amount;
        }
        wrapper.textContent = total;
    }

    createProductCard(product){
        // TODO: Отрефакторить функцию
        const productBody = createElement("div", "item", "", this.productsWrapper);
        const productLeftPart = createElement('div', 'item__leftPart', '', productBody);
        const productImg = createElement('div', 'item__image', '', productLeftPart);
        const id = createElement('p', 'id', product.id, productBody)
        const img = createElement('img', '', '', productImg);
        img.src = product.imgUrl;
        
        const textInfo = createElement('div', 'item__textInfo', '', productLeftPart);
        const description = createElement('div', 'item__description', product.description, textInfo);
        const name = createElement('div', 'item__name', product.name, textInfo);
        const volume = createElement('div', 'item__volume', product.volume + "мл", textInfo);
        
        const totalCost = createElement('div', 'item__totalCost', '', productBody);
        const amount = createElement('div', 'item__amount', "", totalCost);
        const minus = createElement('div', 'item__minus', "-", amount);
        const value = createElement('div', 'item__value', product.amount, amount);
        const plus = createElement('div', 'item__plus', "+", amount);
        plus.addEventListener('click', this.addToBasket.bind(this));
        minus.addEventListener('click', this.diffFromBasket.bind(this));
        const deleteBtn = createElement('div', 'item__deleteBtn', "×", amount);
        deleteBtn.addEventListener('click', this.removeFromBasket.bind(this));

        const price = createElement('div', 'item__price', "", totalCost);
        const oldPrice = createElement('div', 'item__oldPrice', (product.oldPrice * product.amount) + " руб", price);
        const newPrice = createElement('div', 'item__currentPrice', (product.currentPrice * product.amount) + " руб", price);
    }

    constructProductsArrFromBasket(){
        const order = [];
        for(let key in this.basket){
            const product = this.products.find((product) => {
                if (product.id == key){
                    return true;
                }
            })
            product.amount = this.basket[key];
            order.push(product);
        }
        return order;
    }

    getItemId(e){
        const item = e.target.closest('.item');
        const itemId = item.querySelector('.id').textContent;
        return itemId;
    }

    addToBasket(e){
        this.productsWrapper.innerHTML = '';
        const itemId = this.getItemId(e);
        this.basket[itemId]++;
        setStructureToStorage("state", this.basket);
        this.init();
    }

    diffFromBasket(e){
        this.productsWrapper.innerHTML = '';
        const itemId = this.getItemId(e);
        this.basket[itemId]--;
        if(this.basket[itemId] == 0){
            delete this.basket[itemId];
        }
        setStructureToStorage("state", this.basket);
        this.init();
    }

    removeFromBasket(e){
        this.productsWrapper.innerHTML = '';
        const itemId = this.getItemId(e);
        delete this.basket[itemId];
        setStructureToStorage("state", this.basket);
        this.init();
    }

    setTotalCost(){
        const costWrapper = document.querySelector('.order__total');
        const basket = this.constructProductsArrFromBasket();
        console.log(basket);
        let total = 0;
        for (let product of basket){
            total += product.currentPrice * product.amount;
        }
        costWrapper.textContent = "Итого: " + total + " руб";
    }

    sendOrder(){
        const form = document.querySelector('.form');
        console.log(form);
        form.addEventListener('submit', (e) => {
            e.preventDefault();
        })
    }

}

const basket = new Basket();