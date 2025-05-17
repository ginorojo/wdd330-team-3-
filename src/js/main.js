
import ProductList from "./ProductList.mjs";
import ProductList from "./ProductList.mjs"
const dataSource = new ProductData("tents")
const productList = new ProductList("Tents", dataSource, element)
const element = document.querySelector(".product-list");

productList.init();

