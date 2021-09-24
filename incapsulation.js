
// ---------------------------------------------------------------------------Incapsulation---

const canvas = document.querySelector("canvas");
const context = canvas.getContext('2d');


function Hero(x, y, width, height) {
  const heroImg = document.createElement('img');
  heroImg.src = 'myHero.png';

  let xDelta = 0;
  let yDelta = 0;

  this.update = () => {
    x += xDelta;
    y += yDelta;
  };

  this.render = () => {
    context.drawImage(heroImg, x, y, width, height);
  };

  this.goRight = () => {
    xDelta = 1;
  };

  this.goLeft = () => {
    xDelta = -1;
  };

  this.stop = () => {
    xDelta = 0;
  };
}

let data = {
  hero: new Hero(10, 10, 40, 40),
};

function update() {
  data.hero.update();
}

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height)
  data.hero.render();
}

function loop() {
  requestAnimationFrame(loop);
  update();
  render();
}

loop();

document.addEventListener("keydown", (evt) => {
  if (evt.code === "ArrowRight") {
    data.hero.goRight();
  } else if (evt.code === "ArrowLeft") {
    data.hero.goLeft();
  }
});

document.addEventListener("keyup", (evt) => {
  data.hero.stop();
});