import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

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
      const quantity = item.quantity;
      total += item.FinalPrice * quantity;
      document.querySelector(".cart-total").innerHTML =
        `Total: $${total.toFixed(2)}`;
    });
    attachButtonListeners();
    attachRemoveListeners();
  }
}

// Adding a funtion to populate the cart with a template
// This function will be used to create the HTML for each item in the cart
function cartItemTemplate(item) {
  const quantity = item.quantity || 1;
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
  <span data-id="${item.Id}"><img src="../images/icon-remove.png" id="remove-icon" title="Remove Item"></img></span>  
  <img
      src="${item.Images.PrimaryMedium}" 
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
  <p class="cart-card__price">$${(item.FinalPrice * quantity).toFixed(2)}</p>
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
function attachRemoveListeners() {
  const removeIcons = document.querySelectorAll("#remove-icon");
  removeIcons.forEach((icon) => {
    icon.addEventListener("click", (event) => {
      event.preventDefault();
      const itemId = event.target.parentElement.dataset.id;
      removeItemFromCart(itemId);
    });
  });
}

function removeItemFromCart(itemId) {
  let cartItems = getLocalStorage("so-cart") || [];
  cartItems = cartItems.filter((item) => item.Id !== itemId);

  localStorage.setItem("so-cart", JSON.stringify(cartItems));
  renderCartContents();
  if (cartItems.length === 0) {
    document.querySelector(".cart-footer").classList.add("hide");
    document.querySelector(".product-list").innerHTML =
      "<p>Your cart is empty.</p>";
  }
}
