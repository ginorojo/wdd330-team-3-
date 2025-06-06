const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const respond = await res.json();
  if (res.ok) {
    return respond;
  } else {
    throw { name: "servicesError", message: respond };
  };
}


export default class ExternalServices {
  constructor() {
    
  }
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    
    return data.Result;

  }

  async findProductByName(searchString, category){
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    const result = await data.Result.filter(e => e.NameWithoutBrand.toLowerCase().includes(searchString));
    return result
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(`${baseURL}checkout/`, options).then(convertToJson);
  }
}