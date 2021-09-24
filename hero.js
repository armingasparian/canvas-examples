
//----------------------------------------------------------------------------1---

// const canvas = document.querySelector("canvas");
// const context = canvas.getContext('2d');

// let data = {
//   x: 10,
//   y: 10,
//   width: 50,
//   height: 50,
//   fillStyle: "red"
// }

// let xDelta = 5;
// let yDelta = 5;

// function update() {
//   if(data.x + data.width > canvas.width || data.x < 0) {
//     xDelta *= -1;
//   } 
//   if(data.y + data.height > canvas.height || data.y < 0) {
//     yDelta *= -1;
//   } 
//   data.x = data.x + xDelta;
//   data.y = data.y + yDelta;
// }

// function draw() {
//   context.clearRect(0, 0, canvas.width, canvas.height);
//   context.fillStyle = data.fillStyle;
//   context.fillRect(data.x, data.y, data.width, data.height);
// }

// function loop() {
//   requestAnimationFrame(loop);
//   update();
//   draw();
// }

// loop();


//----------------------------------------------------------------------------2---


// const canvas = document.querySelector("canvas");
// const context = canvas.getContext('2d');
// const bgImg = document.createElement('img');
// bgImg.src = 'myImage.jpg';
// let data = {
//   xDelta: 0,
//   x: 10,
//   y: 10,
//   width: 50,
//   height: 50,
//   fillStyle: "white"
// }

// function update() {
//   data.x += data.xDelta;
// }

// function draw() {
//   context.clearRect(0, 0, canvas.width, canvas.height);
//   context.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
//   context.fillStyle = data.fillStyle;
//   context.fillRect(data.x, data.y, data.width, data.height);
// }

// function loop() {
//   requestAnimationFrame(loop);
//   update();
//   draw();
// }

// loop();

// document.addEventListener("keydown", function(evt) {
//   if(evt.code === "ArrowRight") {
//     data.xDelta = 1;
//   } else if(evt.code === "ArrowLeft") {
//     data.xDelta = -1;
//   }
// });
// document.addEventListener("keyup", function() {
//   data.xDelta = 0;
// });

//---------------------------------------------------------------------------3---

const canvas = document.querySelector("canvas");
const context = canvas.getContext('2d');
const bgImg = document.createElement('img');
const heroImg = document.createElement('img');
const starImg = document.createElement('img');
const airplainImg = document.createElement('img');
const audio = document.createElement('audio');

bgImg.src = 'myImage.jpg';
heroImg.src = 'myHero.png';
starImg.src = 'myStar.png';
airplainImg.src = 'myAirplain.png';
audio.src = 'laserSound.mp3';

let data = {
  hero: {
    xDelta: 0,
    yDelta: 0,
    x: 10,
    y: 80,
    width: 80,
    height: 80,
  },
  bullets: [],
  plains: []
};

function intersect(rect1, rect2) {
  const x = Math.max(rect1.x, rect2.x),
  num1 = Math.min(rect1.x + rect1.width, rect2.x + rect2.width),
  y = Math.max(rect1.y, rect2.y),
  num2 = Math.min(rect1.y + rect1.height, rect2.y + rect2.height);
  return (num1 >= x && num2 >= y); 
};

function update() {
  data.hero.x += data.hero.xDelta;
  data.hero.y += data.hero.yDelta;

  data.bullets.forEach(function(bullet) {
    data.plains.forEach(function(plain) {
        if(intersect(plain, bullet)) {
          bullet.deleteMe = true;
          plain.deleteMe = true;
        }
    });
  });

  data.bullets = data.bullets.filter(function(bullet) {
    return bullet.deleteMe !== true;
  });

  data.plains = data.plains.filter(function(plain) {
    return plain.deleteMe !== true;
  });

  data.bullets.forEach(function (bullet) {
    bullet.x += bullet.xDelta;
  });

  data.bullets = data.bullets.filter(function (bullet) {
    if (bullet.x > canvas.width) {
      return false;
    }
    else {
      return true;
    }
  });

  data.plains.forEach(function(plain){
    plain.x += plain.xDelta;
  })

  if(data.plains.length === 0) {
    data.plains.push({
      xDelta: -1,
      x: canvas.width - 70,
      y: data.hero.y + 25,
      width: 50,
      height: 50
    });
  }
}

function draw() {
  context.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
  context.drawImage(heroImg, data.hero.x, data.hero.y, data.hero.width, data.hero.height);

  data.bullets.forEach(function (bullet) {
    context.drawImage(starImg, bullet.x, bullet.y, bullet.width, bullet.height);
  });

  data.plains.forEach(function (plain) {
    context.drawImage(airplainImg, plain.x, plain.y, plain.width, plain.height);
  });
}

function loop() {
  requestAnimationFrame(loop);
  update();
  draw();
}

loop();

document.addEventListener("keydown", function (evt) {
  if (evt.code === "ArrowRight") {
    data.hero.xDelta = 1;
  } else if (evt.code === "ArrowLeft") {
    data.hero.xDelta = -1;
  } else {
    audio.currentTime = 0;
    audio.play();
    data.bullets.push({
      xDelta: 5,
      x: data.hero.x + data.hero.width,
      y: data.hero.y + data.hero.height / 2,
      width: 30,
      height: 20
    })
  }
});

document.addEventListener("keyup", function () {
  data.hero.xDelta = 0;
});