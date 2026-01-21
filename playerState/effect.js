const explsionImage = new Image();
     explsionImage.src = "explosion.png";

export  class Explosion {
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