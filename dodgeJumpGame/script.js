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


class Game {
     constructor(ctx, width, height){
          this.ctx = ctx;
          this.width = width;
          this.height = height;
          this.enemies = [];
          this.explosions = [];
          this.score = 0;
          this.gameOver = false;
          this.gameFrame = 0;
          this.gameSpeed = 1;
     }

     update() {
          this.enemies.forEach(enemy => {
               enemy.update();
          });

          this.enemies = this.enemies.filter(enemy => !enemy.shouldRemove);
          this.enemies = this.enemies.sort((a, b) => a.y - b.y);
          this.gameFrame++;
     }
     draw() {
          this.enemies.forEach(enemy => {
               enemy.draw(this.ctx);
          });
     }

     addEnemy(Enemy){
          this.enemies.push(new Enemy(this));
     }

     showGameOver(){
          ctx.fillStyle = "black";
          ctx.textAlign = "center";
          ctx.font = "50px Impact";
          ctx.fillText("Game Over, your score is: " + this.score, CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
          ctx.fillStyle = "white";
          ctx.fillText("Game Over, your score is: " + this.score, CANVAS_WIDTH/2 + 5, CANVAS_HEIGHT/2 + 5);
     }

     showScore(){
          ctx.fillStyle = "black";
          ctx.font = "50px Impact";
          ctx.fillText("Score: " + this.score, 50, 75);
          ctx.fillStyle = "white";
          ctx.fillText("Score: " + this.score, 55, 80);
     }
}



class Enemy {
     constructor(game) {
          this.spriteHeight;
          this.spriteWidth;
          // this.x = CANVAS_WIDTH/2 + Math.random() * CANVAS_WIDTH/2 - CANVAS_WIDTH/4;
          this.x = game.width + Math.random() * 5;
                  // Define movement boundaries
          this.minY = 100;  // Top boundary
          this.maxY = game.height - this.spriteHeight - 100;  // Bottom boundary
          
          // Start within boundaries
          this.y = this.minY + Math.random() * (this.maxY - this.minY);
          
          
          this.spriteFrame = 0;
          this.image = enemyImage;
          this.speedModifier = Math.random() * 5 ;
          this.speed = Math.floor(game.gameSpeed * this.speedModifier);
          this.angle = Math.random() * 10;
          this.frameSpeed;
          this.maxFrame;
          this.color = [ Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];

          this.shouldRemove = false;
          this.game = game;
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
          if (this.game.gameFrame % this.frameSpeed === 0) {
               this.spriteFrame >= this.maxFrame ? this.spriteFrame = 0 : this.spriteFrame++;
          }

          if (this.x + this.spriteWidth < 0) this.game.gameOver = true;
     }

     draw(ctx) {
          collisionCtx.fillStyle = "rgb(" + this.color[0] + "," + this.color[1] + "," + this.color[2] + ")";

          // collisionCtx.strokeStyle = "red";      // border color
          // collisionCtx.lineWidth = 3;            // border thickness
          collisionCtx.fillRect(this.x, this.y, this.spriteWidth, this.spriteHeight);
          
          ctx.drawImage(this.image, this.spriteFrame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, 
               this.x, this.y, this.spriteWidth, this.spriteHeight);
     }
}

class Warrior extends Enemy {
     constructor(game) {
          super(game);
          this.image = warrior;
          this.spriteWidth = 192;
          this.spriteHeight = 192;
          this.x = game.width + Math.random() * 5;
          this.y = game.height - this.spriteHeight - 20;

          this.speedModifier = Math.random() * 3 ;
          this.speed = Math.floor(this.game.gameSpeed * this.speedModifier);
          this.frameSpeed = Math.floor(Math.random() * 10 + 5);
          this.maxFrame = 6;
          // this.color = [ Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
          this.game = game;
     }

     update() {
          this.x = this.x - this.speed;

          if (this.x + this.spriteWidth < 0) this.shouldRemove = true;

          if (this.game.gameFrame % this.frameSpeed === 0) {
               this.spriteFrame >= this.maxFrame - 1 ? this.spriteFrame = 0 : this.spriteFrame++;
          }

          if (this.x + this.spriteWidth < 0) this.game.gameOver = true;
     }
}

class Skull extends Enemy {
     constructor(game) {
          super(game);
          this.image = skull;
          this.spriteWidth = 96;
          this.spriteHeight = 112;
          this.x = game.width + Math.random() * 5;
          this.minY = 100;  // Top boundary
          this.maxY = CANVAS_HEIGHT - this.spriteHeight - 100;  // Bottom boundary
          
          // Start within boundaries
          this.y = this.minY + Math.random() * (this.maxY - this.minY);
          
          this.speedModifier = Math.random() * 3 ;
          this.speed = Math.floor(this.game.gameSpeed * this.speedModifier);
          this.angle = Math.random() * 10;
          this.frameSpeed = Math.floor(Math.random() * 10 + 5);
          this.maxFrame = 6;
          // this.color = [ Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
          this.game = game;
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
          if (this.game.gameFrame % this.frameSpeed === 0) {
               this.spriteFrame >= this.maxFrame - 1 ? this.spriteFrame = 0 : this.spriteFrame++;
          }

          if (this.x + this.spriteWidth < 0) this.game.gameOver = true;
     }
}

const explsionImage = new Image();
explsionImage.src = "explosion.png";

class Explosion {
     constructor(x, y) {
          this.spriteWidth = 48;
          this.spriteHeight = 48;
          this.x = x - this.spriteWidth;
          this.y = y - this.spriteHeight;
          this.spriteFrame = 0;
          this.image = explsionImage;
          this.frame = 0;
          this.totalSpriteFrame = 5;
          this.sound =  new Audio("Fire impact 1.wav");
     }

     update() {
          if (this.frame == 0) this.sound.play();
          this.frame++;
          if (this.frame % 5 == 0) this.spriteFrame++;
     }

     draw() {
          ctx.drawImage(this.image, this.spriteFrame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, 
               this.x, this.y, this.spriteWidth * 2, this.spriteHeight * 2);
     }

     shouldRemove() {
          return this.spriteFrame > this.totalSpriteFrame;
     }


}

let explosions = [];
let canvasPosition = canvas.getBoundingClientRect();
// window.addEventListener("click", function(e) {
//      canvasPosition = canvas.getBoundingClientRect();
//      const detectPixelColor = collisionCtx.getImageData(e.x - canvasPosition.left, e.y - canvasPosition.top, 1, 1);
//      console.log(detectPixelColor);
//      const pc = detectPixelColor.data;

//      enemies.forEach((enemy) => {
//           // If hit enemy
//           if (enemy.color[0] === pc[0] && enemy.color[1] === pc[1] && enemy.color[2] === pc[2]){
//                enemy.shouldRemove = true;
//                explosions.push(new Explosion(e.x - canvasPosition.left, e.y - canvasPosition.top));
//                score++;
//           }
//      })
// })


let lastTime = 0;
let deltaTime;
let intervalTime = 0;
const enemyInterval = 1000;

let game = new Game(ctx, CANVAS_WIDTH, CANVAS_HEIGHT);

function animate(timeStamp) {
     deltaTime = timeStamp - lastTime;
     intervalTime += deltaTime;
     if (intervalTime > enemyInterval) {
          game.addEnemy(Skull);
          game.addEnemy(Warrior);
          intervalTime = 0;
     }
     lastTime = timeStamp;

     ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
     collisionCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
     
     game.update();
     game.draw();
     game.showScore();

     if (!game.gameOver) requestAnimationFrame(animate);
     else game.showGameOver();
}

animate(0);