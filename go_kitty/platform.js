class Platform {
  constructor(game, x, y, width, height, hitBoxX, hitBoxY, hitBoxWidth, hitBoxHeight) {
    this.game = game;
    this.position = {
      x: x,
      y: y
    };
    this.scaledX;
    this.changedX = this.position.x;
    this.trialX;
    this.scaledY;
    this.hitBoxPosition = {
      x: hitBoxX,
      y: hitBoxY
    };
    this.changedhitBoxPositionX = this.hitBoxPosition.x;
    this.hitBoxWidth = hitBoxWidth;
    this.hitBoxHeight = hitBoxHeight;
    this.hitBoxSWidth;
    this.hitBoxSHeight;
    this.hitBoxX;
    this.hitBoxY;
    this.width = width;
    this.height = height;
    this.scaledWidth;
    this.image = document.getElementById('platform');
    this.scaledHeight;
  }

  update() {
    this.changedX = this.scaledX / this.game.ratio;
    this.changedhitBoxPositionX = this.hitBoxX / this.game.ratio;
  }

  draw() {
    //this.game.ctx.fillStyle = 'blue';
    
    /*
    this.game.ctx.fillRect(this.hitBoxX, this.hitBoxY, this.hitBoxSWidth, this.hitBoxSHeight);
    */
    
    
    this.game.ctx.drawImage(this.image, this.scaledX, this.scaledY, this.scaledWidth, this.scaledHeight);
    
  }

  resizeXYPos() {
    this.scaledWidth = this.width * this.game.ratio;
    this.scaledHeight = this.height * this.game.ratio;
    this.scaledX = this.position.x * this.game.ratio;

    this.scaledY = this.position.y * this.game.ratio;
    this.hitBoxSWidth = this.hitBoxWidth * this.game.ratio;
    this.hitBoxSHeight = this.hitBoxHeight * this.game.ratio;
    this.hitBoxX = this.hitBoxPosition.x * this.game.ratio;
    this.hitBoxY = this.hitBoxPosition.y * this.game.ratio;
  }

  resize() {
    this.scaledWidth = this.width * this.game.ratio;
    this.scaledHeight = this.height * this.game.ratio;
    //this.scaledX = this.position.x * this.game.ratio;
    this.scaledX = this.changedX * this.game.ratio;

    this.scaledY = this.position.y * this.game.ratio;
    this.hitBoxSWidth = this.hitBoxWidth * this.game.ratio;
    this.hitBoxSHeight = this.hitBoxHeight * this.game.ratio;
    //this.hitBoxX = this.hitBoxPosition.x * this.game.ratio;
    this.hitBoxX = this.changedhitBoxPositionX * this.game.ratio;
    this.hitBoxY = this.hitBoxPosition.y * this.game.ratio;
  }

  moveLeft() {
    this.scaledX -= 9 * this.game.ratio;

    this.changedX = this.scaledX / this.game.ratio;

    this.hitBoxX -= 9 * this.game.ratio;

    this.changedhitBoxPositionX = this.hitBoxX / this.game.ratio;
  }

  moveRight() {
    this.scaledX += 9 * this.game.ratio;

    this.changedX = this.scaledX / this.game.ratio;

    this.hitBoxX += 9 * this.game.ratio;

    this.changedhitBoxPositionX = this.hitBoxX / this.game.ratio;
  }
}
