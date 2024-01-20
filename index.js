const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");
const glob = require("glob");

// const fileNames = fs.readdirSync(__dirname).filter(file => file.includes('STOCK DIARIO') && (file.includes('xlsx') || file.includes('xls')));
const fileNames = glob.sync(__dirname + "/**/*STOCK DIARIO*.xlsx");
console.log(fileNames);

//local name could be in the format TECLADOS1 or TECLADOS 1 or T1, TECLADOS2 or TECLADOS 2 or T2, through TECLADOS7 or TECLADOS 7 or T7
const teclados = [
  "TECLADOS1",
  "TECLADOS 1",
  "T1",
  "TECLADOS2",
  "TECLADOS 2",
  "T2",
  "TECLADOS3",
  "TECLADOS 3",
  "T3",
  "TECLADOS4",
  "TECLADOS 4",
  "T4",
  "TECLADOS5",
  "TECLADOS 5",
  "T5",
  "TECLADOS6",
  "TECLADOS 6",
  "T6",
  "TECLADOS7",
  "TECLADOS 7",
  "T7",
];

const t1 = ["TECLADOS1", "TECLADOS 1", "T1"];
const t2 = ["TECLADOS2", "TECLADOS 2", "T2"];
const t3 = ["TECLADOS3", "TECLADOS 3", "T3"];
const t4 = ["TECLADOS4", "TECLADOS 4", "T4"];
const t5 = ["TECLADOS5", "TECLADOS 5", "T5"];
const t6 = ["TECLADOS6", "TECLADOS 6", "T6"];
const t7 = ["TECLADOS7", "TECLADOS 7", "T7"];

// filter by locale

const getDateFromFilename = (filename) => {
  let date = filename.match(/\d{2}.*\d{2}.*\d{2}/g);
  let correctDate = date[0].replace(
    /(\d{2})(.*)(\d{2})(.*)(\d{2})/,
    "$1/01/2024"
  );
  return correctDate;
};

const filterByLocale = (filename) => {
  if (filename.includes("xlsx" & "stock")) {
    let date = getDateFromFilename(filename);
    teclados.forEach((teclado) => {
      if (filename.includes(teclado)) {
        if (t1.includes(teclado)) {
          return [filename, date, "T1"];
        }
        if (t2.includes(teclado)) {
          return [filename, date, "T2"];
        }
        if (t3.includes(teclado)) {
          return [filename, date, "T3"];
        }
        if (t4.includes(teclado)) {
          return [filename, date, "T4"];
        }
        if (t5.includes(teclado)) {
          return [filename, date, "T5"];
        }
        if (t6.includes(teclado)) {
          return [filename, date, "T6"];
        }
        if (t7.includes(teclado)) {
          return [filename, date, "T7"];
        }
      }
    });
  }
};

const getWorksheet = (filename) => {
  let workbook = xlsx.readFile(filename);
  let worksheets = workbook.SheetNames;
  return worksheets;
};

let data = [];

const extractInfo = (filename, date, locale) => {
  let local = locale;
  let workbook = xlsx.readFile(filename);
  let worksheets = workbook.SheetNames;

  worksheets.forEach((worksheet) => {
    let sheet = xlsx.utils.sheet_to_json(workbook.Sheets[worksheet], {
      raw: false,
      defval: null,
      header: "A",
      range: 9 - 170,
    });

    // let dateNormalized = date.replace(/(\d{2})(.*)(\d{2})(.*)(\d{2})/, "$1/01/2024");

    let count = 0;

    let lines = sheet.map((line) => {
      // let dateNormalized = date.replace(/(\d{2})(.*)(\d{2})(.*)(\d{2})/, "$1/01/2024");
      if (line["A"] !== "null") {
        let obj = {
          ArchivoOrigen: filename,
          Fecha: date,
          Local: local,
          product: line["A"],
          Unidad: line["B"],
          Porcion: line["C"],
          "Stock Inicio": line["D"],
          "Stock Inicio (porcion)": line["E"],
          "Stock Inicio Turno": line["H"],
          "Stock Inicio Turno (porcion)": line["I"],
          "Stock Final Turno": line["J"],
          "Stock Final Turno (porcion)": line["K"],
        };

        count = count + 1;
        // console.log("Objeto terminado N°" + count);

        // console.log('obj', obj.Local, obj.product, obj['Fecha_Normal']);

        return data.push(obj);
      }
      // console.log("Finished");
    });

    let json = JSON.stringify(data);
    fs.writeFile("stock-diario2.json", json, "utf8", (err) => {
      if (err) {
        console.log("Error writing file", err);
      } else {
        console.log("Successfully wrote file");
      }
    });
  });
};

fileNames.forEach((filename) => {
  let date = getDateFromFilename(filename);
  let locale = filterByLocale(filename);
  // let worksheet = getWorksheet(filename);
  extractInfo(filename, date, locale);
});
