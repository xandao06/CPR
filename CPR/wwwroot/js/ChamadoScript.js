// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.



/////////// CHAMADOS /////////////


// Write your JavaScript code.

//function changeIcon(button) {
//    var icon = button.querySelector('i');
//    if (icon.classList.contains('bi-pencil-square')) {
//        icon.classList.remove('bi-pencil-square');
//        icon.classList.add('bi-exclamation-square-fill');
//    } else {
//        icon.classList.remove('bi-exclamation-square-fill');
//        icon.classList.add('bi-pencil-square');
//    }
//}

//document.getElementById('open-button').addEventListener('click', function () {
//    document.getElementById('overlay').style.display = 'block';
//});

//document.getElementById('close-button').addEventListener('click', function () {
//    document.getElementById('overlay').style.display = 'none';
//});


function ModalCriarChamado() {
        $.get("/Chamado/ModalCriarChamado", function (data) {
            $("#modalCPR").html(data);
            $("#modalCriarChamado").modal("show");
        });
};

function ModalEditarChamado(idChamado) {
    $.get("/Chamado/ModalEditarChamado?id=" + idChamado, function (data) {
        $("#modalCPR").html(data);
        $("#modalEditarChamado").modal("show");
    });
}

function ModalDeletarChamado(idChamado) {
    $.get("/Chamado/ModalDeletarChamado?id=" + idChamado, function (data) {
        $("#modalCPR").html(data);
        $("#modalDeletarChamado").modal("show");
    });
}

function ChamadoConcluido(idChamado) {
    $.get("/Chamado/ModalConcluirChamado?id=" + idChamado, function (data) {
        $("#modalCPR").html(data);
        $("#modalConcluir").modal("show");
    });
}

async function searchChamados() {
    const query = document.getElementById('searchBarChamado').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const url = new URL(`/Chamado/SearchCham`, window.location.origin);

    // Adicionar parâmetros apenas se estiverem preenchidos
    if (query.trim() !== '') url.searchParams.append('query', query.trim());
    if (startDate.trim() !== '') url.searchParams.append('startDate', startDate.trim());
    if (endDate.trim() !== '') url.searchParams.append('endDate', endDate.trim());

    const response = await fetch(url);
    const chamados = await response.json();
    displayPecaResults(chamados);
};

//"Enter"
function EnterChamado(event) {
    if (event.key === 'Enter') {
        searchChamados();
    }
};

//"lupa"
function searchIconChamados() {
    document.getElementById('searchIconChamados').addEventListener('click', function () {
        searchChamados();
    })
};

//Função pesquisa que mostra os resultados
function displayPecaResults(chamados) {
    const resultsList = document.getElementById('chamados-list');
    resultsList.innerHTML = '';
    chamados.forEach(chamado => {
        const tr = document.createElement('tr');
        tr.className = 'chamado-row';
        tr.innerHTML = `
                <td>${new Date(chamado.data).toLocaleDateString()}</td>
                <td>${chamado.hora}</td>
                <td>${chamado.cliente}</td>
                <td>${chamado.descricao}</td>
                <td class="${(chamado.contrato == "Sim" ? "text-primary" : "")}">
                    ${chamado.contrato}
                </td>
                <td class="${(chamado.urgencia == "Alta" ? "text-danger" : chamado.urgencia == "Média" ? "text-warning" : chamado.urgencia == "Baixa" ? "text-success" : "")}" >
                    ${chamado.urgencia}
                </td>
                <td>${chamado.status}</td>
                <td>
                        <a onClick="ChamadoConcluido(${chamado.Id})">
                           <img src = "/img/concluir.png" style = "width:20px" />
                        </a>
                        <a onClick="ModalEditarChamado(${chamado.Id})">
                            <img src="/img/editar.png" style="width:20px" />
                        </a>
                        <a onClick="ModalDeletarChamado(${chamado.Id})">
                            <img src="/img/excluir.png" style="width:20px" />
                        </a>
                    </td>
            `;
        resultsList.appendChild(tr);
    })
};


// garante filtragem por titulo da tabela e também que a pagina sempre inicie organizada por data de forma decrescente
function sortTableChamados(columnIndex) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.querySelector(".chamadosTable");
    switching = true;
    dir = "desc"; // Começa com ordenação decrescente por padrão

    while (switching) {
        switching = false;
        rows = table.querySelectorAll(".chamado-row");

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
    sortTableChamados(0); // Ordena inicialmente pela coluna de Data

    function parseDate(dateString) {
        var dateParts = dateString.split('/');
        return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
    }

    function sortTableChamados(columnIndex) {
        var table = document.querySelector(".chamadosTable"); 
        var tbody = table.querySelector(".chamados-list"); 
        var rows = Array.from(tbody.querySelectorAll(".chamado-row")); // Converte NodeList para Array

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

// botão de refresh
function refreshPage() {
    location.reload();
}


////////////////////////////////////////////
////// RELATORIO //////


function generateReportPDF(filterType) {
    const query = document.getElementById('searchBarChamado').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const url = new URL(`/Chamado/GenerateReportPDF`, window.location.origin);

    // Adicionar parâmetros apenas se estiverem preenchidos
    if (query.trim() !== '') url.searchParams.append('query', query.trim());
    if (startDate.trim() !== '') url.searchParams.append('startDate', startDate.trim());
    if (endDate.trim() !== '') url.searchParams.append('endDate', endDate.trim());
    url.searchParams.append('filterType', filterType);

    window.location.href = url.toString();
}


function generateReportExcel(filterType) {
    const query = document.getElementById('searchBarChamado').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const url = new URL(`/Chamado/GenerateReportExcel`, window.location.origin);

    if (query.trim() !== '') url.searchParams.append('query', query.trim());
    if (startDate.trim() !== '') url.searchParams.append('startDate', startDate.trim());
    if (endDate.trim() !== '') url.searchParams.append('endDate', endDate.trim());
    url.searchParams.append('filterType', filterType);

    window.location.href = url.toString();
}

$(document).ready(function () {
    // Toggle Submenu
    $('.dropdown-submenu a.dropdown-toggle').on("click", function (e) {
        var $submenu = $(this).next('.dropdown-menu');
        var $parent = $(this).parents('.dropdown-menu').first();

        $parent.find('.dropdown-menu').not($submenu).removeClass('show');
        $submenu.toggleClass('show');

        e.stopPropagation();
        e.preventDefault();
    });

    // Close all submenus when the main dropdown closes
    $('#mainDropdown').on('hidden.bs.dropdown', function () {
        $('.dropdown-submenu .dropdown-menu').removeClass('show');
        $('.dropdown-submenu').removeClass('show');
    });

    // Close all submenus when clicking outside
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.dropdown, .dropdown-menu').length) {
            $('.dropdown-submenu .dropdown-menu').removeClass('show');
        }
    });
});

/////

// atualização em tempo real

//var connection = new signalR.HubConnectionBuilder().withUrl("/notificationHub").build();

//connection.on("ReceiveMessage", function (message) {
//    console.log(message);
//    document.getElementById("output").innerHTML += "<p>" + message + "</p>";
//});

//connection.start().then(function () {
//    console.log("Conectado ao SignalR Hub.");
//}).catch(function (err) {
//    return console.error(err.toString());
//});

//function sendMessage(message) {
//    connection.invoke("SendMessage", message).catch(function (err) {
//        return console.error(err.toString());
//    });
//}
