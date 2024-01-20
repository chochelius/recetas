const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

//create a script that will extract the sales from the excel file, matches every product sold with it's corresponding description and price, and then creates a new file with the sales data, extract the ingredients from recetas.json and then calculate the cost of the sales, and then create a new file with the cost of the sales

const file = "./ventasxlocal2.xlsx";

const trackedProducts = JSON.parse(fs.readFileSync("tracked.json", "utf8"));

const diccionario = "./recetas.json";

const codigosProducto = JSON.parse(fs.readFileSync(diccionario, "utf8"));

const getDiccionario = (codigo) => {
  let producto = codigosProducto.find((element) => element.Codigo === codigo);
  if (producto !== undefined) {
    return producto.Producto;
  } else {
    return "error";
  }
};

//get tracked products from tracked.json

const getTrackedProducts = (codigo) => {
  let productos = [];
  let producto = trackedProducts.find((element) => element.Codigo === codigo);
  if (producto !== undefined) {
    productos.push(producto.Producto);
  } else {
    return "error";
  }
  return productos;
};

//get the ingredient list from recetas.json

// {
//     "Codigo": "1",
//     "Producto": "Chicken Finger",
//     "CantidadPara": "1",
//     "Medida": "PORC",
//     "Ingrediente": "I. CHICKEN FINGER",
//     "Cantidad": "1",
//     "Precio_ingrediente": "1087"
// },

//should read the code and then compare it with the code in recetas.json and then get the list of ingredients and then calculate the cost of the product

const getIngredientes = (codigo) => {
  let ingredientes = [];
  let producto = codigosProducto.find((element) => element.Codigo === codigo);
  if (producto !== undefined) {
    ingredientes.push(producto.Ingrediente);
  } else {
    return "error";
  }
  return ingredientes;
};

//check what ingredientes are int the tracked.json file products

const getTrackedIngredientes = (codigo) => {
  let ingredientes = [];
  let producto = trackedProducts.find((element) => element.Codigo === codigo);
  if (producto !== undefined) {
    ingredientes.push(producto.Ingrediente);
  } else {
    return "error";
  }
  console.log(ingredientes);
};

//get the data from the excel file

let data = [];

const extractInfo = (filename) => {
  const workbook = xlsx.readFile(filename);
  const worksheets = workbook.SheetNames;

  worksheets.forEach((element) => {
    const worksheet = workbook.Sheets[element];
    const json = xlsx.utils.sheet_to_json(worksheet, {
      raw: false,
      defval: null,
      header: "A",
      range: 1,
    });
    json.forEach((row) => {
      let trackedProducts = getTrackedProducts(row["A"]);
      let productoDesc = getDiccionario(row["A"]);
      let ingredientes = getIngredientes(row["A"]);
      let obj = {
        Key: count,
        Local: element,
        Tracked: trackedProducts,
        ProductDescription: productoDesc,
        Ingredientes: ingredientes,
      };
      count = count++;
      data.push(obj);
      console.log(obj);
    });
    // // fs.writeFileSync(
    // //   `ventas-locales-${date}.json`,
    // //   JSON.stringify(data, null, 2)
    // );
  });
};

extractInfo(file);
