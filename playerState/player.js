export class Player {
     constructor(game, assets){
          this.state = 'idle';
          this.spriteWidth = assets.metadata.spriteWidth;
          this.spriteHeight = assets.metadata.spriteHeight;
          this.assets = assets;
          this.image = this.assets[this.state].img;
          this.maxFrame = this.assets[this.state].frames;
          this.spriteFrame = 0;
          this.frameTimer = 0;
          this.frameInterval = 200;
          this.game = game;
          this.x = game.width / 2;
          this.y = game.height / 2;
          this.width = this.spriteWidth * 1.5;
          this.height = this.spriteHeight * 1.5;
          this.vx = 0;
          this.xMovespeed = 5;
          this.yMovespeed = .5;
          this.vy = 0; 
          this.gravity = 0.3;
          this.groundY;
          this.onGround = true;
          this.jumpStrength = -5;
     }

     update(deltaTime){
          // horizontal movement
          this.x += this.vx * deltaTime * 0.1;
          this.y += this.vy * deltaTime * 0.1;

          // vertical movement
          switch (this.state) {
               case "jump":
                    this.vy += this.gravity;
                    this.y += this.vy * deltaTime * 0.1;

                    if (this.vy > 0) this.state = "fall";
                    break;

               case "fall":
                    this.vy += this.gravity;
                    this.y += this.vy * deltaTime * 0.1;

                    if (this.y >= this.groundY) {
                         this.y = this.groundY;
                         this.vy = 0;
                         this.state = "idle";
                         this.onGround = true;
                    }
                    break;
          }
          this.updateState(this.state);
          // Change frame
          if (this.frameTimer > this.frameInterval) {
               this.spriteFrame >= this.maxFrame - 1 ? this.spriteFrame = 0 : this.spriteFrame++;
               this.frameTimer = 0;
          } else {
               this.frameTimer += deltaTime;
          }
     }

     draw(ctx){
          ctx.drawImage(this.image, this.spriteFrame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, 
                    this.x, this.y, this.width, this.height);
     }

     updateState(state) {
          this.state = state;
          this.spriteFrame = 0;
          this.image = this.assets[this.state].img;
          this.maxFrame = this.assets[this.state].frames;
     }


     handleInput(inputHandler) {
          if (this.onGround) {
               // --- HORIZONTAL MOVEMENT ---
               if (inputHandler.keys.has("ArrowRight")) {
                    this.vx = this.xMovespeed;
                    this.state = "run";
               } else if (inputHandler.keys.has("ArrowLeft")) {
                    this.vx = -this.xMovespeed;
                    this.state = "run";
               }
               // --- VERTICAL MOVEMENT FOR OTHER CONTROLS (optional) ---
               if (inputHandler.keys.has("ArrowUp")){
                    this.vy -= this.yMovespeed;
                    this.state = "run";
               }
               if (inputHandler.keys.has("ArrowDown")){
                    this.vy += this.yMovespeed;
                    this.state = "run";
               }



               // --- JUMP ---
               if (inputHandler.keys.has("Space")) {
                    this.groundY = this.y;
                    this.jump(); // impulse
                    this.state = "jump";
               }

                              // --- STATE UPDATE ---
               if (inputHandler.keys.size === 0) {
                    this.vx = 0;
                    this.vy = 0;
                    this.state = "idle";
               }
          }

     }


     jump(){
          this.vy = this.jumpStrength;
          this.onGround = false;
     }
}
