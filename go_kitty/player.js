class Player {
  constructor(game) {
    this.game = game;
    this.position = {
      x: 100,
      y: 100
    };
    this.speed = {
      x: 0,
      y: 0
    };
    this.width = 100;
    this.height = 100;
    this.scaledX;
    this.scaledY;
    this.scaledWidth;
    this.scaledHeight;
  }

  draw() {
    this.game.ctx.fillStyle = 'black';
    this.game.ctx.fillRect(this.scaledX, this.scaledY, this.scaledWidth, this.scaledHeight);
  }

  update() {
    this.scaledX += this.speed.x;
    this.scaledY += this.speed.y;
    if (!this.isTouchingBottom()) {
      this.speed.y += this.game.gravity;
    } else {
      this.scaledY = this.game.height - this.scaledHeight;
      this.speed.y = 0;
    }
  }

  isTouchingBottom() {
    return this.scaledY >= this.game.height - this.scaledHeight;
  }

  jump() {
    if (this.speed.y === 0) {
      this.speed.y = -30 * this.game.ratio;
    }
  }

  moveRight() {
    this.speed.x = 9 * this.game.ratio;
  }

  moveLeft() {
    this.speed.x = -9 * this.game.ratio;
  }

  fullStop() {
    this.speed.x = 0;
  }

  resize() {
    this.scaledWidth = this.width * this.game.ratio;
    this.scaledHeight = this.height * this.game.ratio;
    this.scaledX = this.position.x * this.game.ratio;
    this.scaledY = this.position.y * this.game.ratio;
  }
}
