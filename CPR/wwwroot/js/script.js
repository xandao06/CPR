// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

function changeIcon(button) {
    var icon = button.querySelector('i');
    if (icon.classList.contains('bi-pencil-square')) {
        icon.classList.remove('bi-pencil-square');
        icon.classList.add('bi-exclamation-square-fill');
    } else {
        icon.classList.remove('bi-exclamation-square-fill');
        icon.classList.add('bi-pencil-square');
    }
}

document.getElementById('open-button').addEventListener('click', function () {
    document.getElementById('overlay').style.display = 'block';
});

document.getElementById('close-button').addEventListener('click', function () {
    document.getElementById('overlay').style.display = 'none';
});