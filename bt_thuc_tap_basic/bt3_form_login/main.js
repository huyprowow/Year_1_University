const formReset = document.querySelector('#form-reset');
const formLogin = document.querySelector('#form-login');

//dang nhap
const user = document.querySelector('#username');
const password = document.querySelector('#password');
let userValue, passwordValue;
let presentUser = presentPassword = "admin";
user.addEventListener('change', function () {
    userValue = user.value;
});

password.addEventListener('change', function () {
    passwordValue = password.value;
});

let loginBtn = document.querySelector('#btn-login');
loginBtn.addEventListener('click', function () {
    if (userValue === presentUser && passwordValue === presentPassword) {
        document.body.removeChild(formLogin);
        // formLogin.style.display='none';

        //thong bao dang nhap thanh cong
        let postAlert = document.createElement('h1');
        postAlert.textContent = "Login success!";
        postAlert.style.textAlign = "center";
        document.body.appendChild(postAlert);
    } else {
        let postAlert = document.querySelector('#posAlert1');
        postAlert.textContent = "tai khoan hoac mat khau sai";
        postAlert.style.textAlign = "center";
        postAlert.style.color = 'red';
    }
});

//xoa form

const btnClearLogin = document.querySelector('#clear');
const btnClearForgot = document.querySelector('#clear2');

btnClearLogin.addEventListener('click', function () {
    document.body.removeChild(formLogin);
    // formLogin.style.display='none';

});
btnClearForgot.addEventListener('click', function () {
    document.body.removeChild(formReset);
    // formReset.style.display='none';

});

//reset mk;
const oldPassword = document.querySelector('#old-password');
const resetPassword = document.querySelector('#password-reset');

oldPassword.addEventListener('change', function () {
    passwordValue = oldPassword.value;
});

let newPassword;
resetPassword.addEventListener('change', function () {
    newPassword = resetPassword.value;
});

const changePassword = document.querySelector('a');
changePassword.addEventListener('click', change);

function change() {
    formLogin.style.display = 'none';
    formReset.style.display = 'block';

}
const btnReset = document.querySelector('#btn-reset');
btnReset.addEventListener('click', reset);

function reset() {
    if (passwordValue === presentPassword) {
        presentPassword = newPassword;

        document.body.removeChild(formReset);
        // formReset.style.display='none';

        formLogin.style.display = 'block';

        //thong bao doi mk thanh cong
        let postAlert = document.querySelector('#posAlert1');
        postAlert.textContent = "doi mat khau thanh cong";
        postAlert.style.textAlign = "center";
        postAlert.style.color = 'green';
    } else {
        let postAlert = document.querySelector('#posAlert2');
        postAlert.textContent = "mat khau khong dung";
        postAlert.style.textAlign = "center";
        postAlert.style.color = 'red';
    }
}