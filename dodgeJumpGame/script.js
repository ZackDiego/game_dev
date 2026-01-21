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

