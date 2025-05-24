import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  // Ensuring the cart always returns an array to prevent errors when empty,The missing part was || []
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  let total = 0;

  if (cartItems.length > 0) {
    document.querySelector(".cart-footer").classList.remove("hide");

    cartItems.forEach((item) => {
      const quantity = item.quantity || 1;
      total += item.FinalPrice * quantity;
      document.querySelector(".cart-total").innerHTML = `Total: $${total}`;
    });
    attachButtonListeners();
  }
}

// Adding a funtion to populate the cart with a template
// This function will be used to create the HTML for each item in the cart
function cartItemTemplate(item) {
  const quantity = item.quantity || 1;
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}" 
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <div class="quantity-controls" data-id="${item.Id}">
    <button class="decrease-qty">–</button>
    <span class="quantity-value">${quantity}</span>
    <button class="increase-qty">+</button>
  </div>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
  return newItem;
}

renderCartContents();

function attachButtonListeners() {
  document.querySelectorAll(".quantity-controls").forEach((control) => {
    const id = control.dataset.id;
    const increaseBtn = control.querySelector(".increase-qty");
    const decreaseBtn = control.querySelector(".decrease-qty");

    increaseBtn.addEventListener("click", () => {
      updateQuantity(id, 1);
    });

    decreaseBtn.addEventListener("click", () => {
      updateQuantity(id, -1);
    });
  });
}

function updateQuantity(id, change) {
  let cartItems = getLocalStorage("so-cart") || [];
  cartItems = cartItems.map((item) => {
    if (item.Id === id) {
      let newQty = (item.quantity || 1) + change;
      if (newQty < 1) newQty = 1;
      return { ...item, quantity: newQty };
    }
    return item;
  });

  localStorage.setItem("so-cart", JSON.stringify(cartItems));
  renderCartContents();
}
