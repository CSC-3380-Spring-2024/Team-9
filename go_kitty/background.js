class Background {
  constructor(game) {
    this.game = game;
    this.width = 1700;
    this.height = this.game.baseHeight;
    this.scaledWidth;
    this.scaledHeight;
    this.image = document.getElementById('backgroundbluesky');
    this.position = {
      x: 0
    };
    this.speed = {
      x: 0
    };
  }

  draw() {
    /*
    this.game.ctx.fillStyle = 'lightblue';
    this.game.ctx.fillRect(this.position.x, 0, this.scaledWidth, this.scaledHeight);
    */
    this.game.ctx.drawImage(this.image, this.position.x - this.scaledWidth + 1, 0, this.scaledWidth, this.scaledHeight);
    this.game.ctx.drawImage(this.image, this.position.x, 0, this.scaledWidth, this.scaledHeight);
    this.game.ctx.drawImage(this.image, this.position.x + this.scaledWidth - 1, 0, this.scaledWidth, this.scaledHeight);
  }

  resizeXPos() {
    this.position.x = 0;
  }

  resize() {
    this.scaledWidth = this.width * this.game.ratio;
    this.scaledHeight = this.height * this.game.ratio;
    this.position.x = 0;
  }

  moveLeft() {
    this.position.x -= 1.3 * this.game.ratio;
  }

  moveRight() {
    this.position.x += 1.3 * this.game.ratio;
  }
}