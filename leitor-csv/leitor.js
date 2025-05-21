const fs = require('fs');
const csv = require('csv-parser');

const resultados = [];

fs.createReadStream('arquivo.csv', { encoding: 'utf8' })
  .pipe(csv({ separator: ';' }))
  .on('data', (data) => resultados.push(data))
  .on('end', () => {
    console.log(resultados);
  });
