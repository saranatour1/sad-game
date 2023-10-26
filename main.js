import "./style.css";
import back from "./assets/back.png";
import front from "./assets/front.png";
import jump from "./assets/jump.png";
import move from "./assets/move.png";
import run from "./assets/run.png";
import jumpStart from "./assets/jump-start.png";
import obstacle1 from "./assets/obstacle1.png";
import obstacle2 from "./assets/obstacle2.png";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let xCenter = Math.floor(canvas?.width / 2);
let yCenter = Math.floor(canvas?.height / 2);

let lives = 3;
let collisionDetected = false;

const camera = {
  x: 0,
  y: 0,
};

const moveKey = {
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight",
  jump: " ", //space bar
};

const images = {
  front: new Image(64, 64),
  back: new Image(64, 64),
  jump: new Image(64, 64),
  move: new Image(64, 64),
  run: new Image(64, 64),
  jumpStart: new Image(64, 64),
};

images.front.src = front;
images.back.src = back;
images.jump.src = jump;
images.move.src = move;
images.run.src = run;
images.jumpStart.src = jumpStart;

let currentImage = images.front; // Set the initial image
let currentImageKey = "front";
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  xCenter = Math.floor(canvas?.width / 2);
  yCenter = Math.floor(canvas?.height / 2);
}

const obstacles = [
  { x: xCenter + 700, y: yCenter + 290, image: obstacle1 },
  { x: xCenter + 708, y: yCenter + 290, image: obstacle2 },
  { x: xCenter + 668, y: yCenter + 290, image: obstacle1 },
  { x: xCenter + 568, y: yCenter + 290, image: obstacle2 },
];

if (canvas) {
  resizeCanvas();
  window.addEventListener("resize", () => {
    resizeCanvas();
  });
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawLine() {
  const lineY = yCenter + Math.floor(currentImage.height / 2) + 18;
  // Draw the line
  ctx.beginPath();
  ctx.moveTo(0, lineY);
  ctx.lineTo(canvas.width, lineY);
  ctx.stroke();
}

function drawImageActualSize() {
  clearCanvas();
  drawLine();
  ctx.drawImage(
    currentImage,
    xCenter,
    yCenter,
    currentImage.width,
    currentImage.height
  );
}

function drawObstacles() {
  for (const obstacle of obstacles) {
    const obstacleImage = new Image(64, 64);
    obstacleImage.src = obstacle.image;
    ctx.drawImage(obstacleImage, obstacle.x, obstacle.y, 64, 64);
  }
}

function moveObstacles() {
  for (const obstacle of obstacles) {
    obstacle.x -= 5;
    if (obstacle.x <= 0) {
      obstacle.x = canvas?.width + Math.floor(Math.round(Math.random()) * 100);
    }
  }
}

function switchImage(imageKey) {
  currentImage = images[imageKey];
  drawImageActualSize();
}

function collisionDetection() {
  if (!collisionDetected) {
    for (const obstacle of obstacles) {
      const obstacleRight = obstacle.x + 64;
      const obstacleBottom = obstacle.y + 64;
      const characterRight = xCenter + currentImage.width / 2;
      const characterBottom = yCenter + currentImage.height / 2;

      if (
        xCenter - currentImage.width / 2 < obstacleRight &&
        characterRight > obstacle.x &&
        yCenter - currentImage.height / 2 < obstacleBottom &&
        characterBottom > obstacle.y
      ) {
        console.log("collision");
        lives--; 
        collisionDetected = true;
      }
    }
  }
}

function resetCollision() {

} 



function drawText() {
  ctx.font = "48px serif";
  ctx.fillText(`${camera.x}`, 10, 50);
  ctx.fillText(`Lives: ${lives}`, canvas?.width - 200, 50);
}

// shortcut keys
document.addEventListener("keydown", (e) => {
  if (e.key === moveKey.up || e.key === "w") {
    switchImage("back");
  }
  if (e.key === moveKey.down || e.key === "s") {
    currentImageKey = "front";
  }
  if (e.key === moveKey.left || e.key === "a") {
    currentImageKey = "move";
  }
  if (e.key === moveKey.right || e.key === "d") {
    camera.x += 5;
    if (currentImageKey === "run") {
      currentImageKey = "move";
    } else {
      currentImageKey = "run";
    }
    moveObstacles();
  }
  if (e.key === moveKey.jump || e.key === " ") {
    currentImageKey = "jump";
  }
});

document.addEventListener("keyup", (e) => {
  currentImageKey = "front";
  // resetCollision();
});

function animate() {

  switchImage(currentImageKey);

  drawObstacles();
  collisionDetection();
  drawText();
  requestAnimationFrame(animate);
}

animate();
