// REGISTROS //

async function searchRegistros() {
    const query = document.getElementById('searchBarRegistro').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const url = new URL(`/Chamado/SearchReg`, window.location.origin);
    if (query) url.searchParams.append('query', query);
    if (startDate) url.searchParams.append('startDate', startDate);
    if (endDate) url.searchParams.append('endDate', endDate);
    const response = await fetch(url);
    const registros = await response.json();
    displayRegistroResults(registros);
};

//"Enter"
function EnterRegistro(event) {
    if (event.key === 'Enter') {
        searchRegistros();
    }
};

//"lupa"
function searchIconRegistros() {
    document.getElementById('searchIconRegistros').addEventListener('click', function () {
        searchRegistros();
    })
};

//Função pesquisa que mostra os resultados
function displayRegistroResults(registros) {
    const resultsList = document.getElementById('registros-list');
    resultsList.innerHTML = '';
    registros.forEach(registro => {
        const tr = document.createElement('tr');
        tr.className = 'registro-row';
        tr.innerHTML = `
                <td>${new Date(registro.data).toLocaleDateString()}</td>
                <td>${registro.hora}</td>
                <td>${registro.cliente}</td>
                <td>${registro.descricao}</td>
                <td class="${(registro.contrato == "Sim" ? "text-primary" : "")}">
                    ${registro.contrato}
                </td>
                <td class="${(registro.urgencia == "Alta" ? "text-danger" : registro.urgencia == "Média" ? "text-warning" : registro.urgencia == "Baixa" ? "text-success" : "")}" >
                    ${registro.urgencia}
                </td>
                <td class="${(registro.status == "Concluído" ? "text-success" : "")}">
                    ${registro.status}
                </td>
                <td>
                        <a onClick="ModalDeletarChamado(${registro.Id})">
                            <img src="/img/excluir.png" style="width:20px" />
                        </a>
                    </td>
            `;
        resultsList.appendChild(tr);
    })
};


function sortTableRegistros(columnIndex) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.querySelector(".registrosTable");
    switching = true;
    dir = "desc"; // Começa com ordenação decrescente por padrão

    while (switching) {
        switching = false;
        rows = table.querySelectorAll(".registro-row");

        for (i = 0; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].querySelectorAll("td")[columnIndex];
            y = rows[i + 1].querySelectorAll("td")[columnIndex];

            if (columnIndex === 0) { // Se a coluna for a de Data
                var dateX = new Date(x.textContent.split('/').reverse().join('-'));
                var dateY = new Date(y.textContent.split('/').reverse().join('-'));
                if (dir == "asc") {
                    if (dateX > dateY) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (dateX < dateY) {
                        shouldSwitch = true;
                        break;
                    }
                }
            } else {
                if (dir == "asc") {
                    if (x.textContent.toLowerCase() > y.textContent.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (x.textContent.toLowerCase() < y.textContent.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "desc") {
                dir = "asc";
                switching = true;
            }
        }
    }
}

// Chama a função sortTable para ordenar a tabela pela coluna de Data em ordem decrescente ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
    sortTableRegistros(0); // Ordena inicialmente pela coluna de Data

    function parseDate(dateString) {
        var dateParts = dateString.split('/');
        return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
    }

    function sortTableRegistros(columnIndex) {
        var table = document.querySelector(".registrosTable");
        var tbody = table.querySelector(".registros-list");
        var rows = Array.from(tbody.querySelectorAll(".registro-row")); // Converte NodeList para Array

        rows.sort(function (a, b) {
            var dateA = parseDate(a.cells[columnIndex].textContent.trim());
            var dateB = parseDate(b.cells[columnIndex].textContent.trim());
            return dateB - dateA; // Ordena decrescentemente pela data
        });

        rows.forEach(function (row) {
            tbody.appendChild(row); // Reinsere as linhas na ordem ordenada
        });
    }
});

function parseDate(dateString) {
    var dateParts = dateString.split('/');
    return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
}

function refreshPage() {
    location.reload();
}