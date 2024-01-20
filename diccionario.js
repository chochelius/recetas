const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

const createNewFile = (filename, date, locale) => {
  const newFilename = `${date}_${locale}.json`;
  fs.copyFile(filename, newFilename, (err) => {
    if (err) throw err;
    else console.log(`${filename} was copied to ${newFilename}`);
  });
};

const file = "./diccionario-productos2.xlsx";

const extraerDiccionario = (filename) => {
  const workbook = xlsx.readFile(filename);
  const worksheets = workbook.SheetNames;
  let data = [];
  worksheets.forEach((element) => {
    const worksheet = workbook.Sheets[element];
    const json = xlsx.utils.sheet_to_json(worksheet, {
      raw: false,
      defval: null,
      header: "A",
      range: 1,
    });
    json.forEach((row) => {
      if (row["A"] != null && row["A"] != "") {
        let obj = {
          Local: element,
          Codigo: row["A"],
          Producto: row["B"],
          Descripccion: row["C"],
          Precio_venta: row["D"],
        };
        data.push(obj);
        console.log(obj);
      }
      // fs.writeFileSync('diccionario-locales.json', JSON.stringify(data), (err) => {
      //     if (err) throw err;
      //     console.log('The file has been saved!');
      // }
      // );
    });
    fs.writeFileSync("diccionario.json", JSON.stringify(data), (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  });
};

extraerDiccionario(file);
