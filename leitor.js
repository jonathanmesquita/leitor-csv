document.getElementById('csvFile').addEventListener('change', function (e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const text = event.target.result;
    const linhas = text.split('\n').map(l => l.trim()).filter(l => l);

    let headers = [];
    let dados = [];

    // Detectar automaticamente o delimitador
    const firstLine = linhas[0];
    let delimiter = firstLine.includes(';') ? ';' : (firstLine.includes(',') ? ',' : null);
    
    if (!delimiter) {
      alert("O arquivo não possui delimitador válido (';' ou ',').");
      return;
    }

    headers = linhas[0].split(delimiter);

    dados = linhas.slice(1).map(linha => {
      const valores = linha.split(delimiter);
      return headers.reduce((obj, header, index) => {
        obj[header] = valores[index] || '';
        return obj;
      }, {});
    });

    // Criação da tabela 1 (original)
    const tabela1 = criarTabela(headers, dados);
    const output = document.getElementById('output');
    output.innerHTML = ''; // Limpar a área de saída
    output.appendChild(tabela1);

    // Criação da tabela 2 (nova tabela)
    const tabela2 = criarTabela(headers, dados, true); // Passando `true` para sinalizar como nova tabela
    const output2 = document.getElementById('output2');
    output2.innerHTML = ''; // Limpar a área de saída da segunda tabela
    output2.appendChild(tabela2);
  };

  // Ler o arquivo como texto
  reader.readAsText(file);
});

// Função para criar a tabela com os dados
function criarTabela(headers, dados, isSecondTable = false) {
  const tabela = document.createElement('table');
  tabela.classList.add('tabela');

  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  const headRow = document.createElement('tr');
  
  // Cria uma célula para o número da linha
  const thLinhaNumero = document.createElement('th');
  thLinhaNumero.textContent = 'Linha';
  headRow.appendChild(thLinhaNumero);

  // Cabeçalhos das colunas dos dados
  headers.forEach(header => {
    const th = document.createElement('th');
    th.textContent = header;
    headRow.appendChild(th);
  });

  thead.appendChild(headRow);

  // Preenche as linhas da tabela
  dados.forEach((item, index) => {
    const row = document.createElement('tr');
    
    // Coloca o número da linha
    const tdNumeroLinha = document.createElement('td');
    tdNumeroLinha.textContent = index + 1;  // Começa a contagem de 1
    tdNumeroLinha.classList.add('linha-numero');
    row.appendChild(tdNumeroLinha);

    headers.forEach(header => {
      const td = document.createElement('td');
      td.textContent = item[header];
      row.appendChild(td);
    });
    tbody.appendChild(row);
  });

  tabela.appendChild(thead);
  tabela.appendChild(tbody);

  return tabela;
}
