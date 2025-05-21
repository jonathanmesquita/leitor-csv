document.getElementById('csvFile').addEventListener('change', function (e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const text = event.target.result;
    const linhas = text.split('\n').map(l => l.trim()).filter(l => l);

    // Detectar automaticamente o delimitador
    const firstLine = linhas[0];
    let delimiter = firstLine.includes(';') ? ';' : (firstLine.includes(',') ? ',' : null);
    
    if (!delimiter) {
      alert("O arquivo não possui delimitador válido (';' ou ',').");
      return;
    }

    const headers = linhas[0].split(delimiter);

    const dados = linhas.slice(1).map(linha => {
      const valores = linha.split(delimiter);
      return headers.reduce((obj, header, index) => {
        obj[header] = valores[index] || '';
        return obj;
      }, {});
    });

    // Cria a tabela dinamicamente
    const tabela = document.createElement('table');
    tabela.classList.add('tabela'); // Adiciona uma classe para estilo

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
    
    // Limpar a tabela anterior e inserir a nova tabela
    const output = document.getElementById('output');
    output.innerHTML = ''; // Limpa a área de saída
    output.appendChild(tabela);
  };

  // Ler o arquivo como texto
  reader.readAsText(file);
});
