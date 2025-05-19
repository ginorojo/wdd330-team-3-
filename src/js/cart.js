import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  // Ensuring the cart always returns an array to prevent errors when empty,The missing part was || []
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  let total = 0;

  if (cartItems.length > 0) {
    document.querySelector(".cart-footer").classList.remove("hide");

    cartItems.forEach((item) => {
      total += item.FinalPrice;
      document.querySelector(".cart-total").innerHTML = `Total: $${total}`;
    });
  }
}

// Adding a funtion to populate the cart with a template
// This function will be used to create the HTML for each item in the cart
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

// const CartTotal = document.querySelector(".cart-footer");

renderCartContents();
