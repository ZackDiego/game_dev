

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = 400;
const CANVAS_HEIGHT = canvas.height = 240;

// const playerImage = new Image();
// playerImage.src = "shadow_dog.png";

const bgl1 = new Image();
bgl1.src = "Layers/sky.png";
const bgl2 = new Image();
bgl2.src = "Layers/far-mountains.png";
const bgl3 = new Image();
bgl3.src = "Layers/middle-mountains.png";
const bgl4 = new Image();
bgl4.src = "Layers/far-trees.png";
const bgl5 = new Image();
bgl5.src = "Layers/myst.png";
const bgl6 = new Image();
bgl6.src = "Layers/near-trees.png";

let gameSpeed = 2;
// let gameFrame = 0;

class Layer {
     constructor(image, speedModifier) {
          this.image = image;
          this.speedModifier = speedModifier;
          this.x = 0;
          this.y = 0;
          this.width = 320;
          this.height = 240;
          // this.x2 = this.width;
          this.speed = gameSpeed * this.speedModifier;
     }

     update() {
          if (this.x <= -this.width) this.x = 0;
          this.x = this.x - this.speed;

          // method 2
          // this.x = gameFrame * this.speedModifier % this.width;

          // if (this.x2 <= -this.width) this.x2 = this.width + this.x - this.speed;
          // else this.x2 = this.x2 - this.speed;
     }

     draw() {
          ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
          ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
          ctx.drawImage(this.image, this.x + this.width * 2, this.y, this.width, this.height);
     }
}



const layer1 = new Layer(bgl1, 0.000001)
const layer2 = new Layer(bgl2, 0.01)
const layer3 = new Layer(bgl3, 0.1)
const layer4 = new Layer(bgl4, 0.2)
const layer5 = new Layer(bgl5, 0.5)
const layer6 = new Layer(bgl6, 0.7)

const layers = [layer1, 
     layer2, 
     layer3, 
     layer4, 
     layer5, 
     layer6
]

function animate() {
     ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
     // ctx.fillRect(50, 50, 30, 30);
     // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
     // ctx.drawImage(bgl6, x, 0);
     // ctx.drawImage(bgl5, x, 0);
     // ctx.drawImage(bgl4, x, 0);
     // ctx.drawImage(bgl3, x, 0);
     // ctx.drawImage(bgl2, x, 0);
     // ctx.drawImage(bgl1, x, 0);
     // ctx.drawImage(bgl1, x2, 0);
     // ctx.drawImage(bgl1, x3, 0);




     // if (x < -320) x = 320 + x2 + x3 - gameSpeed;
     // else x = x - gameSpeed; 

     // if (x2 < -320) x2 = 320 + x + x3 - gameSpeed;
     // else x2 = x2 - gameSpeed;

     // if (x3 < -320) x3 = 320 + x2 + x - gameSpeed;
     // else x3 = x3 - gameSpeed;

     layers.forEach(layer => {
          layer.update();
          layer.draw();
     })

     // gameFrame--;
     requestAnimationFrame(animate);
}

animate();