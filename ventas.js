const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

const file = "./ventasxlocal2.xlsx";

const diccionario = "./diccionario.json";

const trackedProducts = JSON.parse(fs.readFileSync("tracked.json", "utf8"));

const codigosProducto = JSON.parse(fs.readFileSync(diccionario, "utf8"));

const getDiccionario = (codigo) => {
  let producto = codigosProducto.find((element) => element.Codigo === codigo);
  if (producto !== undefined) {
    return producto.Producto;
  } else {
    return "error";
  }
};

//remove from value after . only keep before .
const removeDecimals = (value) => {
  let newValue = value.replace(/\..*/g, "");
  return newValue;
};

const removeCommas = (value) => {
  let newValue = value.replace(/\,.*/g, "");
  return newValue;
};

//correct date from MM/DD/YY to DD/MM/YY
const correctDate = (date) => {
  let newDate = date.replace(/(\d{2})(.*)(\d{2})(.*)(\d{2})/, "$1-01");
  return newDate;
};

let data = [];

const extractInfo = (filename, date) => {
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
      let productoDesc = getDiccionario(row["A"]);
      let obj = {
        Local: element,
        Codigo: row["A"],
        Producto: productoDesc,
        Precio: removeDecimals(row["D"]) * 1,
        Cantidad: removeCommas(row["E"]) * 1,
        Subtotal: removeDecimals(row["D"]) * removeCommas(row["E"]),
        Fecha: row["K"],
        FechaCorrecta: correctDate(row["K"]),

        // 'Unidad': row['C'],
      };
      data.push(obj);
      console.log(obj);
    });
    fs.writeFileSync(
      `ventas-locales-${date}.json`,
      JSON.stringify(data),
      (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      }
    );
  });
};

extractInfo(file, "19-01-2024");
