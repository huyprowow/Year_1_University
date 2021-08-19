const input = document.querySelector('.numberInput');
const para = document.querySelector('p');

function square(num) {
    return num * num;
}

function cubed(num) {
    return num * num * num;
}

function factorial(num) { //giai thua
    if (num < 0) {
        return undefined;
    }
    if (num == 0) {
        return 1;
    }
    let x = num - 1;
    while (x > 1) {
        num *= x;
        x--;
    }
    return num;
}

input.onchange = function () {
    const num = input.value;
    if (isNaN(num)) {
        para.textContent = 'you need enter a number!';

    } else {
        para.textContent = num + ' squared is ' + square(num) + '. ' +
            num + ' cubed is ' + cubed(num) + '. ' +
            num + ' factorial is ' + factorial(num) + '.'
    }
}