const fs = require('fs');

const file = './recetas.json';

const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const groupObjects = (data) => {
    const groupedObjects = {};
    for (const element of data) {
        const key = element['Producto'];
        const amount = parseInt(element['Cantidad'] * element['Precio_ingrediente']);
        if (!groupedObjects[key]) {
            groupedObjects[key] = [];
            groupedObjects[key].amount = 0;
            groupedObjects[key].push(element);
        }
        groupedObjects[key].amount += amount;
    }
    return groupedObjects;
}



let group = groupObjects(data);
fs.writeFileSync(`recetas-grouped.json`, JSON.stringify(group), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
}
);
console.log(group);