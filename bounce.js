var canvas = document.getElementById('bounce');
var ctx = canvas.getContext("2d");

var height = canvas.height = window.innerHeight;
var width = canvas.width = window.innerWidth;

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, width, height); 

function random(min, max) {
    return (Math.random() * (max - min) + min);
}

class Shape{

    constructor(x, y, xspeed, yspeed, color, radius) {
        this.x = x;
        this.y = y;
        this.xspeed = xspeed;
        this.yspeed = yspeed;
        this.color = color;
        this.radius = radius;
    }


    update() {
        if (this.x >= width - this.radius || this.x <= 0 + this.radius) {
            this.xspeed = -(this.xspeed);

        } 

        if (this.y >= height - this.radius || this.y <= 0 + this.radius) {
            this.yspeed = -(this.yspeed);

        } 

        this.x += this.xspeed;
        this.y += this.yspeed;
    }


  ballBall(ball) {
        var dx = ball.x - this.x
        var dy = ball.y - this.y
        var distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        if (distance <= (this.radius + ball.radius)) {
            this.xspeed = this.xspeed * -1;
            this.yspeed = this.yspeed * -1;
            ball.xspeed = ball.xspeed * -1;
            ball.yspeed = ball.yspeed * -1

            while (distance <= (this.radius + ball.radius)) {
                this.x += this.xspeed;
                this.y += this.yspeed;
                dx = ball.x - this.x;
                dy = ball.y - this.y;
                distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

            }
        }
    }
}

class Ball extends Shape {

    constructor(x, y, xspeed, yspeed, color, radius) {
        super(x, y, xspeed, yspeed, color, radius);
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}


var balls = [];
while (balls.length < 8) {
    var radius = random(30, 60)
    var ball = new Ball(random(radius, width - radius), //xPos        
            random(radius, height - radius), //yPos
            random(15, -15), // xSpeed
            random(15, -15), // ySpeed
            //'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')', //color
            `rgb(${random(0,255)},${random(0,255)},${random(0,255)})`,
            radius //size
    );
             

balls.push(ball);
}


console.log(balls);

function animation() {
    
//Trails

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, width, height); 


for (i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        //balls[i].bounce();
    }
    requestAnimationFrame(animation);
}

animation();