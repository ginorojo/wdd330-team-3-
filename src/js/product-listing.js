import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

import Alert from './alerts.js';

const alert = new Alert();
alert.showAlerts();


loadHeaderFooter();

const category = getParam("category");

const dataSource = new ProductData(category);

const element = document.querySelector(".product-list");

const productlist = new ProductList(category, dataSource, element);

productlist.init();
