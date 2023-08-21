// Calls the populate list function on page load
window.onload = function() {
    fetchDataAndPopulateList();
};

async function fetchDataAndPopulateList() {
    try {
        const response = await fetch('./res/tabela_de_alimentos.csv');
        const data = await response.text();

        const lines = data.split('\n');
        const dataArray = [];

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            const items = parseCSVLine(line);

            if (items.length > 0) {
                const item = items[0];
                dataArray.push({ item });
            }
        }

        const listContainer = document.getElementById('listContainer');
        console.log(dataArray);

        // Populate the list with data
        dataArray.forEach(itemData => {
            const listItem = document.createElement('li');
            listItem.textContent = `${itemData.item}`;
            listContainer.appendChild(listItem);
        });
    } catch (error) {
        console.error('Erro buscando ou carregando os dados:', error);
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
