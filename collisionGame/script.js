const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const collisionCanvas = document.getElementById("collisionCanvas");
const collisionCtx = collisionCanvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = 1000;
const CANVAS_HEIGHT = canvas.height = 600;

collisionCanvas.width = CANVAS_WIDTH;
collisionCanvas.height = CANVAS_HEIGHT;

const enemyImage = new Image();
enemyImage.src = "fire-skull.png";

let gameFrame = 0;
const gameSpeed = 1;


class Enemy {
     constructor() {
          this.spriteHeight = 112;
          this.spriteWidth = 96;
          // this.x = CANVAS_WIDTH/2 + Math.random() * CANVAS_WIDTH/2 - CANVAS_WIDTH/4;
          this.x = CANVAS_WIDTH + Math.random() * 5;
                  // Define movement boundaries
          this.minY = 100;  // Top boundary
          this.maxY = CANVAS_HEIGHT - this.spriteHeight - 100;  // Bottom boundary
          
          // Start within boundaries
          this.y = this.minY + Math.random() * (this.maxY - this.minY);
          
          
          this.spriteFrame = 0;
          this.image = enemyImage;
          this.speedModifier = Math.random() * 5 ;
          this.speed = Math.floor(gameSpeed * this.speedModifier);
          this.angle = Math.random() * 10;
          this.frameSpeed = Math.floor(Math.random() * 10 + 10);

          this.color = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")";

          this.shouldRemove = false;
     }

     update() {
          this.x = this.x - this.speed;

          if (this.x + this.spriteWidth < 0) this.shouldRemove = true;
          
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
          collisionCtx.fillStyle = this.color;

          collisionCtx.strokeStyle = "red";      // border color
          collisionCtx.lineWidth = 3;            // border thickness
          collisionCtx.fillRect(this.x, this.y, this.spriteWidth, this.spriteHeight);
          
          ctx.drawImage(this.image, this.spriteFrame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, 
               this.x, this.y, this.spriteWidth, this.spriteHeight);
     }
}


let enemyNumControl = document.getElementById("enemyNum");

let enemies = [];

// initEnemies(enemyNumControl.value);

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

let lastTime = 0;
let deltaTime;
let intervalTime = 0;
const enemyInterval = 1000;

function animate(timeStamp) {
     deltaTime = timeStamp - lastTime;
     intervalTime += deltaTime;

     if (intervalTime > enemyInterval){
          enemies.push(new Enemy());
          intervalTime = 0;
     }
     lastTime = timeStamp;

     ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
     collisionCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

     enemies = enemies.filter(enemy => !enemy.shouldRemove);
     enemies.forEach(enemy => {
          enemy.update();
          enemy.draw();
     });
     
     gameFrame++;

     requestAnimationFrame(animate);
}

animate(0);