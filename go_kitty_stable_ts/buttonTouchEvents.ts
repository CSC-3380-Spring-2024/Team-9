import Game from './game.js';

class Button {
  private game: Game;
  private width: number;
  private height: number;
  private x: number;
  private y: number;
  private scaledWidth: any;
  private scaledHeight: any;
  private scaledX: any;
  private scaledY: any;
  private initialX: number;
  private initialY: number;
  private name: string
  private image: any;
  public active: boolean;
  private color: string;
  constructor(x: number, y: number, width: number, height: number, color: string, game: Game, name: string) {
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
    this.image;
  }

  containsPoint(x: number, y: number) {
    return (x >= this.scaledX && x <= this.scaledX + this.scaledWidth && y >= this.scaledY && y <= this.scaledY + this.scaledHeight);
  }

  draw() {
    if (this.name === 'left') {
      this.image = document.getElementById('leftButton');
    } else if (this.name === 'right') {
      this.image = document.getElementById('rightButton');
    } else if (this.name === 'jump') {
      this.image = document.getElementById('jumpButton');
    }
    this.game.ctx.drawImage(this.image, this.scaledX, this.scaledY, this.scaledWidth, this.scaledHeight);
  }

  resizeButtons() {
    if (this.name === 'left') {
      this.scaledWidth = this.width * this.game.ratio;
      this.scaledHeight = this.height * this.game.ratio;
      this.scaledX = (this.game.width - this.scaledWidth) / 12;
      this.scaledY = (this.game.height - this.scaledHeight) / 1.03;
    } else if (this.name === 'right') {
      this.scaledWidth = this.width * this.game.ratio;
      this.scaledHeight = this.height * this.game.ratio;
      this.scaledX = (this.game.width - this.scaledWidth) / 3.5;
      this.scaledY = (this.game.height - this.scaledHeight) / 1.03;
    } else if (this.name === 'jump') {
      this.scaledWidth = this.width * this.game.ratio;
      this.scaledHeight = this.height * this.game.ratio;
      this.scaledX = (this.game.width - this.scaledWidth) / 1.1;
      this.scaledY = (this.game.height - this.scaledHeight) / 1.03;
    }
  }
}

class ButtonController {
  public buttons: Array<Button>;
  constructor() {
    this.buttons = [];
  }

  addButton(button: Button) {
    this.buttons.push(button);
  }

  testButtons(targetTouches: any) {
    const touchesArray = Array.from(targetTouches);
  
    this.buttons.forEach((button: Button) => {
      button.active = touchesArray.some((touch: any) =>
        button.containsPoint(touch.clientX, touch.clientY)
      );
    });
  }

  touchEnd(event: any) {
    event.preventDefault();
    this.testButtons(event.targetTouches);
  }

  touchMove(event: any) {
    event.preventDefault();
    this.testButtons(event.targetTouches);
  }

  touchStart(event: any) {
    event.preventDefault();
    this.testButtons(event.targetTouches);
  }
}

export {Button, ButtonController};