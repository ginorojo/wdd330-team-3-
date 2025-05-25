import { renderListWithTemplate } from "./utils.mjs";

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
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
};