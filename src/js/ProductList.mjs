import { renderListWithTemplate, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

function productCardTemplate(product) {
  let discount = 0
  let hasDiscount = false
  if (product.FinalPrice < product.SuggestedRetailPrice){
    hasDiscount = true
    discount = Math.round(product.SuggestedRetailPrice - product.FinalPrice, 1)
  }
    return `
      <li class="product-card">
        <a href="/product_pages/?product=${product.Id}">
          <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
          <h3>${product.Brand.Name}</h3>
          <p>${product.NameWithoutBrand}</p>
          <p class="product-card__price">$${product.FinalPrice}</p>
          ${hasDiscount ? `<p class="product-card__price">Discount: $${discount}</p>` : ``}
        </a>
      </li>
      `;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
      const list = await this.dataSource.getData(this.category);
      this.renderList(list);
      document.querySelector(".title").textContent = this.category;
      const searchBar = document.getElementById("search-bar")
      searchBar.addEventListener("click", this.renderSearchedList)
    }

    async renderSearchedList(){
      const category = getParam("category");
      const element = document.querySelector(".product-list");
      const searchString = document.getElementById("search-input").value
      const list = await new ExternalServices().findProductByName(searchString, category)
      renderListWithTemplate(productCardTemplate, element, list);
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
};