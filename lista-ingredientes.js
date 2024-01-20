const fs = require('fs');
const path = require('path');

const file = './pdf-recetas.txt';
const start = 'Break----------------'
const end = 'PREPARACIÓNREPARACIÓN'
const regex = new RegExp(`${start}(.*?)${end}`, 'gs');

const extraerRecetas = (filename) => {
    const data = fs.readFileSync(filename, 'utf8');
    const matches = data.match(regex);
    let recetas = [];
    matches.forEach((match) => {
        let receta = match.replace(start, '').replace(end, '').trim();
        let recetaSplit = receta.split('\n');
        
        let recetaObj = {
            'Producto': recetaSplit[0],
            'Ingredientes': []
        }
        recetaSplit.forEach((row) => {
            let ingrediente = row.split(' ');
            let ingredienteObj = {
                'Cantidad': ingrediente[0],
                'Unidad': ingrediente[1],
                'Ingrediente': ingrediente.slice(2).join(' ')
            }
            recetaObj.Ingredientes.push(ingredienteObj);
        });
        recetas.push(recetaObj);
        console.log(receta);
    });
    fs.writeFileSync('recetas-extrac.json', JSON.stringify(recetas), (err) => {
        if (err) throw err;
        return console.log('The file has been saved!');

    }
    );
}
    

extraerRecetas(file);