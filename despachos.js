const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const createNewFile = (filename, date, locale) => {
    const newFilename = `${date}_${locale}.json`;
    fs.copyFile(filename, newFilename, (err) => {
        if (err) throw err;
        else console.log(`${filename} was copied to ${newFilename}`);
    });
}

const file = './despachos.xlsx';

const extraerCostos = (filename) => {
    const workbook = xlsx.readFile(filename);
    const worksheet = workbook.SheetNames[0]
    const json = xlsx.utils.sheet_to_json(workbook.Sheets[worksheet], { raw: false, defval: null, header: 'A', range: 1 });
    let data = [];
    json.forEach((row) => {
        if ((row['A'] != null) && (row['A'] != '')) {

            let obj = {
                'Codigo': row['A'],
                'Producto': row['B'],
                'Cantidad': row['E'],
                'Tipo_Movimiento': row['J'],
                'Local': row['N'],
                'Fecha': row['O'].toString(),
                'Fecha_Despacho': row['P'],
            }
            data.push(obj);
            console.log(obj);
        } else {
            return;
        }
        fs.writeFileSync('despachos.json', JSON.stringify(data), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        }
        );
    }
    );
}

extraerCostos(file);