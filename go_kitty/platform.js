class Platform {
  constructor(game, x, y, width, height) {
    this.game = game;
    this.position = {
      x: x,
      y: y
    };
    this.scaledX;
    this.scaledY;
    this.width = width;
    this.height = height;
    this.scaledWidth;
    this.scaledHeight;
  }

  draw() {
    this.game.ctx.fillStyle = 'blue';
    this.game.ctx.fillRect(this.scaledX, this.scaledY, this.scaledWidth, this.scaledHeight);
  }

  resize() {
    this.scaledWidth = this.width * this.game.ratio;
    this.scaledHeight = this.height * this.game.ratio;
    this.scaledX = this.position.x * this.game.ratio;
    this.scaledY = this.position.y * this.game.ratio
  }

  moveLeft() {
    this.scaledX -= 9 * this.game.ratio;
  }

  moveRight() {
    this.scaledX += 9 * this.game.ratio;
  }
}