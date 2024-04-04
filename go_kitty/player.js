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
    this.width = 236;
    this.height = 138;
    this.scaledX;
    this.scaledY;
    this.scaledWidth;
    this.scaledHeight;
    this.isJumping = false;
    this.image = document.getElementById('miffyrunleft');
    this.sprites = {
      stand: {
        right: document.getElementById('miffystandright'),
        left: document.getElementById('miffystandleft'),
        x: 12,
        y: 96,
        width: 236,
        height: 143
      },
      run: {
        right: document.getElementById('miffyrunright'),
        left: document.getElementById('miffyrunleft'),
        x: 12,
        y: 96,
        width: 236,
        height: 138,
      },
    }
    this.currentSprite;
    this.currentSpriteX;
    this.currentSpriteY;
    this.currentSpriteWidth;
    this.currentSpriteHeight;
    this.reset = false;
  }

  draw() {
    /*
    this.game.ctx.fillStyle = 'yellow';
    this.game.ctx.fillRect(this.scaledX, this.scaledY, this.scaledWidth, this.scaledHeight);
    */
    this.game.ctx.drawImage(this.currentSprite, this.currentSpriteX, this.currentSpriteY, this.currentSpriteWidth, this.currentSpriteHeight, this.scaledX, this.scaledY, this.scaledWidth, this.scaledHeight);
  }

  update() {
    this.scaledX += this.speed.x;
    this.scaledY += this.speed.y;
    console.log(this.speed.y);
    if (this.speed.y === 0) {
      this.isJumping = false;
    }
    if (!this.isTouchingBottom()) {
      this.speed.y += this.game.gravity;
    }
  }

  isTouchingBottom() {
    return this.scaledY >= this.game.height - this.scaledHeight;
  }

  jump() {
    if (!this.isJumping && this.speed.y === 0) {
      this.speed.y = -30 * this.game.ratio;
      this.isJumping = true;
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
    /*
    this.scaledWidth = this.width * this.game.ratio;
    this.scaledHeight = this.height * this.game.ratio;
    */
    this.currentSprite = this.sprites.stand.right;
    this.currentSpriteX = this.sprites.stand.x;
    this.currentSpriteY = this.sprites.stand.y;
    this.currentSpriteWidth = this.sprites.stand.width;
    this.currentSpriteHeight = this.sprites.stand.height;
    this.scaledWidth = this.currentSpriteWidth * this.game.ratio;
    this.scaledHeight = this.currentSpriteHeight * this.game.ratio;
    this.scaledX = this.position.x * this.game.ratio;
    this.scaledY = this.position.y * this.game.ratio;
  }
}
