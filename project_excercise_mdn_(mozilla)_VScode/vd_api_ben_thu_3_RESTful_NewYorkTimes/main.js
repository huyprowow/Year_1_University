// Defining a baseURL and key to as part of the request URL

const baseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
const key = "M8dNYgval0z2krpy6AbFpTPEpcrFIlKk";
let url;

// Grab references to all the DOM elements you'll need to manipulate

const searchTerm = document.querySelector(".search");
const startDate = document.querySelector(".start-date");
const endDate = document.querySelector(".end-date");
const searchForm = document.querySelector("form");

// This is never used
// const submitBtn = document.querySelector('.submit');

//2 nut phan trang
const nextBtn = document.querySelector(".next");
const previousBtn = document.querySelector(".prev");

//chen response
const section = document.querySelector("section");
const nav = document.querySelector("nav");

// an "Previous"/"Next" navigation khi bat day vi chua can
nav.style.display = "none";

// define the initial page number and status of the navigation being displayed
//dinh nghia so trang khoi tao va trang thait hanh dieu huong khi da dc hien ra
let pageNumber = 0;

// This is never used
// let displayNav = false;

// Event listeners to control the functionality
//trinh nghe sk submit goi submitSearch
searchForm.addEventListener("submit", submitSearch);

//de lam cac nut phan trang hoat dong => tang giam gia tri pageNumber
//sau do chay fetch lai voi gia tri moi dc bao gom trong tham so URL

// Điều này hoạt động vì API NYTimes chỉ trả về 10 kết quả cùng một lúc
//nếu có hơn 10 kết quả, nó sẽ trả về 10 (0-9) đầu tiên nếu page(tham số URL) được đặt thành 0
//(hoặc không được bao gồm - 0 là giá trị mặc định), 10 (10-19) tiếp theo nếu nó được đặt thành 1, v.v.

//dat trinh nghe sk cho 2 nut phan trang
nextBtn.addEventListener("click", nextPage);
previousBtn.addEventListener("click", previousPage);

//ham goi boi sk submit cua searchForm
function submitSearch(e) {
  pageNumber = 0; //dat lai so trang =0 sau do fetchResult
  fetchResults(e); //truyen vao e de ngan form submit
}

function fetchResults(e) {
  //chan viec gui bieu mau
  e.preventDefault();
  //dung chuoi de tap hop url day du ma ta thuc hien request
  //url co so(lay tu bien baseURL),key api(api-key(tham so URL) lay tu bien key)
  //so trang(page(tham so URL) lay tu pageNumber), cum tu tim kiem(q (tham so URL) lay tu searchTemp(text <input>))
  //loai tai lieu de tra ve ket qua(fq(tham so URL) trong th nay muon chung tra ve artice)
  url =
    baseURL +
    "?api-key=" +
    key +
    "&page=" +
    pageNumber +
    "&q=" +
    searchTerm.value +
    'fq=document_type:("article")';

  //validate form neu co gtri chung vao URL chi dinh trong tham so URL start_date va end_date
  if (startDate.value !== "") {
    url += "&begin_date=" + startDate.value;
  }
  if (endDate.value !== "") {
    url += "&end_date=" + endDate.value;
  }
  //Vì vậy, một URL hoàn chỉnh sẽ có dạng như sau:

  // https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=YOUR-API-KEY-HERE&page=0&q=cats
  // &fq=document_type:("article")&begin_date=20170301&end_date=20170312

  //fetch API
  fetch(url) //tim nap tu url
    .then((result) => result.json()) //chuyen ket qua tra ve thanh json
    .then((json) => displayResults(json)); //truyen json vao ham displayResults de hien thi
}

//hien thi du lieu
function displayResults(json) {
  //xoa het cac ptu con cu cua section
  while (section.firstChild) {
    section.removeChild(section.firstChild);
  }
  //gan articles bang json phan hoi(mang chua cac doi tuong dai
  //dien cho article (bai bao) dc tra ve)
  const articles = json.response.docs;

  //neu do dai ds cac bai viet(article.length)===10(toi da tren 1 trang)thi
  //hien thi thanh nav phan trang con k thi thoi vi cho nam tren cung trang
  if (articles.length === 10) {
    nav.style.display = "block";
  } else {
    nav.style.display = "none";
  }

  if (articles.length === 0) {
    //k co bai viet nao thi hien thi cho nguoi dung
    const para = document.createElement("p");
    para.textContent = "No result returned.";
    section.appendChild(para);
  } else {
    for (let i = 0; i < articles.length; i++) {
      //tao cac pt
      const article = document.createElement("article");
      const heading = document.createElement("h2");
      const link = document.createElement("a");
      const img = document.createElement("img");
      const para1 = document.createElement("p");
      const para2 = document.createElement("p");
      const clearfix = document.createElement("div"); //clear fix xoa float cua the con

      //dat bai bao hien tai thu (i) trong ds articles tra ve
      //json dung de lay du lieu
      let current = articles[i];
      console.log(current);

      //chen nd phu hop lay tu current vao cac pt
      link.href = current.web_url;
      link.textContent = current.headline.main;
      para1.textContent = current.snippet;
      para2.textContent = "Keywords: ";
      //lap qua tat ca key dc lien ket bai viet, chen vao ngay say key truoc
      //r append choi key vao para2
      for (let j = 0; j < current.keywords.length; j++) {
        const span = document.createElement("span");
        span.textContent += current.keywords[j].value + " ";
        para2.appendChild(span);
      }
      //neu co anh thi gan vao img bai viet hien thoi
      if (current.multimedia.length > 0) {
        img.src = "http://www.nytimes.com" + current.multimedia[0].url;
        img.alt = current.headline.main;
      }

      //clearfix xoa float the con
      clearfix.setAttribute("class", "clearfix");

      article.appendChild(heading);
      heading.appendChild(link);
      article.appendChild(img);
      article.appendChild(para1);
      article.appendChild(para2);
      article.appendChild(clearfix);
      section.appendChild(article);
    }
  }
}

//ham phan trang
function nextPage(e) {
  pageNumber++; //tang page
  fetchResults(e); //goi fetch lai vs url page moi
}
function previousPage(e) {
  if (pageNumber > 0) {
    pageNumber--;
  } else {
    return;
  }
  fetchResults(e);
}
