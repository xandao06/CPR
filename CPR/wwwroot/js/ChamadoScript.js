// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

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
    if (query) url.searchParams.append('query', query);
    if (startDate) url.searchParams.append('startDate', startDate);
    if (endDate) url.searchParams.append('endDate', endDate);
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
                <td>${chamado.cliente}</td>
                <td>${chamado.descricao}</td>
                <td>${chamado.contrato}</td>
                <td>${chamado.urgencia}</td>
                <td>${chamado.status}</td>
            `;
        resultsList.appendChild(tr);
    })
};