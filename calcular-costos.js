const fs = require("fs");
const path = require("path");


//set current working directory using path module


console.log(__dirname);



// read the json files


const productos = JSON.parse(fs.readFileSync("./diccionario.json", "utf8"));

const recetas = JSON.parse(fs.readFileSync("./recetas.json", "utf8"));

const ventas = JSON.parse(fs.readFileSync("./ventas-locales-20-01-2024.json", "utf8"));

const trackedProducts = JSON.parse(fs.readFileSync("./recetas.json", "utf8"));

const diccionario = JSON.parse(fs.readFileSync("./diccionario-locales.json", "utf8"));

const codigosProducto = JSON.parse(fs.readFileSync("./diccionario-locales.json", "utf8"));

// //get the product description from diccionario-locales.json

// const getProductDescription = (productCode) =>
//   codigosProducto.find((product) => product.codigo === productCode).descripcion;

// //get the product price from diccionario-locales.json

// const getProductPrice = (productCode) =>
//   codigosProducto.find((product) => product.codigo === productCode).precio;

// //get the product ingredients from recetas.json

// const getProductIngredients = (productCode) =>
//   trackedProducts.find((product) => product.codigo === productCode).ingredientes;

// // get the product sales from the json file

// const getProductSales = (productCode) =>
//   ventas.find((product) => product.codigo === productCode).ventas;

// // calculate how many ingredients are needed for each product

// const calculateIngredientsNeeded = (productCode) =>
//   getProductIngredients(productCode).map((ingredient) =>
//     ingredient.cantidad * getProductSales(productCode)
//   );

// // calculate the cost of the sales

// const calculateCostOfSales = (productCode) =>
//   getProductPrice(productCode) * getProductSales(productCode);

// // get the product description from diccionario-locales.json

const getProductDescription = (productCode) =>
  diccionario.find((product) => product.codigo === productCode)
    .descripcion;

// get the product price from diccionario-locales.json

const getProductPrice = (productCode) =>
  diccionario.find((product) => product.codigo === productCode).precio;

//get the product ingredients from recetas.json

const getProductIngredients = (productCode) =>
  recetas.find
    ((product) => product.codigo === productCode).ingredientes;

// get the product sales from the json file

const getProductSales = (productCode) =>
  ventas.find
    ((product) => product.codigo === productCode).ventas;
console.log(getProductSales);

// calculate how many ingredients are needed for each product

const calculateIngredientsNeeded = (productCode) => {
  const product = recetas.find((product) => product.codigo === productCode);
  console.log(product);
}

console.log(calculateIngredientsNeeded);




// calculate the cost of the sales

const calculateCostOfSales = (productCode) =>
  getProductPrice(productCode) * getProductSales(productCode);
console.log(calculateCostOfSales);

// aggregate the data

const aggregateData = () =>
  JSON.parse(fs.readFileSync("./recetas.json", "utf8")).map
    ((product) =>
    ({
      codigo: product.codigo,
      descripcion: getProductDescription(product.codigo),
      precio: getProductPrice(product.codigo),
      ingredientes
        : getProductIngredients(product.codigo),

      ventas: getProductSales(product.codigo),
      ingredientesNecesarios: calculateIngredientsNeeded(product.codigo),
      costoVentas: calculateCostOfSales(product.codigo)

    })
    );
console.log(aggregateData);

// write the aggregated data to a json file

const writeAggregatedData = () =>
  fs.writeFileSync("./aggregated-data.json", JSON.stringify(aggregateData(), null, 2));
console.log(writeAggregatedData);

// 

const main = () => {
  aggregateData();
  writeAggregatedData();
};

main();
