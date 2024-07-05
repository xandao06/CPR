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
                <td>${chamado.contrato}</td>
                <td>${chamado.urgencia}</td>
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
    table = document.getElementById("chamadosTable");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.getElementsByTagName("TR");
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[columnIndex];
            y = rows[i + 1].getElementsByTagName("TD")[columnIndex];

            if (columnIndex === 0) { // Se a coluna for a de Data
                var dateX = new Date(x.innerHTML.split('/').reverse().join('-'));
                var dateY = new Date(y.innerHTML.split('/').reverse().join('-'));
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
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
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
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

// Chama a função sortTable para ordenar a tabela pela coluna de Data em ordem decrescente ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
    sortTable(0);
    var table = document.getElementById("chamadosTable");
    var rows = table.getElementsByTagName("TR");
    var switching = true;
    while (switching) {
        switching = false;
        for (var i = 1; i < rows.length - 1; i++) {
            var x = rows[i].getElementsByTagName("TD")[0];
            var y = rows[i + 1].getElementsByTagName("TD")[0];
            var dateX = new Date(x.innerHTML.split('/').reverse().join('-'));
            var dateY = new Date(y.innerHTML.split('/').reverse().join('-'));
            if (dateX < dateY) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                break;
            }
        }
    }
});

// botão de refresh
function refreshPage() {
    location.reload();
}


////////////////////////////////////////////
// REGISTROS //

//async function searchRegistros() {
//    const query = document.getElementById('searchBarRegistro').value;
//    const startDate = document.getElementById('start-date').value;
//    const endDate = document.getElementById('end-date').value;
//    const url = new URL(`/Chamado/SearchReg`, window.location.origin);
//    if (query) url.searchParams.append('query', query);
//    if (startDate) url.searchParams.append('startDate', startDate);
//    if (endDate) url.searchParams.append('endDate', endDate);
//    const response = await fetch(url);
//    const registros = await response.json();
//    displayPecaResults(registros);
//};

////"Enter"
//function EnterRegistro(event) {
//    if (event.key === 'Enter') {
//        searchRegistros();
//    }
//};

////"lupa"
//function searchIconRegistros() {
//    document.getElementById('searchIconRegistros').addEventListener('click', function () {
//        searchRegistros();
//    })
//};

////Função pesquisa que mostra os resultados
//function displayPecaResults(chamados) {
//    const resultsList = document.getElementById('registros-list');
//    resultsList.innerHTML = '';
//    registros.forEach(registro => {
//        const tr = document.createElement('tr');
//        tr.className = 'registro-row';
//        tr.innerHTML = `
//                <td>${new Date(registro.data).toLocaleDateString()}</td>
//                <td>${registro.hora}</td>
//                <td>${registro.cliente}</td>
//                <td>${registro.descricao}</td>
//                <td>${registro.contrato}</td>
//                <td>${registro.urgencia}</td>
//                <td>${registro.status}</td>
//                <td>
//                        <a onClick="ModalDeletarChamado(${registro.Id})">
//                            <img src="/img/excluir.png" style="width:20px" />
//                        </a>
//                    </td>
//            `;
//        resultsList.appendChild(tr);
//    })
//};



////////////////////////////////
////// RELATORIO //////


// Criação de relatorio
async function searchReport() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const cliente = document.getElementById('cliente').value;
    const status = document.getElementById('status').value;
    const url = new URL(`/Chamado/Report`, window.location.origin);

    if (startDate) url.searchParams.append('startDate', startDate);
    if (endDate) url.searchParams.append('endDate', endDate);
    if (cliente) url.searchParams.append('cliente', cliente);
    if (status) url.searchParams.append('status', status);

    const response = await fetch(url);
    const reportData = await response.text();
    document.getElementById('container').innerHTML = reportData;
}


/////

function sortTableRegistros(columnIndex) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("registrosTable");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.getElementsByTagName("TR");
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[columnIndex];
            y = rows[i + 1].getElementsByTagName("TD")[columnIndex];

            if (columnIndex === 0) { // Se a coluna for a de Data
                var dateX = new Date(x.innerHTML.split('/').reverse().join('-'));
                var dateY = new Date(y.innerHTML.split('/').reverse().join('-'));
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
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
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
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

// Chama a função sortTable para ordenar a tabela pela coluna de Data em ordem decrescente ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
    sortTableRegistros(0);
    var table = document.getElementById("registrosTable");
    var rows = table.getElementsByTagName("TR");
    var switching = true;
    while (switching) {
        switching = false;
        for (var i = 1; i < rows.length - 1; i++) {
            var x = rows[i].getElementsByTagName("TD")[0];
            var y = rows[i + 1].getElementsByTagName("TD")[0];
            var dateX = new Date(x.innerHTML.split('/').reverse().join('-'));
            var dateY = new Date(y.innerHTML.split('/').reverse().join('-'));
            if (dateX < dateY) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                break;
            }
        }
    }
});