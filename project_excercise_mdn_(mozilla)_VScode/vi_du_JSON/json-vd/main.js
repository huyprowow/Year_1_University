const header = document.querySelector('header');
const section = document.querySelector('section');
//tao bien chua link chua url json
let requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';

//tao doi tuong thuc hien yeu cau
let request = new XMLHttpRequest();

//mo yeu cau bang phuong thuc get
request.open('GET', requestURL);

//xac dinh kieu phan hoi, gui yeu cau
request.responseType = 'json';
request.send();

//doi lay data tu request ve va xu ly
request.onload = function () {
    const superHeroes = request.response;
    populateHeader(superHeroes);
    showHeroes(superHeroes);
}

function populateHeader(obj) {
    //tao h1,dat data chen vao header
    const myH1 = document.createElement('h1');
    myH1.textContent = obj['squadName'];
    header.appendChild(myH1);
    //tao p,dat data chen vao header
    const myPara = document.createElement('p');
    myPara.textContent = 'Hometown: ' + obj['homeTown'] + ' // Formed: ' + obj['formed'];
    header.appendChild(myPara);
}

function showHeroes(obj) {
    //luu tru thuoc tinh cua doi tuong js ma request json tra ve trong 1 bien moi
    const heroes = obj['members'];
    //lap qua tung dt trong mang heroes
    for (let i = 0; i < heroes.length; i++) {
        //tao 1 so phan tu moi
        const myArticle = document.createElement('article');
        const myH2 = document.createElement('h2');
        const myPara1 = document.createElement('p');
        const myPara2 = document.createElement('p');
        const myPara3 = document.createElement('p');
        const myList = document.createElement('ul');
        //them noi dung cho phan tu
        myH2.textContent = heroes[i].name;
        myPara1.textContent = 'Secret identify: ' + heroes[i].secretIdentify;
        myPara2.textContent = 'Age: ' + heroes[i].age;
        myPara3.textContent = 'Superpower:';
        //tao va lap qua tung dt trong mang power cua hreroes thu i
        const superPowers = heroes[i].powers;
        for (let j = 0; j < superPowers.length; j++) {
            //tao ra tung phan tu li, gan noi dung cho no la nhung superPower(liet ke superPower cua heroes)
            const listItem = document.createElement('li');
            listItem.textContent = superPowers[j];
            myList.appendChild(listItem);
        }
        //chen cac ptu vao article
        myArticle.appendChild(myH2);
        myArticle.appendChild(myPara1);
        myArticle.appendChild(myPara2);
        myArticle.appendChild(myPara3);
        myArticle.appendChild(myList);
        //chen article vao the section
        section.appendChild(myArticle);

    }
}