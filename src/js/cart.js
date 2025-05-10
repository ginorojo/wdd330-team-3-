import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  // const cartItems = getLocalStorage("so-cart");
  // const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  // document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // Es posible que no sea un array, intentando forzar la conversion 
  // crear una nueva constante en la cual se guarde la data para despues la cartItems pueda ser chequeada
  const storedData = getLocalStorage("so-cart");
  
  // 2. Forzar conversión a array SIEMPRE
  const cartItems = Array.isArray(storedData) ? storedData : [storedData].filter(Boolean);
  
  // 3. Renderizado
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}


function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();

