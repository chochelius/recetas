const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const file = './recetasmatched.xslx.xlsx';
const file2 = './diccionario-locales.json';

const extraerProductos = JSON.parse(fs.readFileSync(file2, 'utf8'));


const getPrecioIngrediente = (valor) => {
    if (valor === null) {
        return null;
    } else {

    let precio2 = valor.replace(',', '');
    let precio3 = precio2.replace('$', '');

    return precio3;
}
}

// let productos = []
let data = [];

const extraerRecetas = (filename) => {
    const workbook = xlsx.readFile(filename);
    const worksheet = workbook.SheetNames[0];
    const json = xlsx.utils.sheet_to_json(workbook.Sheets[worksheet], { raw: false, defval: null, header: 'A', range: 0 });
    json.forEach((row) => {
        if ((row['A'] != null) && (row['A'] != '')) {
            let precioIngrediente = getPrecioIngrediente(row['G']);
            let obj = {
                'Codigo': row['A'],
                'Producto': row['B'],
                'CantidadPara': row['C'],
                'Medida': row['D'],
                'Ingrediente': row['E'],
                'Cantidad': row['F'],
                'Precio_ingrediente': precioIngrediente,
                // 'Precio_porcion': row['F'],
            }
            data.push(obj);
            console.log(obj);
        }
    }
    );
    fs.writeFileSync('recetas.json', JSON.stringify(data), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    }
    );
}


extraerRecetas(file);