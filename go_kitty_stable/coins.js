class Coins {
  constructor(game, x, y) {
    this.game = game;
    this.position = {
      x: x,
      y: y
    };
    this.changedX = this.position.x;
    this.scaledX = this.position.x * this.game.ratio;
    this.scaledY;
    this.width = 81;
    this.height = 52;
    this.scaledWidth;
    this.scaledHeight;
    this.collected = false;
    this.image = document.getElementById('fish');
    this.currentCollisionX;
    this.currentCollisionY;
    this.currentCircleX = 0.5;
    this.currentCircleY = 0.5;
    this.collisionRadius = 27 * this.game.ratio;
    this.currentCollisionX = this.scaledX + this.scaledWidth * this.currentCircleX;
    this.currentCollisionY = this.scaledY + this.scaledHeight * this.currentCircleY;
  }

  draw() {
    //this.game.ctx.fillStyle = 'green';
    /*
    this.game.ctx.fillRect(this.scaledX, this.scaledY, this.scaledWidth, this.scaledHeight);
    */
    this.game.ctx.drawImage(this.image, this.scaledX, this.scaledY, this.scaledWidth, this.scaledHeight);

    /*
    this.game.ctx.beginPath();
    this.game.ctx.arc(this.currentCollisionX, this.currentCollisionY, this.collisionRadius, 0, Math.PI * 2);
    this.game.ctx.stroke();
    */
  }

  update() {
    if (this.game.isCollected(this, this.game.player)) {
      this.collected = true;
      this.game.coins = this.game.coins.filter(coin => !coin.collected);
      this.game.score++;
    }
    this.currentCollisionX = this.scaledX + this.scaledWidth * this.currentCircleX;
    this.currentCollisionY = this.scaledY + this.scaledHeight * this.currentCircleY;
    this.changedX = this.scaledX / this.game.ratio;
  }

  resizeXPos() {
    this.scaledX = this.position.x * this.game.ratio;
    this.scaledY = this.position.y * this.game.ratio;
    this.scaledWidth = this.width * this.game.ratio;
    this.scaledHeight = this.height * this.game.ratio;
    
    this.currentCircleX = 0.5;
    this.currentCircleY = 0.5;
    this.collisionRadius = 27 * this.game.ratio;
  }

  resize() {
    this.scaledX = this.changedX * this.game.ratio;
    this.scaledY = this.position.y * this.game.ratio;
    this.scaledWidth = this.width * this.game.ratio;
    this.scaledHeight = this.height * this.game.ratio;
    
    this.currentCircleX = 0.5;
    this.currentCircleY = 0.5;
    this.collisionRadius = 27 * this.game.ratio;
    
  }

  moveLeft() {
    this.scaledX -= 9 * this.game.ratio;
    this.changedX = this.scaledX / this.game.ratio;
  }

  moveRight() {
    this.scaledX += 9 * this.game.ratio;
    this.changedX = this.scaledX / this.game.ratio;
  }
}