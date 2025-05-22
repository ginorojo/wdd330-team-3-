import { loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

console.log("main.js is about to call loadHeaderFooter()")
loadHeaderFooter();

const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const productlist = new ProductList("Tents", dataSource, element);

console.log("main.js is about to call productlist.init()")
productlist.init();
console.log("main.js End")
