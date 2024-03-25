class Button {
  constructor(x, y, width, height, color) {
    this.active = false;
    this.color = color;
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
  }

  containsPoint(x, y) {
    return (x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height);
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