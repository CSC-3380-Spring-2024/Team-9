import Game from './game.js';

interface Position {
  x: number;
  y: number;
}

interface HitBoxPosition {
  x: number;
  y: number;
}

class FloatingPlatform {
  private game: Game;
  private position: Position;
  private scaledX: any;
  private changedX: number;
  private trialX: any;
  private scaledY: any;
  private hitBoxPosition: HitBoxPosition;
  private changedhitBoxPositionX: number;
  private hitBoxWidth: number;
  private hitBoxHeight: number;
  private hitBoxSWidth: any;
  private hitBoxSHeight: any;
  private hitBoxX: any;
  private hitBoxY: any;
  private width: number;
  private height: number;
  private scaledWidth: any;
  private image: any;
  private scaledHeight: any;
  constructor(game: Game, x: number, y: number, width: number, height: number, hitBoxX: number, hitBoxY: number, hitBoxWidth: number, hitBoxHeight: number) {
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
    this.image = document.getElementById('floatingPlatform');
    this.scaledHeight;
  }

  update() {
    this.changedX = this.scaledX / this.game.ratio;
    this.changedhitBoxPositionX = this.hitBoxX / this.game.ratio;
  }

  draw() {
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
    this.scaledX = this.changedX * this.game.ratio;

    this.scaledY = this.position.y * this.game.ratio;
    this.hitBoxSWidth = this.hitBoxWidth * this.game.ratio;
    this.hitBoxSHeight = this.hitBoxHeight * this.game.ratio;
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

export default FloatingPlatform;