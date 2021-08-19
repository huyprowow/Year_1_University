const startBtn = document.querySelector("#start_btn");
const stopBtn = document.querySelector("#stop_btn");
const resetBtn = document.querySelector("#reset_btn");
const para = document.querySelector(".clock");

let second = 0;
let createClock

function countSecond() {
    displayTime(second);
    second++;
}

/**
 * không thể đảm bảo rằng lệnh gọi lại sẽ kích hoạt
 * sau chính xác 1000mili giây. Một cách chính xác
 * hơn sẽ là chạy startTime = Date.now()để lấy dấu 
 * thời gian chính xác khi người dùng nhấp vào nút bắt đầu
 * và sau đó thực hiện Date.now() - startTime để 
 *lấy số mili giây sau khi nút bắt đầu được nhấp.
 
code:
startTime = Math.floor(Date.now()/1000);
second = Math.floor(Date.now()/1000) - startTime;
*/
function displayTime(second) {
    let h = Math.floor(second / 3600);
    let m = Math.floor((second - h * 3600) / 60);
    let s = second - h * 3600 - m * 60;
    // let h = Math.floor(second/3600);
    // let m = Math.floor((second % 3600)/60);
    // let s = Math.floor(second % 60)

    if (h < 10)
        h = "0" + h;
    if (m < 10)
        m = "0" + m;
    if (s < 10)
        s = "0" + s;

    para.textContent = h + ":" + m + ":" + s;
}

resetBtn.addEventListener("click", function () {
    second = 0;
    clearInterval(createClock);
    startBtn.disabled = false;
    countSecond(); //goi de thiet lap lai gio

});

startBtn.addEventListener("click", function () {
    createClock = setInterval(countSecond, 1000);
    startBtn.disabled = true;
});

stopBtn.addEventListener("click", function () {
    startBtn.disabled = false;
    clearInterval(createClock);
});

countSecond(); //goi 1 lan de hien dong ho