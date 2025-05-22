import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

//Creting a new instance of the ProductData class
const dataSource = new ProductData("tents");
const productId = getParam("product");
const Product = new ProductDetails(productId, dataSource);
// initialize product details
Product.init();
loadHeaderFooter();