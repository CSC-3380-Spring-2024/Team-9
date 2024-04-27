import Game from './game.js';

class gameOverButton {
  private game: Game;
  private width: number;
  private height: number;
  private scaledX: any;
  private scaledY: any;
  private scaledWidth: any;
  private scaledHeight: any;
  private fontSize: number;
  private scaledFontSize: any;
  constructor(game: Game, width: number, height: number, fontSize: number) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.scaledX;
    this.scaledY;
    this.scaledWidth;
    this.scaledHeight;
    this.fontSize = fontSize;
    this.scaledFontSize;
  }

  draw() {
    this.game.ctx.fillStyle = 'yellow';
    this.game.ctx.fillRect(this.scaledX, this.scaledY, this.scaledWidth, this.scaledHeight);
    this.drawText();
  }
  drawText() {
    this.game.ctx.save();
    this.game.ctx.fillStyle = 'black';
    this.game.ctx.font = `bold ${this.scaledFontSize}px Poppins, sans-serif`;
    const centerX: number = this.scaledX + (this.scaledWidth / 2);
    const centerY: number = this.scaledY + (this.scaledHeight / 2);
    const textWidth: number = this.game.ctx.measureText('GAME OVER').width;
    const textX: number = centerX - (textWidth / 2);
    const textY: number = centerY + (this.scaledFontSize / 2);
    this.game.ctx.fillText('GAME OVER', textX, textY);
    this.game.ctx.restore();
  }
  resize() {
    this.scaledWidth = this.width * this.game.ratio;
    this.scaledHeight = this.height * this.game.ratio;
    this.scaledX = (this.game.width - this.scaledWidth) / 2;
    this.scaledY = (this.game.height - this.scaledHeight) / 2;
    this.scaledFontSize = this.fontSize * this.game.ratio;
  }
}

export default gameOverButton;