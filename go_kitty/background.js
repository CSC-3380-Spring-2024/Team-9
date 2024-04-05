class Background {
  constructor(game) {
    this.game = game;
    this.width = 1700;
    this.height = this.game.baseHeight;
    this.scaledWidth;
    this.scaledHeight;
    this.position = {
      x: 0
    };
    this.speed = {
      x: 0
    };
  }

  draw() {
    this.game.ctx.fillStyle = 'lightblue';
    this.game.ctx.fillRect(this.position.x, 0, this.scaledWidth, this.scaledHeight);
  }

  resize() {
    this.scaledWidth = this.width * this.game.ratio;
    this.scaledHeight = this.height * this.game.ratio;
    this.position.x = -0;
  }

  moveLeft() {
    this.position.x -= 5 * this.game.ratio;
  }

  moveRight() {
    this.position.x += 5 * this.game.ratio;
  }
}