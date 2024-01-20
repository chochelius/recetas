const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

const createNewFile = (filename) => {
  const newFilename = `tracked.json`;
  fs.copyFile(filename, newFilename, (err) => {
    if (err) throw err;
    else console.log(`${filename} was copied to ${newFilename}`);
  });
};

const file = "./tracked-products.xlsx";

let data = [];

const workbook = xlsx.readFile(file, { cellDates: true });
// console.log(workbook);

const worksheets = workbook.SheetNames;
// console.log(worksheets);

worksheet = workbook.Sheets[worksheets[0]];

const json = xlsx.utils.sheet_to_json(worksheet, {
  raw: false,
  defval: null,
  header: "A",
  range: 1,
});
json.forEach((row) => {
  let obj = {
    Codigo: row["A"],
    Origen: row["B"],
    Categoria: row["C"],
    Producto: row["D"],
  };
  data.push(obj);
  console.log(obj);
});

fs.writeFileSync("tracked.json", JSON.stringify(data), (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});
