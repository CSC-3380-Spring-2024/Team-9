class StartButton {
  constructor(game, x, y, width, height, fontSize) {
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
    const centerX = this.scaledX + (this.scaledWidth / 2);
    const centerY = this.scaledY + (this.scaledHeight / 2);
    const textWidth = this.game.ctx.measureText('START').width;
    const textX = centerX - (textWidth / 2);
    const textY = centerY + (this.scaledFontSize / 2);
    this.game.ctx.fillText('START', textX, textY);
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