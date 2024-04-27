import Game from './game.js';

interface Position {
  x: number;
}

interface Speed {
  x: number;
}
class BackgroundHills {
  private game: Game;
  private width: number;
  private height: number;
  private scaledWidth: any;
  private scaledHeight: any;
  private image: any;
  private position: Position;
  private changedX: number;
  private speed: Speed;
  constructor(game: Game) {
    this.game = game;
    this.width = 1700;
    this.height = this.game.baseHeight;
    this.scaledWidth;
    this.scaledHeight;
    this.image = document.getElementById('backgroundhills');
    this.position = {
      x: 0
    };
    this.changedX = this.position.x;
    this.speed = {
      x: 0
    };
  }

  update() {
    this.changedX = this.position.x / this.game.ratio;
  }

  draw() {
    /*
    this.game.ctx.fillStyle = 'lightblue';
    this.game.ctx.fillRect(this.position.x, 0, this.scaledWidth, this.scaledHeight);
    */
    this.game.ctx.drawImage(this.image, this.position.x - this.scaledWidth + 1, 0, this.scaledWidth, this.scaledHeight);
    this.game.ctx.drawImage(this.image, this.position.x, 0, this.scaledWidth, this.scaledHeight);
    this.game.ctx.drawImage(this.image, this.position.x + this.scaledWidth - 1, 0, this.scaledWidth, this.scaledHeight);
    this.game.ctx.drawImage(this.image, this.position.x + (2 * this.scaledWidth - 2), 0, this.scaledWidth, this.scaledHeight);
  }

  resizeXPos() {
    this.position.x = 0;
  }

  resize() {
    this.scaledWidth = this.width * this.game.ratio;
    this.scaledHeight = this.height * this.game.ratio;
    this.position.x = this.changedX * this.game.ratio;
  }

  moveLeft() {
    this.position.x -= 4 * this.game.ratio;
    this.changedX = this.position.x / this.game.ratio;
  }

  moveRight() {
    this.position.x += 4 * this.game.ratio;
    this.changedX = this.position.x / this.game.ratio;
  }
}

export default BackgroundHills;