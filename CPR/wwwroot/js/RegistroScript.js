// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

async function searchRegistros() {
    const query = document.getElementById('searchBarRegistro').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const url = new URL(`/Registro/SearchReg`, window.location.origin);
    if (query) url.searchParams.append('query', query);
    if (startDate) url.searchParams.append('startDate', startDate);
    if (endDate) url.searchParams.append('endDate', endDate);
    const response = await fetch(url);
    const registros = await response.json();
    displayPecaResults(chamados);
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
function displayPecaResults(chamados) {
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
                <td>${registro.contrato}</td>
                <td>${registro.urgencia}</td>
                <td>${registro.status}</td>
                <td>
                        <a onClick="ModalDeletarChamado(${registro.Id})">
                            <img src="/img/excluir.png" style="width:20px" />
                        </a>
                    </td>
            `;
        resultsList.appendChild(tr);
    })
};

function ModalDeletarRegistro(idChamado) {
    $.get("/Registro/ModalDeletarRegistro?id=" + idChamado, function (data) {
        $("#modalCPR").html(data);
        $("#modalDeletarRegistro").modal("show");
    });
}