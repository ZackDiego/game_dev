let playerState = "idle";

let enemyNum = document.getElementById("enemyNum");


enemyNum.addEventListener("change", (e) => {
     enemyNum = e.target.value;
     console.log(enemyNum);
})

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = 1000;
const CANVAS_HEIGHT = canvas.height = 600;

const enemyImage = new Image();
enemyImage.src = "ogre-walk.png";

let spriteWidth = 144;
let spriteHeight = 80;

let gameFrame = 0;
const gameSpeed = 10;

class Enemy {
     constructor() {
          this.x = CANVAS_WIDTH/2 + Math.random() * CANVAS_WIDTH/2 - CANVAS_WIDTH/4;
          this.y = CANVAS_HEIGHT/2 + Math.random() * CANVAS_HEIGHT/2 - CANVAS_HEIGHT/4;
          this.spriteFrame = 0;
          this.image = enemyImage;
          this.speedModifier = Math.random() + 1 ;
          this.speed = Math.floor(gameSpeed * this.speedModifier);
     }

     update() {
          if (gameFrame % this.speed === 0) {
               this.spriteFrame = Math.floor(gameFrame / this.speed) % 5;
               if (this.x < 0) this.x = CANVAS_WIDTH;
               else this.x--;
          }
     }

     draw() {
          ctx.drawImage(this.image, this.spriteFrame * spriteWidth, 0, spriteWidth, spriteHeight, 
               this.x, this.y, spriteWidth, spriteHeight);
     }
}

let enemies = [];

enemyNum = 10;
for (let i = 0; i < enemyNum; i++) {
     enemies.push(new Enemy());
}

function animate() {
     ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
     
     // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
     // ctx.drawImage(enemyImage, spriteFrame * spriteWidth, 0, spriteWidth, spriteHeight, 
     //      frameX, frameY, spriteWidth, spriteHeight);

     enemies.forEach(enemy => {
          enemy.update();
          enemy.draw();
     });
     
     gameFrame++;

     requestAnimationFrame(animate);
}

animate();