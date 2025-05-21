const fs = require('fs');
const csv = require('csv-parser');

const resultados = [];

fs.createReadStream('arquivo.csv', { encoding: 'utf8' })
  .pipe(csv({ separator: ';' }))  // Altere o separador se necessário
  .on('data', (data) => {
    resultados.push(data);
  })
  .on('end', () => {
    console.log('Leitura completa');
    console.log(resultados);  // Exibe os dados lidos no console
  })
  .on('error', (err) => {
    console.error('Erro na leitura do arquivo:', err);
  });
