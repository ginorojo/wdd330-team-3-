import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(category, product) {
    return `
      <li class="product-card">
        <a href="/product_pages/?category=${category}&product=${product.Id}">
          <img src="${product.Images.PrimaryLarge}" alt="${product.Name}">
          <h2>${product.Brand.Name}</h2>
          <h3>${product.Name}</h3>
          <p class="product-card__price">$${product.FinalPrice}</p>
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
        this.renderTitle()
        this.renderList(list);
    }

    renderTitle() {
      const titleTopProducts = document.getElementById("top-products-title")
        titleTopProducts.innerHTML = `Top Products: ${this.category}`
    }

    renderList(list) {
        renderListWithTemplate(this.category, productCardTemplate, this.listElement, list);
    }
};