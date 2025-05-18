import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const product_data = new ProductData("tents");
const element = document.querySelector(".product-list");

const product_list = new ProductList("tents", product_data, element);
product_list.init();