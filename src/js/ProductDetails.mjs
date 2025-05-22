import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    
    async init() {
        console.log("ProductDetails.mjs init Start")
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addProductToCart.bind(this));
            console.log("ProductDetails.mjs init End")
    }

    addProductToCart() {
        console.log("ProductDetails.mjs addProductToCart Start")
        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);
        console.log("ProductDetails.mjs addProductToCart End")
    }

    renderProductDetails() {
        console.log("ProductDetails.mjs renderProductDetails Start")
        productTemplate(this.product);
        console.log("ProductDetails.mjs renderProductDetails End")
    }
}

function productTemplate(product) {
console.log("ProductDetails.mjs productTemplate Start")
  //document.querySelector("h2").textContent = product.Brand.Name;
  //document.querySelector("h3").textContent = product.NameWithoutBrand;

  const productImage = document.getElementById("productImage");
  productImage.src = product.Image;
  productImage.alt = product.NameWithoutBrand;

  document.getElementById("productPrice").textContent = product.FinalPrice;
  document.getElementById("productColor").textContent = product.Colors[0].ColorName;
  document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id = product.Id;
  console.log("ProductDetails.mjs productTemplate End")
}