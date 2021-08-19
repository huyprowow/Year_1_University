//ktao
const spinner = document.querySelector('.spinner p');
const spinnerContainer = document.querySelector('.spinner');
let rotateCount = 0;
let startTime = null;
let rAF;
const btn = document.querySelector('button');
const result = document.querySelector('.result');
//an kqua va nut spinner
result.style.display = 'none';
spinnerContainer.style.display = 'none';
//radom giua min,max
function random(min, max) {
    let num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}
//xoay spinner
function draw(timestamp) {
    if (!startTime) {
        startTime = timestamp;
    }

    rotateCount = (timestamp - startTime) / 3;

    rotateCount %= 360;

    spinner.style.transform = 'rotate(' + rotateCount + 'deg)';
    rAF = requestAnimationFrame(draw);
}
//thiet lap lai trang thai ban dau sau khi xong
function reset() {
    btn.style.display = 'block';
    result.textContent = '';
    result.style.display = 'none';
}
//nhan nut de bat dau
btn.addEventListener('click', start);

function start() {
    draw();
    spinnerContainer.style.display = 'block';
    btn.style.display = 'none';
    //5->10 goi setEndgame de ket thuc spiner , nguoi choi nhan nut,endgame
    setTimeout(setEndgame, random(5000, 10000));
}
//ket thuc hoat anh spin,bat dau, 2 nguoi choi an nut,ket qua ,end game
function setEndgame() {
    cancelAnimationFrame(rAF);
    spinnerContainer.style.display = 'none';
    result.style.display = 'block';

    reset.textContent = 'PLAYER GO!!';
    //xli sk xem nut nao nhan xuong
    document.addEventListener('keydown', keyHandler);
    //neu nut la a hoac l thoong bao kq, ket thuc ,reset
    function keyHandler(e) { //e truyen vao la phim vua nhan
        let isOver = false; ///tranh ket thuc khi nhan phim khac(nhan sai phim)
        console.log(e.key);
        if (e.key === "a") { //la a thuong A(shift+a) la 1 phim khac
            result.textContent = 'Player 1 won!!';
            isOver = true;
        } else if (e.key === "l") {
            result.textContent = 'Player 2 won!!';
            isOver = true;
        }
        if (isOver) {
            //bo xli keydown tranh hien nut start,roi tung len,...
            document.removeEventListener('keydown', keyHandler);
            setTimeout(reset, 5000);
        }
    }
}