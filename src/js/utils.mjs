// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  console.log("utils.mjs [qs] Start and End")
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  console.log("utils.mjs [getLocalStorage] Start and End")
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  console.log("utils.mjs [setLocalStorage] Start")
  localStorage.setItem(key, JSON.stringify(data));
  console.log("utils.mjs [setLocalStorage] End")
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  console.log("utils.mjs [setClick] Start")
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
  console.log("utils.mjs [setClick] End")
}

// Getting the ID product of the URl string
export function getParam(param) {
  console.log("utils.mjs [getParam] Start")
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  console.log("utils.mjs [getParam] End")
  return product
}

export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  console.log("utils.mjs [renderListWithTemplate] Start")
  const htmlStrings = list.map(template);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
  console.log("utils.mjs [renderListWithTemplate] End")
}

export function renderWithTemplate(template, parentElement, data, callback) {
  console.log("utils.mjs [renderWithTemplate] Start")
  parentElement.innerHTML = template;
  if (callback) {
    console.log("utils.mjs [renderWithTemplate] using callback")
    callback(data);
  }
  console.log("utils.mjs [renderWithTemplate] Start")
}

async function loadTemplate(path) {
  console.log("utils.mjs [loadTemplate] Start")
  const response = await fetch(path);
  const template = await response.text();
  console.log("utils.mjs [loadTemplate] End")
  return template;
}

export async function loadHeaderFooter() {
  console.log("utils.mjs [loadHeaderFooter] Start")
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const headerTemplate = await loadTemplate("../partials/header.html");

  const footerElement = document.querySelector("#main-footer");
  const headerElement = document.querySelector("#main-header");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
  console.log("utils.mjs [loadHeaderFooter] End")
}
