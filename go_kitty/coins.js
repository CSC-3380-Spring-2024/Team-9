class Coins {
  constructor(game, x, y) {
    this.game = game;
    this.position = {
      x: x,
      y: y
    };
    this.scaledX;
    this.scaledY;
    this.width = 81;
    this.height = 52;
    this.scaledWidth;
    this.scaledHeight;
    this.collected = false;
    this.image = document.getElementById('fish');
  }

  draw() {
    /*
    this.game.ctx.fillStyle = 'green';
    this.game.ctx.fillRect(this.scaledX, this.scaledY, this.scaledWidth, this.scaledHeight);
    */
    this.game.ctx.drawImage(this.image, this.scaledX, this.scaledY, this.scaledWidth, this.scaledHeight);
  }

  update() {
    if (this.game.isCollected(this.game.player, this)) {
      this.collected = true;
      this.game.coins = this.game.coins.filter(coin => !coin.collected);
      this.game.score++;
    }
  }

  resize() {
    this.scaledX = this.position.x * this.game.ratio;
    this.scaledY = this.position.y * this.game.ratio;
    this.scaledWidth = this.width * this.game.ratio;
    this.scaledHeight = this.height * this.game.ratio;
  }

  moveLeft() {
    this.scaledX -= 9 * this.game.ratio;
  }

  moveRight() {
    this.scaledX += 9 * this.game.ratio;
  }
}
