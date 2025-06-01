import { getLocalStorage, getTotalPrice, setLocalStorage, alertMessage, removeAllAlerts } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const service = new ExternalServices();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};
  
  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

function packageItems(items) {
  const packagedItems = items.map(item => {
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: item.quantity,
    };
  });
  return packagedItems;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    this.itemCount = 0;
  }
  
  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSubTotal();
  }
  
  calculateItemSubTotal() {
    // calculate and display the total dollar amount of the items in the cart, and the number of items.  
    const summaryElement = document.querySelector(
      this.outputSelector + " #subtotal"
    );
    const totalItems = document.querySelector(
      this.outputSelector + " #totalItems"
    );
    
    for (let i = 0; i < this.list.length; i++) {
      this.itemCount += this.list[i].quantity;
    }
    totalItems.innerText = this.itemCount;
    
    this.itemTotal = getTotalPrice();
    summaryElement.value = `$${this.itemTotal}`;
  }
  
  calculateOrderTotal() {
    // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
    this.tax = (this.itemTotal * 0.06);
    this.shipping = (10 + (this.itemCount - 1) * 2) || 10;
    this.orderTotal = parseFloat(this.itemTotal) + parseFloat(this.tax) + parseFloat(this.shipping);

    // display the totals.
    this.displayOrderTotals();
  }
  
  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    const shipping = document.querySelector(`${this.outputSelector} #shipEstimate`);
    const totalOrder = document.querySelector(`${this.outputSelector} #totalOrder`);

    tax.value = `$${this.tax.toFixed(2)}`;
    shipping.value = `$${this.shipping.toFixed(2)}`;
    totalOrder.value = `$${this.orderTotal.toFixed(2)}`;
  }

  async checkout() {
    const formElement = document.forms["checkoutForm"];
    const order = formDataToJSON(formElement);

    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal;
    order.tax = this.tax;
    order.shipping = this.shipping;
    order.items = packageItems(this.list);
    
    try {
      const response = await service.checkout(order);
      console.log(response);
      setLocalStorage("so-cart", []);
      location.assign("/checkout/success.html");
    } catch (err) {
      removeAllAlerts();
      for (let message in err.message) {
        alertMessage(err.message[message]);
      }
      console.log(err);
    }
  }
}
  
