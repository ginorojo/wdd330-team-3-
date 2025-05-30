import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");

const dataSource = new ExternalServices(category);

const element = document.querySelector(".product-list");

const productlist = new ProductList(category, dataSource, element);

productlist.init();
