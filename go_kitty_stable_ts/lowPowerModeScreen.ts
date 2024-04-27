import Game from  './game.js';

interface Position {
  x: number;
  y: number;
}

class LowPowerModeScreen {
  private game: Game;
  private width: number;
  private height: number;
  private scaledX: any;
  private scaledY: any;
  private scaledWidth: any;
  private scaledHeight: any;
  private fontSize: number;
  private scaledFontSize: any;
  private position: Position;
  private image: any;
  constructor(game: Game, x: number, y: number, width: number, height: number, fontSize: number) {
    this.game = game;
    this.position = {
      x: x,
      y: y,
    };
    this.width = width;
    this.height = height;
    this.scaledX;
    this.scaledY;
    this.scaledWidth;
    this.scaledHeight;
    this.fontSize = fontSize;
    this.scaledFontSize;
    this.image = document.getElementById('lowPowerModeSymbol')
  }

  draw() {
    this.game.ctx.fillStyle = 'black';
    this.game.ctx.fillRect(this.scaledX, this.scaledY, this.scaledWidth, this.scaledHeight);
    this.game.ctx.drawImage(this.image, this.scaledX, this.scaledY, this.scaledWidth, this.scaledHeight)
  }
  drawText() {
    this.game.ctx.save();
    this.game.ctx.fillStyle = 'black';
    this.game.ctx.font = `bold ${this.scaledFontSize}px Poppins, sans-serif`;
    const centerX: number = this.scaledX + (this.scaledWidth / 2);
    const centerY: number = this.scaledY + (this.scaledHeight / 2);
    const textWidth: number = this.game.ctx.measureText('LOW POWER MODE ENABLED').width;
    const textX: number = centerX - (textWidth / 2);
    const textY: number = centerY + (this.scaledFontSize / 2);
    this.game.ctx.fillText('LOW POWER MODE ENABLED', textX, textY);
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

export default LowPowerModeScreen;