// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// Getting the ID product of the URl string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product
}

export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.innerHTML = htmlStrings.join("")
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  const response = await fetch(path);
  const template = await response.text();
  return template;
}

export async function loadHeaderFooter() {
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const headerTemplate = await loadTemplate("../partials/header.html");

  const footerElement = document.querySelector("#main-footer");
  const headerElement = document.querySelector("#main-header");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
  updateCartCount();
}


export function getTotalPrice() {
  const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
  let total = 0;
  
  if (cartItems.length > 0) {
      cartItems.forEach((item) => {
      const quantity = item.quantity || 1;
      total += item.FinalPrice * quantity;
      });
  }
  
  return total.toFixed(2);
}

export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });
  const main = document.querySelector("main");
  main.prepend(alert);

  if (scroll) window.scrollTo(0, 0);
  setTimeout(function () {
    main.removeChild(alert);
  }, duration);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}

export function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
  let count = 0;
  cartItems.forEach(item => {
    count += item.quantity || 1;
  });

  const cartDiv = document.querySelector(".cart");
  if (!cartDiv) return;

  const existingSup = cartDiv.querySelector("sup.cart-count");
  if (existingSup) existingSup.remove();

  if (count > 0) {
    const sup = document.createElement("sup");
    sup.className = "cart-count";
    sup.textContent = count;
    sup.style.position = "absolute";
    sup.style.top = "1";
    sup.style.right = "0";
    sup.style.background = "#f0a868";
    sup.style.color = "white";
    sup.style.borderRadius = "50%";
    sup.style.padding = "2px 6px";
    sup.style.fontSize = "0.8em";
    sup.style.transform = "translate(50%,-50%)";
    sup.style.zIndex = "10";
    cartDiv.style.position = "relative";
    cartDiv.appendChild(sup);
  }
}

window.addEventListener("DOMContentLoaded", updateCartCount);
window.addEventListener("pageshow", updateCartCount);

export function showAddedProductMsg() {
  const addBtn = document.getElementById("addToCart");
 
  addBtn.addEventListener("click", () => {
    // Remove previous message
    const existingMsg = document.querySelector(".added-popup");
    if (existingMsg) existingMsg.remove();

    const message = document.createElement("div");
    message.innerText = "Product Added!";
    message.className = "added-popup";
    message.style.position = "fixed";
    message.style.left = "20px";
    message.style.top = "120px";
    message.style.background = "#4caf50";
    message.style.color = "white";
    message.style.padding = "12px 24px";
    message.style.borderRadius = "8px";
    message.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
    message.style.zIndex = "1000";
    message.style.fontSize = "1rem";
    message.style.opacity = "0.95";
    document.body.appendChild(message);

    setTimeout(() => {
      message.remove();
    }, 2000);
  });
}