import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  console.log("ProductList.mjs productCardTemplate Start and End")
    return `
      <li class="product-card">
        <a href="product_pages/?product=${product.Id}">
          <img src="${product.Image}" alt="${product.Name}">
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
      console.log("ProductList.mjs init Start")
        const list = await this.dataSource.getData();
        console.log(list);
        this.renderList(list);
        console.log("ProductList.mjs init End")
    }

    renderList(list) {
      console.log("ProductList.mjs renderList Start")
        renderListWithTemplate(productCardTemplate, this.listElement, list);
        console.log("ProductList.mjs renderList End")
    }
};