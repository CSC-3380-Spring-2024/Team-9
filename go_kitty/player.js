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
  }

  draw() {
    this.game.ctx.fillStyle = 'pink';
    this.game.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
    if (!this.isTouchingBottom()) {
      this.speed.y += this.game.gravity;
    } else {
      this.position.y = this.game.height - this.height;
      this.speed.y = 0;
    }
  }

  isTouchingBottom() {
    return this.position.y >= this.game.height - this.height;
  }

  jump() {
    if (this.isTouchingBottom()) {
      this.speed.y = -30;
    }
  }

  moveRight() {
    this.speed.x = 9;
  }

  moveLeft() {
    this.speed.x = -9;
  }

  fullStop() {
    this.speed.x = 0;
  }
}