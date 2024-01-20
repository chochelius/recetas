const fs = require("fs");

// Función para obtener los datos de las ventas
function getVentas() {
  const ventas = fs.readFileSync("./ventas-locales-19-01-2024.json");
  return JSON.parse(ventas);
}

// Función para obtener los datos de las recetas
function getRecetas() {
  const recetas = fs.readFileSync("./diccionario.json");
  return JSON.parse(recetas);
}

// Función para obtener los datos del diccionario de productos
function getProductos() {
  const productos = fs.readFileSync("diccionario.json");
  return JSON.parse(productos);
}

// Función para calcular la cantidad de items que hay que restar del inventario
function calcularCantidadItems() {
  const ventas = getVentas();
  const recetas = getRecetas();
  const productos = getProductos();

  // Iteramos sobre las ventas

  ventas.forEach((venta) => {
    // Obtenemos el producto comprado
    const producto = venta.Producto;

    // Obtenemos la receta del producto
    const receta = recetas.find((r) => r.Producto === producto);

    // Obtenemos los ingredientes de la receta
    const ingredientes = receta;
    console.log(ingredientes);
    // Iteramos sobre los ingredientes
  });
}

calcularCantidadItems();
