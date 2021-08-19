const inputs = document.querySelectorAll('input');;
const spans = document.querySelectorAll('span');
const lists = document.querySelectorAll('li');

let width, height, margin, padding;
let postAlert = document.getElementById("alert");

//ktra,gan gtri
inputs[0].addEventListener('change', function () {
    width = document.querySelector("#set-width").value;
    if (isNaN(width) || width < 0) {
        width = '';
        postAlert.textContent = "ban phai nhap mot so duong";
        postAlert.style.color = 'red';
    }

});
inputs[1].addEventListener('change', function () {
    height = document.querySelector("#set-height").value;
    if (isNaN(height) || height < 0) {
        height = '';
        postAlert.textContent = "ban phai nhap mot so duong";
        postAlert.style.color = 'red';
    }
});
inputs[2].addEventListener('change', function () {
    margin = document.querySelector("#set-margin").value;
    if (isNaN(margin) || margin < 0) {
        margin = '';
        postAlert.textContent = "ban phai nhap mot so duong";
        postAlert.style.color = 'red';
    }
});
inputs[3].addEventListener('change', function () {
    padding = document.querySelector("#set-padding").value;
    if (isNaN(padding) || padding < 0) {
        padding = '';
        postAlert.textContent = "ban phai nhap mot so duong";
        postAlert.style.color = 'red';
    }
});

//nhan nut
const btn = document.querySelector("button")

btn.addEventListener('click', function () {

    for (let i = 0; i < lists.length; i++) {
        lists[i].style.width = width + 'px';
        lists[i].style.height = height + 'px';
        lists[i].style.margin = margin + 'px';
        lists[i].style.padding = padding + 'px';
    }

    for (let i = 0; i < spans.length; i++) {
        spans[i].style.width = width + 'px';
        spans[i].style.height = height + 'px';
        spans[i].style.margin = margin + 'px';
        spans[i].style.padding = padding + 'px';

    }

});