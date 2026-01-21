import { Player } from './player.js';
import { InputHandler } from './inputHandler.js';
import { Enemy, Skull, Warrior, Toad } from './enemy.js';
import { Game } from "./game.js"
import { AssetLoader } from './utils.js';

window.addEventListener('load', async () => {
     const loading = document.getElementById("loading");
     loading.style.display = 'none';

     const canvas = document.getElementById("canvas");
     const ctx = canvas.getContext("2d");
     const collisionCanvas = document.getElementById("collisionCanvas");
     const collisionCtx = collisionCanvas.getContext("2d");

     const CANVAS_WIDTH = canvas.width = 1000;
     const CANVAS_HEIGHT = canvas.height = 600;

     collisionCanvas.width = CANVAS_WIDTH;
     collisionCanvas.height = CANVAS_HEIGHT;

     let game = new Game(ctx, CANVAS_WIDTH, CANVAS_HEIGHT);


     const playerAssets = {
          metadata: {
               spriteWidth: 250,
               spriteHeight: 250
          },
          idle: { img: new Image(), frames: 8 },
          run: { img: new Image(), frames: 8 },
          jump: { img: new Image(), frames: 2 },
          fall: { img: new Image(), frames: 2 },
          attack1: { img: new Image(), frames: 8 },
          attack2: { img: new Image(), frames: 8 },
          takeHit: { img: new Image(), frames: 3 },
          death: { img: new Image(), frames: 7 },
     };

     playerAssets.idle.img.src = "assets/player/Idle.png";
     playerAssets.run.img.src  = "assets/player/Run.png";
     playerAssets.jump.img.src = "assets/player/Jump.png";
     playerAssets.attack1.img.src = "assets/player/Attack1.png";
     playerAssets.attack2.img.src = "assets/player/Attack2.png";
     playerAssets.takeHit.img.src = "assets/player/TakeHit.png";
     playerAssets.death.img.src = "assets/player/Death.png";
     playerAssets.fall.img.src = "assets/player/Fall.png";

     let mainPlayer = new Player(game, playerAssets);

     game.player = mainPlayer;


     let inputHandler = new InputHandler();



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

          game.handleInput(inputHandler);


          if (!game.gameOver) requestAnimationFrame(animate);
          else game.showGameOver();
     }

     animate(0);
})

