const createproductCard = (productObject) => {
  let { name, image, description, price } = productObject;

  // Crear elementos del DOM
  const colDiv = document.createElement("div");
  colDiv.classList.add("col");

  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card", "product-card", "p-0", "overflow-hidden");

  const rowDiv = document.createElement("div");
  rowDiv.classList.add("row", "g-0");

  const imageColDiv = document.createElement("div");
  imageColDiv.classList.add("col-md-4");

  const img = document.createElement("img");
  img.classList.add("product-card__picture");
  img.src = image;
  img.alt = "...";

  const contentColDiv = document.createElement("div");
  contentColDiv.classList.add("col-md-8");

  const cardBodyDiv = document.createElement("div");
  cardBodyDiv.classList.add("card-body");

  const title = document.createElement("h5");
  title.classList.add("card-title");
  title.textContent = name;

  const ul = document.createElement("ul");
  ul.classList.add("list-group");

  const priceLi = document.createElement("li");
  priceLi.classList.add("list-group-item");
  priceLi.textContent = `Precio: $ ${price}`;

  const descriptionLi = document.createElement("li");
  descriptionLi.classList.add("list-group-item");
  descriptionLi.textContent = `Descripción: ${description}`;

  // Construir la estructura del DOM
  colDiv.appendChild(cardDiv);
  cardDiv.appendChild(rowDiv);
  rowDiv.appendChild(imageColDiv);
  imageColDiv.appendChild(img);
  rowDiv.appendChild(contentColDiv);
  contentColDiv.appendChild(cardBodyDiv);
  cardBodyDiv.appendChild(title);
  cardBodyDiv.appendChild(ul);
  ul.appendChild(priceLi);
  ul.appendChild(descriptionLi);

  return colDiv;
};

const fetchAllproducts = async () => {
  let response = await fetch(
    `https://productsjs33-default-rtdb.firebaseio.com/productos/.json`
  );
  let data = await response.json();
  let keys = Object.keys(data);
  let productsArray = keys.map((key) => ({ ...data[key], key }));
  return productsArray;
};

const printproducts = async (productsArray, wrapperId) => {
  let wrapper = document.getElementById(wrapperId);
  // Limpiar el contenido anterior
  wrapper.innerHTML = "";

  productsArray.forEach((product) => {
    // Crear la tarjeta del producto
    let productCard = createproductCard(product);
    // Agregar la tarjeta del producto al contenedor
    wrapper.appendChild(productCard);
  });
};

const printAllproducts = async () => {
  let productsArray = await fetchAllproducts();
  printproducts(productsArray, "products-wrapper");
};

printAllproducts();
