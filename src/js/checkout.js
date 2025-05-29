import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";



loadHeaderFooter();
const order = new CheckoutProcess("so-cart", ".order-summary");
order.init();

// Add an event listener to the form when user change de zip code
document.getElementById("zip").addEventListener("change", order.calculateOrderTotal.bind(order));

// Add an event listener to the form submit button
document.getElementById("checkout-btn").addEventListener("click", (event) => {
    event.preventDefault();
    order.checkout();
});
