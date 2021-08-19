// thiet lap canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d'); //tao doi tuong ve canh 2d

//thiet lap chieu cao rong
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

//tao tham chieu toi p, so luong bong
let para = document.querySelector('p');
let numberBall = 0;

// ham random so tu min den max
function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

//Shape,Ball ham tao voi class
/*
class Shape{
    constructor(x, y, velX, velY, exists){
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
    }
}

class Ball extends Shape {
    constructor(x, y, velX, velY, exists,color, size) {
        super(x, y, velX, velY, exists,);
        this.color = color;
        this.size = size;
    }
    
//define method draw for ball

    draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
};

// define ball update method

    update() {
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
};

// define ball collision detection

    collisionDetect() {
    for (let j = 0; j < balls.length; j++) {
        if (!(this === balls[j]) && balls[j].exists) {
            const dx = this.x - balls[j].x;
            const dy = this.y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
            }
        }
    }
};

}
*/
//ham tao hinh dang (lop cha cua qua bong vs ho den)
function Shape(x, y, velX, velY, exists) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
}
//ham tao qua bong
function Ball(x, y, velX, velY, exists, color, size) {
    Shape.call(this, x, y, velX, velY, exists);
    this.color = color;
    this.size = size;
}

//ke thua tu Shape
Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

//dinh nghia ham ve bong

Ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
};

// ham cap nhap(de qua bong tu di chuyen, den tuong(mep) thi bat lai)
Ball.prototype.update = function () {
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
};

// ham phat hien va chan qua bong

Ball.prototype.collisionDetect = function () {
    for (let j = 0; j < balls.length; j++) {
        if (!(this === balls[j]) && balls[j].exists) {
            const dx = this.x - balls[j].x;
            const dy = this.y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
            }
        }
    }
};


//dinh nghia ham tao evil circle(bong quy) (ho den an may qua bong)
function EvilCircle(x, y, exists) {
    Shape.call(this, x, y, 20, 20, exists);
    this.color = 'white';
    this.size = 10;
}

//ke thua tu Shape
EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;

//ham ve qua bong quy
EvilCircle.prototype.draw = function () {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
};

//kiem tra va k cho qua bong quy (ho den) ra khoi bien
EvilCircle.prototype.checkBounds = function () {
    if ((this.x + this.size) >= width) {
        this.x -= this.size;
    }

    if ((this.y + this.size) >= height) {
        this.y -= this.size;
    }

    if ((this.x - this.size) <= 0) {
        this.x += this.size;
    }

    if ((this.y - this.size) <= 0) {
        this.y += this.size;
    }
};

//dinh nghia phim dieu khien cho bong quy
EvilCircle.prototype.setControls = function () {
    let _this = this;
    window.onkeydown = function (e) {
        if (e.key === 'a') {
            _this.x -= _this.velX;
        }

        if (e.key === 'd') {
            _this.x += _this.velX;
        }

        if (e.key === 'w') {
            _this.y -= _this.velY;
        }

        if (e.key === 's') {
            _this.y += _this.velY;
        }
    }
};

EvilCircle.prototype.collisionDetect = function () {
    for (let i = 0; i < balls.length; i++) {
        if (balls[i].exists) {
            const dx = this.x - balls[i].x;
            const dy = this.y - balls[i].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < this.size + balls[i].size) {
                balls[i].exists = false;
                numberBall--;
                para.textContent = 'Ball count(so luong bong): ' + numberBall;
                //k pop dc
                //balls.pop(ball[i]);
            }
        }

    }
};

//tao bong, mang luu tru may qua bong 

let balls = [];

while (balls.length < 25) {
    const size = random(10, 20);
    let ball = new Ball(
        // ball position always drawn at least one ball width
        // away from the edge of the canvas, to avoid drawing errors
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        true,
        'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
        size
    );
    balls.push(ball);
    numberBall++;
    para.textContent = 'Ball count(so luong bong): ' + numberBall;
}

//tao ho den tu EvilCircle
let blackHole = new EvilCircle(random(10, width - 10), random(10, height - 10), true);

//thiet lap phim dieu khien
blackHole.setControls();

//lap de ve tung khung animation (draw scene)
function loop() {
    ctx.fillStyle = 'rgba(0,0,0,0.25)'; //che di khung truoc va de lai vet cua qua bong
    ctx.fillRect(0, 0, width, height); //tao khung moi de len ban ve khung cu

    for (let i = 0; i < balls.length; i++) {
        //ktra neu qua bong ton tai (chua va cham voi ho den) moi ve
        if (balls[i].exists) {
            balls[i].draw();
            balls[i].update();
            balls[i].collisionDetect();
        }
        //tao ho den 
    }
    blackHole.draw();
    blackHole.checkBounds();
    blackHole.collisionDetect();

    //de quy de ve bong, ve ho den, chuyen dong qua bong
    requestAnimationFrame(loop);
}
//goi ham de bat dau
loop();