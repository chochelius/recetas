const fs = require('fs');
const path = require('path');


//read json file with the cost of each ingredient and the id and name of the product
const costos = JSON.parse(fs.readFileSync('recetas.json', 'utf8'));
const diccionario = JSON.parse(fs.readFileSync('diccionario-locales.json', 'utf8'));
const despachos = JSON.parse(fs.readFileSync('despachos.json', 'utf8'));
const ventas = JSON.parse(fs.readFileSync('ventas-locales.json', 'utf8'));

// costos.JSON.forEach(element => {
//     console.log(element);
// }
// );
//loop through the json file and get the cost of each ingredient
let costosIngrediente = [];

// transform precioIngrediente from this format $1.000 to this format 1000
// let precioIngrediente = element.Precio_Ingrediente.replace('$', '')
const getPrecioIngrediente = (precioIngrediente) => {
    if (precioIngrediente !== null) {
        let precio = precioIngrediente.replace('.', '');
        let precio2 = precio.replace('$', '');
        return precio2;
    }
}



//for each through the json file and get the cost of each ingredient
costos.forEach(element => {

    let costoIngrediente = {
        'Codigo': element.Codigo,
        'Producto': element.Producto,
        'Ingrediente': element.Ingrediente,
        'Cantidad': element.Cantidad,
        'Precio_Ingrediente': getPrecioIngrediente(element.Precio_Ingrediente),
    }
    costosIngrediente.push(costoIngrediente);
    console.log(costoIngrediente);
    
}
);

// write the costos to a json file

fs.writeFileSync('costos.json', JSON.stringify(costosIngrediente), 'utf8');