// Carrega o script depois que todos os elementos da página são carregados
document.addEventListener('DOMContentLoaded', function() {
    // Cria a lista de itens
    let cartList = []; 
    // Cria o contador de itens da lista
    let cartCount = 0; 
    // Declara a array para uso imediato
    let dataArray = [];
    // Atribui os elementos HTML a constantes específicas
    const listContainer = document.getElementById('listContainer');
    const cartIcon = document.getElementById('cart');
    const cartItemsList = document.getElementById('cartItemsList');
    const inputWeight = document.getElementById('i_weight');

    // Chama a função que preenche as informações assim que a página carrega
    window.onload = function() {
        // Atribui o elemento HTML à constante
        const selectElement = document.getElementById('foodList');
        const selectedOption = selectElement.options[selectElement.selectedIndex];
        const selectedOptionId = selectedOption.id;
        // Chama a função com o ID da opção selecionada
        fetchDataAndPopulateList(selectedOptionId);
    }

    // Adiciona um event listener para detectar mudança na lista de tipo de alimentos
    document.getElementById('foodList').addEventListener('change', function() {
        const selectElement = document.getElementById('foodList');
        const selectedOption = selectElement.options[selectElement.selectedIndex];
        const selectedOptionId = selectedOption.id;
        fetchDataAndPopulateList(selectedOptionId);
    });

    // Inicia a constante atribuída ao botão de adicionar itens ao carrinho
    const addButton = document.getElementById('addButton');
    addButton.addEventListener('click', () => {
        const selectedOptionIndex = listContainer.selectedIndex;
        const selectedOptionData = dataArray[selectedOptionIndex];
        const carbsValue = document.getElementById('carbs').textContent; 
        // Cria um objeto com o nome do item e o valor do carboidrato
        const cartItem = {
            item: selectedOptionData.item,
            carbValue: carbsValue,
        };
        if (carbsValue.length > 0) {
            // Adiciona o objeto criado acima à lista
            cartList.push(cartItem);
            // Soma 1 na contagem de itens do carrinho
            cartCount++;
            // Chama a função que atualiza os itens do carrinho
            updateCartDisplay();
        } else {
            // do nothing
        }
        
    });

    // Adiciona um event listener para detectar quando há clique no carrinho
    cartIcon.addEventListener('click', () => {
        const modal = document.getElementById('cartModal');
        // Se a tela modal estiver sendo exibida, a fecha
        if (modal.style.display === 'block') {
            closeCartModal();
        // se não, abre a tela modal
        } else {
            openCartModal();
        }
    });

    // Adiciona um event listener para detectar quando há clique no botão de fechar a lista
    const closeButton = document.querySelector('.close');
    closeButton.addEventListener('click', () => {
        closeCartModal();
    });

    // Função que abre a janela modal com a lista de itens
    function openCartModal() {
        const modal = document.getElementById('cartModal');
        modal.style.display = 'block';

        // Limpa os itens do carrinho antes de populá-lo
        cartItemsList.innerHTML = '';
        // Chama a função que popula o carrinho
        populateCartItems();
    }

    // Função que fecha a janela modal com a lista de itens    
    function closeCartModal() {
        const modal = document.getElementById('cartModal');
        modal.style.display = 'none';
    }

    // Função que atualiza a contagem de itens do carrinho
    function updateCartDisplay() {
        const cartItemsElement = document.querySelector('.cartItems');
        cartItemsElement.textContent = cartCount;
    }

    // Função que popula o carrinho
    function populateCartItems() {
        // Limpa os itens anteriores
        cartItemsList.innerHTML = ''; 
        // Inicializa a variável que contabiliza o total de carboidratos
        let totalCHO = 0; 
        
        // Para cada item da lista de itens
        cartList.forEach((item, index) => {
            // Cria uma div
            const cartItemDiv = document.createElement('div');
            // Transforma o valor dos carboidratos em uma integer
            const choValue = parseInt(item.carbValue); 
            // Adiciona o valor ao total
            totalCHO += choValue; 
            // Exibe um texto com o nome e o valor do carboidrato do item
            cartItemDiv.textContent = `${item.item}: ${item.carbValue}`; 
            // Adiciona um item embaixo do outro
            cartItemsList.appendChild(cartItemDiv);
    
            // Adiciona espaço vertical entre o último item da lista e o total
            if (index === cartList.length - 1) {
                cartItemDiv.style.marginBottom = '1.5em'; 
            }
        });
    
        // Cria um div para o total e adiciona como filho da lista
        const totalDiv = document.createElement('div');
        totalDiv.textContent = `Total: ${totalCHO} CHO`;
        cartItemsList.appendChild(totalDiv);
    }    

    async function fetchDataAndPopulateList(selectedOptionId) {
        try {
            // Atribui uma variável para o arquivo CSV
            let csvFilePath = '';
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

            // Espera que o arquivo CSV seja determinado
            const response = await fetch(csvFilePath);
            const data = await response.text();
            const lines = data.split('\n');
            dataArray = [];

            for (let i = 1; i < lines.length; i++) {
                const line = lines[i];
                const items = parseCSVLine(line);

                // Se houver um item
                if (items.length > 0) {
                    // nome do item
                    const item = items[0];
                    // medida usual
                    const measure = items[1];
                    // peso
                    const weight = items[2];
                    // CHO
                    const carb = items[3];
                    // Armazena as informações na array
                    dataArray.push({ item, measure, weight, carb });
                }
            }

            listContainer.innerHTML = '';
            dataArray.forEach(itemData => {
                const option = document.createElement('option');
                option.textContent = `${itemData.item}`;
                listContainer.appendChild(option);
            });

            const carbsParagraph = document.getElementById('carbs');
            
            // Calcula os carboidratos quando o número do peso é alterado
            //const inputWeight = document.getElementById('i_weight');
            listContainer.addEventListener('change', () => {
                const selectedOptionIndex = listContainer.selectedIndex;
                const selectedOptionData = dataArray[selectedOptionIndex];
                let result = (inputWeight.value * parseFloat(selectedOptionData.carb)) / parseFloat(selectedOptionData.weight);
                result = Math.ceil(result);
                carbsParagraph.textContent = `${result} CHO`;
            });

            // Recalcula os carboidratos quando muda o número do peso
            inputWeight.addEventListener('input', () => {
                const selectedOptionIndex = listContainer.selectedIndex;
                const selectedOptionData = dataArray[selectedOptionIndex];
                let result = (inputWeight.value * parseFloat(selectedOptionData.carb)) / parseFloat(selectedOptionData.weight);
                result = Math.ceil(result);
                carbsParagraph.textContent = `${result} CHO`;
            });      
            
            // Zera o peso e os carboidratos quando a lista de alimentos é alterada
            document.getElementById('foodList').addEventListener('change', function() {
                inputWeight.value = '0';
                // Reseta os carboidratos
                carbsParagraph.textContent = '';
                const selectElement = document.getElementById('foodList');
                const selectedOption = selectElement.options[selectElement.selectedIndex];
                const selectedOptionId = selectedOption.id;
                // Chama a função que preenche a lisa
                fetchDataAndPopulateList(selectedOptionId);
            });

        // Em caso de erro
        } catch (error) {
            console.error('Erro buscando ou carregando os dados:' + error);
        }
    }

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
