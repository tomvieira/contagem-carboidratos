// Carrega o script depois que todos os elementos da página são carregados
document.addEventListener('DOMContentLoaded', function() {
    // Chama a função que preenche as informações assim que a página carrega
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
                    // constante que captura o valor do carboidrato (CHO) do item do arquivo CSV selecionado
                    const carb = items[3];
                    // armazena os valores dos items e dos carboidreatos na array
                    dataArray.push({ item, carb });
                }
            }

            const listContainer = document.getElementById('listContainer');
            // Limpa as opções anteriores
            listContainer.innerHTML = ''; 
            // Para cada item da array
            dataArray.forEach(itemData => {
                // cria uma opção dentro da tag select
                const option = document.createElement('option');
                // adicionando o nome do item
                option.textContent = `${itemData.item}`;
                // ao container como seu filho
                listContainer.appendChild(option);
                // atribui o elemento carbs a uma constante
                const caloriasParagraph = document.getElementById('carbs');
                // recupera a opção selecionada no container
                const selectedOptionIndex = listContainer.selectedIndex;
                // verifica o index do item selecionado
                const selectedOptionData = dataArray[selectedOptionIndex];
                /* Atualiza o elemento carbs com o valor das calorias correspondente ao 
                index do item selecionado*/
                caloriasParagraph.textContent = `${selectedOptionData.carb} CHO`;
                
                // Adiciona um event listener que detecta mudanças na lista de alimentos
                listContainer.addEventListener('change', (event) => {
                    // recupera a opção selecionada no container
                    const selectedOptionIndex = event.target.selectedIndex;
                    // verifica o index do item selecionado
                    const selectedOptionData = dataArray[selectedOptionIndex];
                    // Atualiza o elemento com base no elemento selecionado na segunda lista
                    caloriasParagraph.textContent = `${selectedOptionData.carb} CHO`;
                });
            });
        // lida com erros
        } catch (error) {
            console.error('Erro buscando ou carregando os dados:' + error);
        }
    }
    
    // Função que formata o texto do item no caso de uso de aspas duplas
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
