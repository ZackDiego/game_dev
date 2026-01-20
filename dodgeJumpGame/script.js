window.addEventListener('load', () => {
     const canvas = document.getElementById("canvas");
     const ctx = canvas.getContext("2d");
     const collisionCanvas = document.getElementById("collisionCanvas");
     const collisionCtx = collisionCanvas.getContext("2d");

     const CANVAS_WIDTH = canvas.width = 1000;
     const CANVAS_HEIGHT = canvas.height = 600;

     collisionCanvas.width = CANVAS_WIDTH;
     collisionCanvas.height = CANVAS_HEIGHT;

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

          update(deltaTime) {
               this.enemies.forEach(enemy => {
                    enemy.update(deltaTime);
               });

               this.enemies = this.enemies.filter(enemy => !enemy.shouldRemove);
               this.enemies = this.enemies.sort((a, b) => a.y - b.y);
               this.gameFrame++;
          }
          draw() {
               this.enemies.forEach(enemy => {
                    enemy.draw(this.ctx);
               });
               this.showScore();
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
               this.image;
               this.speedModifier = Math.random() * 5 ;
               this.speed = Math.floor(game.gameSpeed * this.speedModifier);
               this.angle = Math.random() * 10;
               this.frameSpeed;
               this.maxFrame;
               this.color = [ Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];

               this.shouldRemove = false;
               this.game = game;

               this.width = this.spriteWidth;
               this.height = this.spriteHeight;
          }

          update(deltaTime) {
               this.x = this.x - this.vx * deltaTime * 0.1;

               this.y = this.y + this.vy * deltaTime * 0.1;

               if (this.x + this.spriteWidth < 0) this.shouldRemove = true;

               if (this.game.gameFrame % this.frameSpeed === 0) {
                    this.spriteFrame >= this.maxFrame - 1 ? this.spriteFrame = 0 : this.spriteFrame++;
               }

               if (this.x + this.spriteWidth < 0) this.game.gameOver = true;
          }

          draw(ctx) {
               collisionCtx.fillStyle = "rgb(" + this.color[0] + "," + this.color[1] + "," + this.color[2] + ")";

               // collisionCtx.strokeStyle = "red";      // border color
               // collisionCtx.lineWidth = 3;            // border thickness
               collisionCtx.fillRect(this.x, this.y, this.width, this.height);
               
               ctx.drawImage(this.image, this.spriteFrame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, 
                    this.x, this.y, this.width, this.height);
          }
     }

     class Warrior extends Enemy {
          constructor(game) {
               super(game);
               this.image = warrior;
               this.spriteWidth = 192;
               this.spriteHeight = 192;
               this.x = game.width + Math.random() * 5;
               this.vx = this.game.gameSpeed * Math.random();
               this.y = game.height - this.spriteHeight - 20;
               this.vy = 0;

               this.speedModifier = Math.random() * 3 ;

               this.frameSpeed = Math.floor(Math.random() * 10 + 5);
               this.maxFrame = 6;
               // this.color = [ Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
               this.game = game;
               this.scale = 0.8;
               this.width = this.spriteWidth * this.scale;
               this.height = this.spriteHeight * this.scale;
          }

          update(deltaTime) {
               super.update(deltaTime);
          }
     }

     class Toad extends Enemy {
     constructor(game) {
          super(game);
          this.image = toad; // frog spritesheet
          this.spriteWidth = 80;
          this.spriteHeight = 64;

          this.x = game.width + Math.random() * 50;
          this.vx = this.game.gameSpeed * Math.random() * 2  * 0.1;
          this.groundY = CANVAS_HEIGHT - this.spriteHeight - 100;
          this.y = this.groundY;

          // physics
          this.vy = 0;
          this.gravity = 0.6;
          this.jumpStrength = -12;

          // animation
          this.spriteFrame = 2;
          this.frameTimer = 0;
          this.frameInterval = 10;

          this.state = "WAIT";
          this.waitTimer = 0;
          this.waitDuration = 60; // frames
               this.width = this.spriteWidth;
               this.height = this.spriteHeight;
     }

     update(deltaTime) {
               switch (this.state) {
               case "WAIT":
                    this.spriteFrame = this.frameTimer % 40 < 20 ? 2 : 3;
                    this.waitTimer++;

                    if (this.waitTimer > this.waitDuration) {
                         this.jump();
                    }
                    break;

               case "JUMP":
                    this.spriteFrame = 1;
                    this.vy += this.gravity;
                    this.y += this.vy * deltaTime * 0.1;
                    this.x -= this.vx * deltaTime;

                    if (this.vy > 0) this.state = "FALL";
                    break;

               case "FALL":
                    this.spriteFrame = 0;
                    this.vy += this.gravity;
                    this.y += this.vy * deltaTime * 0.1;
                    this.x -= this.vx * deltaTime;

                    if (this.y >= this.groundY) {
                         this.land();
                    }
                    break;
               }

               this.frameTimer++;
     }

     jump() {
          this.state = "JUMP";
          this.vy = this.jumpStrength;
          this.waitTimer = 0;
     }

     land() {
          this.y = this.groundY;
          this.vy = 0;
          this.state = "WAIT";
     }
     }


     class Skull extends Enemy {
          constructor(game) {
               super(game);
               this.image = skull;
               this.spriteWidth = 96;
               this.spriteHeight = 112;
               this.x = game.width + Math.random() * 5;
               this.vx = this.game.gameSpeed * Math.random() * 0.1;
               this.minY = 50;  // Top boundary
               this.maxY = game.height - this.spriteHeight - 200;
               
               // Start within boundaries
               this.y = this.minY + Math.random() * (this.maxY - this.minY);

               this.angle = Math.random() * 10;
               this.frameSpeed = Math.floor(Math.random() * 10 + 5);
               this.maxFrame = 6;
               // this.color = [ Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
               this.game = game;
               this.width = this.spriteWidth;
               this.height = this.spriteHeight;
          }

          update(deltaTime) {
               this.x = this.x - this.vx * deltaTime;

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

          update(deltaTime) {
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
               game.addEnemy(Toad);
               intervalTime = 0;
          }
          lastTime = timeStamp;

          ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
          collisionCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
          
          game.update(deltaTime);
          game.draw(ctx);


          if (!game.gameOver) requestAnimationFrame(animate);
          else game.showGameOver();
     }

     animate(0);
})

