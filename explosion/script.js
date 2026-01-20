

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = 1000;
const CANVAS_HEIGHT = canvas.height = 600;

const image = new Image();
image.src = "spritesheet.png";

let spriteWidth = 48;
let spriteHeight = 48;
const gameSpeed = 3;


class Explosion {
     constructor(x, y) {
          this.x = x - spriteWidth/2;
          this.y = y - spriteHeight/2;
          this.spriteFrame = 0;
          this.image = image;
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
          ctx.drawImage(this.image, this.spriteFrame * spriteWidth, 0, spriteWidth, spriteHeight, 
               this.x, this.y, spriteWidth, spriteHeight);
     }

     shouldRemove() {
          return this.spriteFrame > this.totalSpriteFrame;
     }
}

let explosions = [];
let canvasPosition = canvas.getBoundingClientRect();
window.addEventListener("click", function(e) {
     explosions.push(new Explosion(e.x - canvasPosition.left, e.y - canvasPosition.top));
     console.log(explosions);
})


function animate() {
     ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
     
     // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
     // ctx.drawImage(enemyImage, spriteFrame * spriteWidth, 0, spriteWidth, spriteHeight, 
     //      frameX, frameY, spriteWidth, spriteHeight);

     explosions.forEach(explosion => {
          explosion.update();
          explosion.draw();
     });

     // Remove finished explosions
     explosions = explosions.filter(explosion => !explosion.shouldRemove());

     requestAnimationFrame(animate);
}

animate();