//tham chieu Pt <video> và thanh điều khiển.
const media = document.querySelector("video");
const controls = document.querySelector(".controls");

//Các nút phát / tạm dừng, dừng, tua lại và tua đi
const play = document.querySelector(".play");
const stop = document.querySelector(".stop");
const rwd = document.querySelector(".rwd");
const fwd = document.querySelector(".fwd");

//Lớp bao bọc bộ đếm thời gian bên ngoài <div>, bộ đếm thời gian kỹ thuật số đọc <span>và bên trong <div>sẽ rộng hơn khi thời gian trôi qua.
const timerWrapper = document.querySelector(".timer");
const timer = document.querySelector(".timer span");
const timeBar = document.querySelector(".timer div");

//xoa dk trinh duyet mac dinh
media.removeAttribute("controls");
controls.style.visibility = "visible";

// phat/tam dung(pause)
play.addEventListener("click", playPauseMedia);

function playPauseMedia() {
  //sua loi phat va tam dung
  //nút phát / tạm dừng hoặc dừng được nhấn trong khi chức năng tua lại hoặc tua đi đang hoạt động, chúng sẽ không hoạt động. Làm cách nào để chúng tôi có thể khắc phục
  rwd.classList.remove("active");
  fwd.classList.remove("active");
  clearInterval(intervalRwd);
  clearInterval(intervalFwd);
  if (media.paused) {
    //ktra neu dug => doi icon phat va nguoc lai
    play.setAttribute("data-icon", "u");
    media.play();
  } else {
    play.setAttribute("data-icon", "P");
    media.pause();
  }
}

//dung(stop) video k co pt stop =>dung pause va dat currentTime=0
stop.addEventListener("click", stopMedia);
media.addEventListener("ended", stopMedia);

function stopMedia() {
  //sua loi phat va tam dung
  //nút phát / tạm dừng hoặc dừng được nhấn trong khi chức năng tua lại hoặc tua đi đang hoạt động, chúng sẽ không hoạt động. Làm cách nào để chúng tôi có thể khắc phục
  rwd.classList.remove("active");
  fwd.classList.remove("active");
  clearInterval(intervalRwd);
  clearInterval(intervalFwd);
  media.pause();
  media.currentTime = 0;
  play.setAttribute("data-icon", "P");
}

//tua
rwd.addEventListener("click", mediaBackward);
fwd.addEventListener("click", mediaForward);

let intervalFwd;
let intervalRwd;

//lui
function mediaBackward() {
  // clearInterval(intervalFwd); //xóa bất kỳ lớp và khoảng thời gian(inteval) nào được đặt trên chức năng tua đi nhanh
  // fwd.classList.remove("active");

  //classListlà một thuộc tính khá tiện dụng tồn tại trên mọi phần tử
  //nó chứa danh sách tất cả các lớp được đặt trên phần tử, cũng như các phương thức để thêm / xóa lớp, v
  if (rwd.classList.contains("active")) {
    //kiểm tra xem danh sách có chứa active lớp hay không
    rwd.classList.remove("active"); // xóa khoảng thời gian đã được đặt khi nút được nhấn lần đầu tiên
    clearInterval(intervalRwd);
    media.play();
  } else {
    rwd.classList.add("active"); //activelớp vào rwd
    //bằng một setInterval()cuộc gọi. Khi được gọi, setInterval()sẽ tạo ra một khoảng thời gian hoạt động, nghĩa là nó chạy hàm đã cho dưới dạng tham số đầu tiên sau mỗi x mili giây, trong đó x là giá trị của tham số thứ hai.
    //Vì vậy, ở đây chúng tôi đang chạy windBackward()chức năng này sau mỗi 200 mili giây - chúng tôi sẽ sử dụng chức năng này để cuộn ngược video liên tục. Để dừng setInterval()chạy, bạn phải gọi clearInterval(),
    //đặt cho nó tên xác định của khoảng thời gian cần xóa, trong trường hợp này là tên biến intervalRwd(xem lệnh clearInterval()gọi trước đó trong hàm).
    media.pause();
    intervalRwd = setInterval(windBackward, 200);
  }
}

function windBackward() {
  //có ít hơn 3 giây hay không, tức là nếu tua lại thêm 3 giây nữa thì thời gian đó sẽ trở lại thời điểm bắt đầu video.
  //Điều này sẽ gây ra hành vi lạ, vì vậy nếu trường hợp này xảy ra, chúng tôi dừng phát video bằng cách gọi stopMedia(),
  if (media.currentTime <= 3) {
    // rwd.classList.remove("active");
    // clearInterval(intervalRwd);
    stopMedia();
  } else {
    //Nếu thời gian hiện tại không nằm trong vòng 3 giây kể từ khi bắt đầu video, chúng tôi xóa ba giây so với thời gian hiện tại
    //bằng cách thực thi media.currentTime -= 3. Vì vậy, trên thực tế, chúng tôi đang tua lại video 3 giây, cứ sau 200 mili giây một lần.
    media.currentTime -= 3;
  }
}
//tien
function mediaForward() {
  // clearInterval(intervalRwd);
  // rwd.classList.remove("active");

  if (fwd.classList.contains("active")) {
    // fwd.classList.remove("active");
    // clearInterval(intervalFwd);
    media.play();
  } else {
    fwd.classList.add("active");
    media.pause();
    intervalFwd = setInterval(windForward, 200);
  }
}

function windForward() {
  if (media.currentTime >= media.duration - 3) {
    // fwd.classList.remove("active");
    // clearInterval(intervalFwd);
    stopMedia();
  } else {
    media.currentTime += 3;
  }
}

//udate tg da troi qua
//chạy một hàm để cập nhật hiển thị thời gian mỗi khi timeupdatesự kiện được kích hoạt trên <video>phần tử.
//Tần suất mà sự kiện này kích hoạt phụ thuộc vào trình duyệt của bạn, sức mạnh CPU, v.v.
media.addEventListener("timeupdate", setTime);
function setTime() {
  //tinh phu,giay
  let minutes = Math.floor(media.currentTime / 60);
  let seconds = Math.floor(media.currentTime - minutes * 60);
  let minuteValue;
  let secondValue;

  //neu<10 thi them 0 vao trc noi phut vs giay bang : vd 02:09
  if (minutes < 10) {
    minuteValue = "0" + minutes;
  } else {
    minuteValue = minutes;
  }

  if (seconds < 10) {
    secondValue = "0" + seconds;
  } else {
    secondValue = seconds;
  }

  let mediaTime = minuteValue + ":" + secondValue;
  timer.textContent = mediaTime; //hien thi tg

  //Chiều dài chúng ta nên đặt bên trong <div>được tính bằng cách
  //tính chiều rộng của phần bên ngoài trước tiên <div>(thuộc tính của bất kỳ phần tử nào clientWidthsẽ chứa chiều dài của nó),
  // sau đó nhân nó với giá trị HTMLMediaElement.currentTimechia cho tổng HTMLMediaElement.durationphương tiện.
  let barLength =
    timerWrapper.clientWidth * (media.currentTime / media.duration);
  timeBar.style.width = barLength + "px";
}
