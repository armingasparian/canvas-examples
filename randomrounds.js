
// ---------------------------------------------------------------------------Random - Rounds---

const canvas = document.querySelector("canvas");
const button = document.querySelector('button');
const context = canvas.getContext('2d');

let data = {
  balls: []
};

function update() {
  data.balls.forEach(function(ball) {
    ball.update();
  });
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  data.balls.forEach(function(ball) {
    ball.draw();
  });
}

function loop() {
  requestAnimationFrame(loop);
  update();
  draw();
}

loop();

function Ball() {
  this.r = random(10, 35);
  this.x = random(this.r, canvas.width - this.r);
  this.y = random(this.r, canvas.height - this.r);
  this.xDelta = random(-5, 5);
  this.yDelta = random(-5, 5);
  this.color = 'rgb('+random(0, 255)+', '+random(0, 255)+', '+random(0, 255)+')';
  button.style.background = this.color;
  canvas.style.borderColor = this.color;
  this.update = function() {
    if((this.x + this.r) > canvas.width || (this.x - this.r < 0)) {
      this.xDelta *= -1;
    }
    if((this.y + this.r) > canvas.height || (this.y - this.r < 0)) {
      this.yDelta *= -1;
    }
    this.x += this.xDelta;
    this.y += this.yDelta;
  }
  this.draw = function() {
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    context.fill();
    context.fillStyle = this.color;
  }
}

button.addEventListener('click', function() {
  const ball = new Ball();
  data.balls.push(ball);
})

function random(min, max) {
  return Math.floor(Math.random() * (max-min)) + min;
}