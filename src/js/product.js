import { getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

//Creting a new instance of the ExternalServices class
const dataSource = new ExternalServices("tents");
const productId = getParam("product");
const Product = new ProductDetails(productId, dataSource);

// initialize product details
Product.init();
