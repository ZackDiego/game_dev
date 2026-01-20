let playerState = "idle";

const animationSelect = document.getElementById("animation");
animationSelect.addEventListener("change", (e) => {
     playerState = e.target.value;
})

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = "shadow_dog.png";

let spriteWidth = 575;
let spriteHeight = 523;

let frameX = 0;
let frameY = 0;

let gameFrame = 0;
const speed = 5;

const spriteAnimation = [];



const animationState = [
     {
          name: "idle",
          frames : 7
     },
     {
          name: "jump",
          frames : 7
     },
     {
          name: "fall",
          frames : 7
     },
     {
          name: "run",
          frames : 9
     },
     {
          name: "dizzy",
          frames : 11
     },
     {
          name: "sit",
          frames : 5
     },
          {
          name: "roll",
          frames : 7
     },
          {
          name: "bite",
          frames : 7
     },
     {
          name: "ko",
          frames : 14
     },
     {
          name: "get hit",
          frames : 4
     },
];

animationState.forEach((state, index) => {
     let frames = { loc: [] }
     for (let i = 0; i < state.frames; i++) {
          frames.loc.push({
               x: i * spriteWidth,
               y: index * spriteHeight
          })
     }
     spriteAnimation[state.name] = frames;
})
console.log(spriteAnimation);



function animate() {
     ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
     let position = Math.floor(gameFrame / speed) % spriteAnimation[playerState].loc.length;
     
     // ctx.fillRect(50, 50, 30, 30);
     // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
     ctx.drawImage(playerImage, spriteAnimation[playerState].loc[position].x, spriteAnimation[playerState].loc[position].y, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
     
     // if (gameFrame % speed === 0) {
     //      if (frameX < 6) frameX++;
     //      else frameX = 0;
     // }
     gameFrame++;

     requestAnimationFrame(animate);
}

animate();