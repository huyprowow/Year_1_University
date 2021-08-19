const rememberDiv = document.querySelector(".remember");
const forgetDiv = document.querySelector(".forget");
const form = document.querySelector("form");
const nameInput = document.querySelector("#entername");
const submitBtn = document.querySelector("#submitname");
const forgetBtn = document.querySelector("#forgetname");

const h1 = document.querySelector("h1");
const personalGreeting = document.querySelector(".personal");

//chan gui form
form.addEventListener("submit", function () {
  e.preventDefault();
});
//chay khi nut say hello dc nhap
submitBtn.addEventListener("click", function () {
  //luu ten vao web storage
  localStorage.setItem("name", nameInput.value);
  //chay ham nameDisplayCheck de ktra,hthi loi chao, bieu mau
  nameDisplayCheck();
});
//nhan vao nut quen(foget dung removeItem de xoa)
forgetBtn.addEventListener("click", function () {
  localStorage.removeItem("name");
  nameDisplayCheck();
});
//ktra ten trong storage, ht
function nameDisplayCheck() {
  //ktra neu ten co trong luu tru
  if (localStorage.getItem("name")) {
    let name = localStorage.getItem("name");
    h1.textContent = "Welcome, " + name; //chao
    personalGreeting.textContent =
      "Welcome to our website, " +
      name +
      "! We hope you have fun while you are here.";
    forgetDiv.style.display = "block";
    rememberDiv.style.display = "none";
  } else {
    //k co
    personalGreeting.textContent = //chao mac dinh
      "Welcome to our website. We hope you have fun while you are here.";
    forgetDiv.style.display = "none";
    rememberDiv.style.display = "block";
  }
}
//chay moi kh trang dc tai lai neu k se k ton tai sau moi lan tai
document.body.onload = nameDisplayCheck;
