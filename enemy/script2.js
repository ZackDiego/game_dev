const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = 1000;
const CANVAS_HEIGHT = canvas.height = 600;

const enemyImage = new Image();
enemyImage.src = "fire-skull.png";

let gameFrame = 0;
const gameSpeed = 1;


class Enemy {
     constructor() {
          this.spriteHeight = 112;
          this.spriteWidth = 96;
          this.x = CANVAS_WIDTH/2 + Math.random() * CANVAS_WIDTH/2 - CANVAS_WIDTH/4;
                  // Define movement boundaries
          this.minY = 100;  // Top boundary
          this.maxY = CANVAS_HEIGHT - this.spriteHeight - 100;  // Bottom boundary
          
          // Start within boundaries
          this.y = this.minY + Math.random() * (this.maxY - this.minY);
          
          
          this.spriteFrame = 0;
          this.image = enemyImage;
          this.speedModifier = Math.random() + 1 ;
          this.speed = Math.floor(gameSpeed * this.speedModifier);
          this.angle = Math.random() * 10;
          this.frameSpeed = Math.floor(Math.random() * 10 + 10);
     }

     update() {
          this.x = this.x - this.speed;

          if (this.x + this.spriteWidth < 0) this.x = CANVAS_WIDTH;
          
          // Calculate vertical movement
          let newY = this.y + Math.sin(this.angle) * 3;
          
          // Apply boundaries
          if (newY < this.minY) {
               newY = this.minY;
               this.angle = -this.angle;  // Bounce
          } else if (newY > this.maxY) {
               newY = this.maxY;
               this.angle = -this.angle;  // Bounce
          }
          
          this.y = newY;

          this.angle += 0.05;
          if (gameFrame % this.frameSpeed === 0) {
               this.spriteFrame > 6 ? this.spriteFrame = 0 : this.spriteFrame++;
          }
     }

     draw() {
          ctx.drawImage(this.image, this.spriteFrame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, 
               this.x, this.y, this.spriteWidth, this.spriteHeight);
     }
}


let enemyNumControl = document.getElementById("enemyNum");

let enemies = [];

initEnemies(enemyNumControl.value);

enemyNumControl.addEventListener("change", (e) => {
     enemyNum = e.target.value;
     initEnemies(enemyNum);
})



function initEnemies(enemyNum) {
     enemies = [];
     for (let i = 0; i < enemyNum; i++) {
          enemies.push(new Enemy());
     }
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