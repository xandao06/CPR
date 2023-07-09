// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

function changeIcon() {
    var icon = document.getElementById('icon');

    if (icon.classList.contains('bi-pencil-square')) {
        icon.classList.remove('bi-pencil-square');
        icon.classList.add('bi-check-square');
    } else {
        icon.classList.remove('bi-check-square');
        icon.classList.add('bi-pencil-square');
    }
}