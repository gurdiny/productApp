/*Para extraer parámetros de la url:*/

/*1: Guardamos la url en una variable*/
const url = window.location.href;

/*2: Creamos una instancia del objeto URLSearch params*/
const params = new URLSearchParams(new URL(url).search);

/*3: Extraemos el parámetro que deseamos*/
let productKey = params.get("productKey");
console.log(productKey);

const fetchproductByKey = async (productKey) => {
  let response = await fetch(
    `https://productsjs33-default-rtdb.firebaseio.com/productos/${productKey}/.json`
  );
  let data = await response.json();
  return data;
};

const printproductData = async (productKey) => {
  let productData = await fetchproductByKey(productKey);
  console.log(productData);
  let { name, price, description, image } = productData;

  document.getElementById("product-picture").setAttribute("src", image);
  document.getElementById("product-name").innerText = name;
  document.getElementById("product-description").innerText = description;
  document.getElementById("product-price").innerText = price;
};

printproductData(productKey);
