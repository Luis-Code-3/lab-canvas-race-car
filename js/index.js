const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const road = new Image();
road.src = "/images/road.png";

const car = new Image();
car.src = "/images/car.png"

const startingX = canvas.width/2 - 25;
const startingY = canvas.height - 125;

const player = {
  x: startingX,
  y: startingY,

  moveLeft: function() {
    this.x -= 5;
  },

  moveRight: function() {
    this.x += 5;
  },

  moveUp: function () {
    this.y -= 5;
  },

  moveDown: function () {
    this.y += 5;
  },

  draw: function() {
    ctx.drawImage(car, this.x, this.y, 50, 100);
  }

}

const obstaclesArray = [];

function createObstacle() {
  let intervalId = setInterval(() => {
    obstaclesArray.push(new Obstacle ());
  }, 2000);
}

class Obstacle {
  constructor() {
    this.x = Math.random() * 700;
    this.y = 0;
    this.width = 20 + Math.floor(Math.random() * 350);
    this.height = 20;
  }

  draw () {
    ctx.fillStyle = 'brown';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  newPosition() {
    this.y += 1;
  }

}

function updateCanvas() {
  ctx.clearRect(0, 0, 500, 700);
  ctx.drawImage(road, 0, 0, 500, 700);
  player.draw();

  for (let i = 0; i < obstaclesArray.length; i++) {
    obstaclesArray[i].draw();
    obstaclesArray[i].newPosition();
  }
}

function animationLoop() {
  let animationId = setInterval(() => {
    updateCanvas();
  }, 16);
}

function startGame() {
  console.log("game");
  ctx.drawImage(road, 0, 0, 500, 700);
  player.draw();
  createObstacle();
  animationLoop();
}


window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  document.addEventListener('keydown', e => {
    switch (e.keyCode) {
      case 38:
        player.moveUp();
        break;
      case 40:
        player.moveDown();
        break;
      case 37:
        player.moveLeft();
        break;
      case 39:
        player.moveRight();
        break;
    }
    updateCanvas();
  });
  
};
