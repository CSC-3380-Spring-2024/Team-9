class Button {
  constructor(x, y, width, height, color, game, name) {
    this.game = game;
    this.active = false;
    this.color = color;
    this.height = height;
    this.width = width;
    this.scaledHeight;
    this.scaledWidth;
    this.x = x;
    this.y = y;
    this.scaledX;
    this.scaledY;
    this.initialX = x;
    this.initialY = y;
    this.name = name;
  }

  containsPoint(x, y) {
    return (x >= this.scaledX && x <= this.scaledX + this.scaledWidth && y >= this.scaledY && y <= this.scaledY + this.scaledHeight);
  }

  draw() {
    this.game.ctx.fillStyle = this.color;
    this.game.ctx.fillRect(this.scaledX, this.scaledY, this.scaledWidth, this.scaledHeight);
  }

  resize() {
    const relativeSpacingX = this.initialX / this.game.baseWidth;
    const relativeSpacingY = this.initialY / this.game.baseHeight;
    this.scaledHeight = this.height * this.game.ratio;
    this.scaledWidth = this.width * this.game.ratio;
    const minDistanceX = this.game.width * 0.01;
    const minDistanceY = this.game.height * 0.01;
    const actualDistanceX = minDistanceX * (this.game.baseWidth / this.game.width);
    const actualDistanceY = minDistanceY * (this.game.baseHeight / this.game.height);
    let minX = this.game.width * relativeSpacingX - this.scaledWidth;
    let minY = this.game.height * relativeSpacingY - this.scaledHeight;
    for (const button of this.game.controller.buttons) {
      if (button !== this) {
        const diffX = Math.abs(button.scaledX - minX);
        const diffY = Math.abs(button.scaledY - minY);
        if (diffX < this.scaledWidth && diffY < this.scaledHeight) {
          minX = button.scaledX + this.scaledWidth + actualDistanceX;
        }
      }
    }
  
    this.scaledX = Math.max(minX, actualDistanceX);
    this.scaledY = Math.max(minY, actualDistanceY);
  }

  resizeButtons() {
    if (this.name === 'left') {
      this.scaledWidth = this.width * this.game.ratio;
      this.scaledHeight = this.height * this.game.ratio;
      this.scaledX = (this.game.width - this.scaledWidth) / 12;
      this.scaledY = (this.game.height - this.scaledHeight) / 1.07;
    } else if (this.name === 'right') {
      this.scaledWidth = this.width * this.game.ratio;
      this.scaledHeight = this.height * this.game.ratio;
      this.scaledX = (this.game.width - this.scaledWidth) / 3.5;
      this.scaledY = (this.game.height - this.scaledHeight) / 1.07;
    } else if (this.name === 'jump') {
      this.scaledWidth = this.width * this.game.ratio;
      this.scaledHeight = this.height * this.game.ratio;
      this.scaledX = (this.game.width - this.scaledWidth) / 1.1;
      this.scaledY = (this.game.height - this.scaledHeight) / 1.07;
    }
  }
}

class ButtonController {
  constructor() {
    this.buttons = [];
  }

  addButton(button) {
    this.buttons.push(button);
  }

  testButtons(targetTouches) {
    const touchesArray = Array.from(targetTouches);
  
    this.buttons.forEach(button => {
      button.active = touchesArray.some(touch =>
        button.containsPoint(touch.clientX, touch.clientY)
      );
    });
  }

  touchEnd(event) {
    event.preventDefault();
    this.testButtons(event.targetTouches);
  }

  touchMove(event) {
    event.preventDefault();
    this.testButtons(event.targetTouches);
  }

  touchStart(event) {
    event.preventDefault();
    this.testButtons(event.targetTouches);
  }
}
