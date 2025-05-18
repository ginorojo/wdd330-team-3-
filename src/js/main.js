import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

//Create a new instance of the ProductData class
const dataSource = new ProductData("tents");

// Get the element where the product list will be rendered
const element = document.querySelector(".product-list");

// Create a new instance of the ProductList class
const productList = new ProductList("Tents", dataSource, element);
// Initialize the product list
productList.init();