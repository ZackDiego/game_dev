export class Game {
          constructor(ctx, width, height){
               this.ctx = ctx;
               this.width = width;
               this.height = height;
               this.enemies = [];
               this.player;
               this.explosions = [];
               this.score = 0;
               this.gameOver = false;
               this.gameFrame = 0;
               this.gameSpeed = 1;
          }

          update(deltaTime) {
               this.player.update(deltaTime);
               this.enemies.forEach(enemy => {
                    enemy.update(deltaTime);
               });

               this.enemies = this.enemies.filter(enemy => !enemy.shouldRemove);
               this.enemies = this.enemies.sort((a, b) => a.y - b.y);
               this.gameFrame++;
          }

          handleInput(inputHandler) {
               this.player.handleInput(inputHandler);
          }

          draw() {
               this.player.draw(this.ctx);
               this.enemies.forEach(enemy => {
                    enemy.draw(this.ctx);
               });
               this.showScore();
          }

          addEnemy(Enemy){
               this.enemies.push(new Enemy(this));
          }

          showGameOver(){
               this.ctx.fillStyle = "black";
               this.ctx.textAlign = "center";
               this.ctx.font = "50px Impact";
               this.ctx.fillText("Game Over, your score is: " + this.score, this.width/2, this.height/2);
               this.ctx.fillStyle = "white";
               this.ctx.fillText("Game Over, your score is: " + this.score, this.width/2 + 5, this.height/2 + 5);
          }

          showScore(){
               this.ctx.fillStyle = "black";
               this.ctx.font = "50px Impact";
               this.ctx.fillText("Score: " + this.score, 50, 75);
               this.ctx.fillStyle = "white";
               this.ctx.fillText("Score: " + this.score, 55, 80);
          }
     }