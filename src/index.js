import './js/main';
import "./css/style.scss";

// import logo from "./assets/logotip.png";
// import advantagiesimage from "./assets/advantagies.png";
// import arrowSvg from "./assets/arrow_right.svg";

// logoWrapper.src = logo;
// const logoWrapper = document.querySelector(".header__logo_image");

// const advantagiesImageWrapper = document.querySelector(".description__image>img");
// advantagiesImageWrapper.src = advantagiesimage;

// const arrow = document.querySelector(".arrow");
// arrow.src = arrowSvg;

const basketBtn = document.getElementById('basket');
if(basketBtn.dataset.isempty == "true"){
    basketBtn.textContent = "Корзина";
}

console.log("This is my first e-shop");
