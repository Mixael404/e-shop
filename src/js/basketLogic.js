console.log("Basket");
import { createElement, setStructureToStorage, getStructureFromStorage } from './helpers.js';
import { products } from './products.js';
import { key } from '../env.js';
// import swal from "sweetalert";

class Basket {
    constructor() {
        this.products = products;
        this.basket = getStructureFromStorage("state");
        this.productsWrapper = document.querySelector('.order__items');
        this.modal = document.querySelector('.modal');
        const modalBtn = this.modal.querySelector('.modal__btn');
        modalBtn.addEventListener('click', () => {
            this.modal.classList.add('hidden');
        })
        this.init();
    }

    init() {
        this.drawTotalAmountOfProducts();
        this.setTotalCost();
        const order = this.constructProductsArrFromBasket();
        order.forEach((product) => {
            this.createProductCard(product);
        })
        this.addListenerToForm();
    }

    drawTotalAmountOfProducts() {
        // TODO: Сделать более специфичный селектор для безопасности
        const wrapper = document.querySelector('.order__amount');
        let total = 0;
        for (let key in this.basket) {
            const amount = this.basket[key];
            total += amount;
        }
        wrapper.textContent = total;
    }

    createProductCard(product) {
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

    constructProductsArrFromBasket() {
        const order = [];
        for (let key in this.basket) {
            const product = this.products.find((product) => {
                if (product.id == key) {
                    return true;
                }
            })
            product.amount = this.basket[key];
            order.push(product);
        }
        return order;
    }

    getItemId(e) {
        const item = e.target.closest('.item');
        const itemId = item.querySelector('.id').textContent;
        return itemId;
    }

    addToBasket(e) {
        this.productsWrapper.innerHTML = '';
        const itemId = this.getItemId(e);
        this.basket[itemId]++;
        setStructureToStorage("state", this.basket);
        this.init();
    }

    diffFromBasket(e) {
        this.productsWrapper.innerHTML = '';
        const itemId = this.getItemId(e);
        this.basket[itemId]--;
        if (this.basket[itemId] == 0) {
            delete this.basket[itemId];
        }
        setStructureToStorage("state", this.basket);
        this.init();
    }

    removeFromBasket(e) {
        this.productsWrapper.innerHTML = '';
        const itemId = this.getItemId(e);
        delete this.basket[itemId];
        setStructureToStorage("state", this.basket);
        this.init();
    }

    setTotalCost() {
        const costWrapper = document.querySelector('.order__total');
        const basket = this.constructProductsArrFromBasket();
        let total = 0;
        for (let product of basket) {
            total += product.currentPrice * product.amount;
        }
        costWrapper.textContent = "Итого: " + total + " руб";
    }

    constractEmailBody(order){
        let resString = '';
        order.forEach((product) => {
            resString += "id: " + product.id + "; ";
            resString += "Название: " + product.name + "; ";
            resString += "Количество: " + product.amount + " шт" + '<br>';
        })
        return resString;
    }

    checkPhoneNumber(phone){
        const phoneCorrect = phone.match(/^(\+?[0-9]{1,3})?[0-9]{10}$/);
        if (!phoneCorrect) {
            this.modal.classList.remove('hidden');
            this.fillModalWindow('phoneError');
        }
        return phoneCorrect;
    }

    addListenerToForm() {
        const form = document.querySelector('.form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const phoneInput = form.querySelector('.form__phone');
            const phone = phoneInput.value;
            const order = this.constructProductsArrFromBasket();
            
            const emailBody = this.constractEmailBody(order);

            const phoneCorrect = this.checkPhoneNumber(phone);
            if (!phoneCorrect) {
                phoneInput.value = '';
                return;
            }

            fetch('https://api.brevo.com/v3/smtp/email', {
                method: "POST",
                headers: {
                    "accept": "application/json",
                    "api-key": key,
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    "sender": {
                        "name": "Shop's client",
                        "email": "senderalex@example.com"
                    },
                    "to": [
                        {
                            "email": "slutskij.m.a@gmail.com",
                            "name": "Mikhail"
                        }
                    ],
                    "subject": "Новый заказ!",
                    "htmlContent": `<html><head></head><body><p>Новый заказ:</p>
                    <p>Скорее перезвоните заказчику!</p>
                    <p>Телефон: ${phone}</p>
                    <p><strong>Детали заказа:</strong></p>
                    <p>${emailBody}</p>
                    </body></html>`
                })
            })
                .then(() => {
                    // alert('Успешно!');
                    this.modal.classList.remove('hidden');
                    this.fillModalWindow('success');
                })
                .catch(() => {
                    // alert('Error!');
                    this.fillModalWindow('error');
                })

            phoneInput.value = "";
        })
    }

    fillModalWindow(type){
        const title = this.modal.querySelector('.modal__title');
        const description = this.modal.querySelector('.modal__description');
        if(type === 'success'){
            title.textContent = 'Success';
            description.textContent = 'Successful requiest! We will call you in nearest 15 minutes'
        } else if(type === "error"){
            title.textContent = 'Error';
            description.textContent = 'Something wrong. Please try later';
        } else if(type === "phoneError"){
            title.textContent = 'Error';
            description.textContent = 'Please fill correct phone number.';
        }
    }
}

const basket = new Basket();
