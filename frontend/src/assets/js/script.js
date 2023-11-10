// Carrega o script depois que todos os elementos da página são carregados
document.addEventListener('DOMContentLoaded', function() {





    const cartIcon = document.getElementById('cart');






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
    }

    // Função que fecha a janela modal com a lista de itens
    function closeCartModal() {
        const modal = document.getElementById('cartModal');
        modal.style.display = 'none';
    }

    /** accordion*/
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        })
    };
});

function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
};