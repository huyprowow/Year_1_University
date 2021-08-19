const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Looping through images 

// code nay khong toi uu code minh viet nhu shit
for (let i = 0; i < 5; i++) {
    let srcPicSet = '';
    const newImage = document.createElement('img');
    switch (i) {
        case 0:
            srcPicSet = '/gallery-start/images/pic1.jpg';
            break;
        case 1:
            srcPicSet = '/gallery-start/images/pic2.jpg';
            break;
        case 2:
            srcPicSet = '/gallery-start/images/pic3.jpg';
            break;
        case 3:
            srcPicSet = '/gallery-start/images/pic4.jpg';
            break;
        case 4:
            srcPicSet = '/gallery-start/images/pic5.jpg';
            break;
    }
    newImage.setAttribute('src', srcPicSet);
    newImage.onclick = function () {
        displayedImage.setAttribute('src', srcPicSet);
    };
    thumbBar.appendChild(newImage);
}
*/
for (let i = 1; i <= 5; i++) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', '/gallery-start/images/pic' + i + '.jpg');
    thumbBar.appendChild(newImage);
    newImage.onclick = function (e) {
        displayedImage.src = e.target.src;
    }
}
/* Wiring up the Darken/Lighten button */

btn.onclick = function () {
    const nameBtn = btn.getAttribute('class');
    if (nameBtn === 'dark') {
        btn.setAttribute('class', 'light');
        btn.textContent = 'Lighten';
        overlay.style.backgroundColor = 'rgb(0,0,0,0.5)';
    } else {
        btn.setAttribute('class', 'dark');
        btn.textContent = 'Darken';
        overlay.style.backgroundColor = 'rgb(0,0,0,0)';
    }
}