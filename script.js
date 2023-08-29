// Carrega o script depois que todos os elementos da página são carregados
document.addEventListener('DOMContentLoaded', function() {
    // Chama a função que preenche a lista assim que a página carrega
    window.onload = function() {
        console.log('Função onload iniciada'); // Log de debug
        const selectElement = document.getElementById('foodList');
        const selectedOption = selectElement.options[selectElement.selectedIndex];
        const selectedOptionId = selectedOption.id;
        
        console.log('ID da opção selecionada: ' + selectedOptionId); // Log de debug

        // Chama a função com o ID da opção selecionada
        fetchDataAndPopulateList(selectedOptionId);
    }

    // Adiciona um event listener para detectar mudança na lista de tipo de alimentos
    document.getElementById('foodList').addEventListener('change', function() {
        console.log('Mudança detectada.') // Log de debug
        const selectElement = document.getElementById('foodList');
        const selectedOption = selectElement.options[selectElement.selectedIndex];
        const selectedOptionId = selectedOption.id;
        
        // Chama a função que preenche a segunda lista com base na opção selecionada na primeira lista
        fetchDataAndPopulateList(selectedOptionId);
    });

    async function fetchDataAndPopulateList(selectedOptionId) {
        try {
            console.log('Capturando e preenchendo a lista para a opção: ' + selectedOptionId); // Log de debug
            let csvFilePath = ''; // Inicializa o caminho do arquivo CSV dependendo da opção selecionada

            // Determina o acesso ao caminho do arquivo CSV dependendo da opção selecionada
            switch (selectedOptionId) {
                case 'tb1': // Tabela padrão
                    csvFilePath = './res/tabela_de_alimentos.csv';
                    break;
                case 'tb2': // Cantina escolar
                    csvFilePath = './res/tabela_cantina_escolar.csv';
                    break;
                case 'tb3': // Cantina italiana
                    csvFilePath = './res/tabela_cantina_italiana.csv';
                    break;
                case 'tb4': // Casamento
                    csvFilePath = './res/tabela_casamento.csv';
                    break;
                case 'tb5': // Churrascaria
                    csvFilePath = './res/tabela_churrascaria.csv';
                    break;
                case 'tb6': // Comida árabe
                    csvFilePath = './res/tabela_comida_arabe.csv';
                    break;
                case 'tb7': // Comida japonesa
                    csvFilePath = './res/tabela_comida_japonesa.csv';
                    break;
                case 'tb8': // Culinária alemã
                    csvFilePath = './res/tabela_culinaria_alema.csv';
                    break;
                case 'tb9': // Doces
                    csvFilePath = './res/tabela_doces.csv';
                    break;
                case 'tb10': // Festa de aniversário
                    csvFilePath = './res/tabela_festa_aniversario.csv';
                    break;
                case 'tb11': // Festa junina
                    csvFilePath = './res/tabela_festa_junina.csv';
                    break;
                case 'tb12': // Natal
                    csvFilePath = './res/tabela_natal.csv';
                    break;
                case 'tb13': // Páscoa
                    csvFilePath = './res/tabela_pascoa.csv';
                    break;
                case 'tb14': // Pizza 
                    csvFilePath = './res/tabela_pizzas.csv';
                    break;
                case 'tb15': // Sorvetes
                    csvFilePath = './res/tabela_sorvetes.csv';
                    break;
                default:
                    console.log('Opção desconhecida selecionada.');
                    return; // Sai da função se for selecionada uma opção desconhecida
            }

            const response = await fetch(csvFilePath);
            const data = await response.text();

            const lines = data.split('\n');
            const dataArray = [];

            for (let i = 1; i < lines.length; i++) {
                const line = lines[i];
                const items = parseCSVLine(line);

                if (items.length > 0) {
                    // constante que captura o nome do item do arquivo CSV selecionado
                    const item = items[0];
                    // constante que captura as calorias do item do arquivo CSV selecionado
                    const calorias = items[4];
                    dataArray.push({ item, calorias });
                    
                }
            }

            const listContainer = document.getElementById('listContainer');

            // Populate the select element with data
            listContainer.innerHTML = ''; // Limpa as opções anteriores
            dataArray.forEach(itemData => {
                const option = document.createElement('option');
                option.textContent = `${itemData.item}`;
                listContainer.appendChild(option);

                const caloriasParagraph = document.getElementById('calorias');
                const selectedOptionIndex = listContainer.selectedIndex;
                const selectedOptionData = dataArray[selectedOptionIndex];
                // Atualiza o elemento com base no elemento selecionado na segunda lista
                caloriasParagraph.textContent = `${selectedOptionData.calorias} kcal`;

                // Adiciona um event listener que detecta mudanças na segunda lista
                listContainer.addEventListener('change', (event) => {
                    const selectedOptionIndex = event.target.selectedIndex;
                    const selectedOptionData = dataArray[selectedOptionIndex];
                    // Atualiza o elemento com base no elemento selecionado na segunda lista
                    caloriasParagraph.textContent = `${selectedOptionData.calorias} kcal`;
                });
            });
        } catch (error) {
            console.error('Erro buscando ou carregando os dados:' + error);
        }
    }
    
    // Função que corrige o item no caso de uso de aspas duplas
    function parseCSVLine(line) {
        const items = [];
        let currentItem = '';
        let withinQuotes = false;

        for (const char of line) {
            if (char === ',' && !withinQuotes) {
                items.push(currentItem.trim());
                currentItem = '';
            } else if (char === '"') {
                withinQuotes = !withinQuotes;
            } else {
                currentItem += char;
            }
        }

        items.push(currentItem.trim());
        return items;
    }
});
