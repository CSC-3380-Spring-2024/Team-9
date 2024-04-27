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
        this.image;
    }
    containsPoint(x, y) {
        return (x >= this.scaledX && x <= this.scaledX + this.scaledWidth && y >= this.scaledY && y <= this.scaledY + this.scaledHeight);
    }
    draw() {
        if (this.name === 'left') {
            this.image = document.getElementById('leftButton');
        }
        else if (this.name === 'right') {
            this.image = document.getElementById('rightButton');
        }
        else if (this.name === 'jump') {
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
        }
        else if (this.name === 'right') {
            this.scaledWidth = this.width * this.game.ratio;
            this.scaledHeight = this.height * this.game.ratio;
            this.scaledX = (this.game.width - this.scaledWidth) / 3.5;
            this.scaledY = (this.game.height - this.scaledHeight) / 1.03;
        }
        else if (this.name === 'jump') {
            this.scaledWidth = this.width * this.game.ratio;
            this.scaledHeight = this.height * this.game.ratio;
            this.scaledX = (this.game.width - this.scaledWidth) / 1.1;
            this.scaledY = (this.game.height - this.scaledHeight) / 1.03;
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
        this.buttons.forEach((button) => {
            button.active = touchesArray.some((touch) => button.containsPoint(touch.clientX, touch.clientY));
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
export { Button, ButtonController };
