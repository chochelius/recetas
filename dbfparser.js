const DBFFile = require('dbffile').DBFFile;
const fs = require('fs');
const xlsx = require('xlsx');

const dbfFile = './t1/arcmovi.dbf';
const dbfFile2 = './t2/arcmovi.dbf';
const dbfFile3 = './t3/arcmovi.dbf';
const dbfFile4 = './t4/arcmovi.dbf';
const dbfFile5 = './t5/arcmovi.dbf';
const dbfFile6 = './t6/arcmovi.dbf';
const dbfFile7 = './t7/arcmovi.dbf';

//use xlsx to write to xls file
const writeFile = (data, filename) => {
    let workbook = xlsx.utils.book_new();
    let worksheet = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    xlsx.writeFile(workbook, filename);
}





async function iterativeRead(file, filename) {
    let dbf = await DBFFile.open(file);
    console.log(`DBF file contains ${dbf.recordCount} records.`);
    console.log(`Field names: ${dbf.fields.map(f => f.name).join(', ')}`);
    for await (const record of dbf) console.log(record);
    fs.writeFileSync(`${filename}.json`, JSON.stringify(dbf), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
        return;
    }
    );
}

const readMultiple = () => {
    for (let i = 1; i < 8; i++) {
        let file = `./t${i}/arcmovi.dbf`;
        iterativeRead(file, `t${i}`);
    }
}

readMultiple();