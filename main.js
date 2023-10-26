import "./style.css";
import back from "./assets/back.png";
import front from "./assets/front.png";
import jump from "./assets/jump.png";
import move from "./assets/move.png";
import run from "./assets/run.png";
import jumpStart from "./assets/jump-start.png";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let xCenter = Math.floor(canvas?.width / 2);
let yCenter = Math.floor(canvas?.height / 2);

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

if (canvas) {
  resizeCanvas();
  window.addEventListener("resize", () => {
    resizeCanvas();
  });
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawImageActualSize() {
  clearCanvas();
  ctx.drawImage(
    currentImage,
    xCenter,
    yCenter,
    currentImage.width,
    currentImage.height
  );
}

function switchImage(imageKey) {
  currentImage = images[imageKey];
  drawImageActualSize();
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
    if (currentImageKey === "run") {
      currentImageKey = "move";
    } else {
      currentImageKey = "run";
    }
  }
  if (e.key === moveKey.jump || e.key === " ") {
    console.log("jump");
    currentImageKey = "jump";
  }
});

document.addEventListener("keyup", (e) => {
  console.log(e.key, "keyup");
  currentImageKey = "front";

});

function animate() {
  switchImage(currentImageKey);
  requestAnimationFrame(animate);
}

animate();
