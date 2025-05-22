function convertToJson(res) {
  console.log("ProductData.mjs convertToJson Start")
  if (res.ok) {
    console.log("ProductData.mjs convertToJson End")
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
  
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }
  getData() {
    console.log("ProductData.mjs getData Start and End")
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }
  async findProductById(id) {
    console.log("ProductData.mjs getData Start")
    const products = await this.getData();
    console.log("ProductData.mjs getData End")
    return products.find((item) => item.Id === id);
  }
}
