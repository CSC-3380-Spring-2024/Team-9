class Player {
    constructor(game) {
        this.game = game;
        this.position = {
            x: 100,
            y: 200
        };
        this.changedX = this.position.x;
        this.speed = {
            x: 0,
            y: 0
        };
        this.width = 97;
        this.height = 70;
        this.hitBoxPosition = {
            x: 188,
            y: 268
        };
        this.changedhitBoxPositionX = this.hitBoxPosition.x;
        this.hitBoxWidth;
        this.hitBoxHeight;
        this.hitBoxX;
        this.hitBoxY;
        this.scaledX = this.position.x * this.game.ratio;
        this.scaledY;
        this.scaledWidth;
        this.scaledHeight;
        this.collisionX;
        this.collisionY;
        this.isJumping = false;
        this.image = document.getElementById('miffyrunleft');
        this.sprites = {
            stand: {
                right: document.getElementById('miffystandright'),
                left: document.getElementById('miffystandleft'),
                x: 12,
                y: 105,
                width: 256,
                height: 139
            },
            run: {
                right: document.getElementById('miffyrunright'),
                left: document.getElementById('miffyrunleft'),
                x: 12,
                y: 108,
                width: 256,
                height: 140,
            },
        };
        this.frames;
        this.currentSprite;
        this.currentSpriteX;
        this.currentSpriteY;
        this.currentSpriteWidth;
        this.currentSpriteHeight;
        this.currentCollisionX;
        this.currentCollisionY;
        this.currentCircleX = 0.77;
        this.currentCircleY = 0.42;
        this.collisionRadius = 40 * this.game.ratio;
        this.reset = false;
    }
    draw() {
        this.game.ctx.drawImage(this.currentSprite, this.currentSpriteWidth * this.frames, this.currentSpriteY, this.currentSpriteWidth, this.currentSpriteHeight, this.scaledX, this.scaledY, this.scaledWidth, this.scaledHeight);
    }
    update() {
        this.frames++;
        if (this.frames > 0 && (this.currentSprite === this.sprites.stand.right || this.currentSprite === this.sprites.stand.left)) {
            this.frames = 0;
        }
        else if (this.frames > 47 && (this.currentSprite === this.sprites.run.right || this.currentSprite === this.sprites.run.left)) {
            this.frames = 0;
        }
        this.scaledX += this.speed.x;
        this.changedX = this.scaledX / this.game.ratio;
        this.scaledY += this.speed.y;
        this.hitBoxX = this.scaledX + this.hitBoxPosition.x;
        this.hitBoxY += this.speed.y;
        this.currentCollisionX = this.scaledX + this.scaledWidth * this.currentCircleX;
        this.currentCollisionY = this.scaledY + this.scaledHeight * this.currentCircleY;
        if (this.speed.y === 0) {
            this.isJumping = false;
        }
        if (!this.isTouchingBottom()) {
            this.speed.y += this.game.gravity;
        }
    }
    isTouchingBottom() {
        return this.hitBoxY >= this.game.height - this.hitBoxHeight;
    }
    jump() {
        if (!this.isJumping && this.speed.y === 0) {
            this.speed.y = -25 * this.game.ratio;
            this.isJumping = true;
        }
    }
    moveRight() {
        this.speed.x = 9 * this.game.ratio;
    }
    moveLeft() {
        this.speed.x = -9 * this.game.ratio;
    }
    fullStop() {
        this.speed.x = 0;
    }
    resizeXPos() {
        this.scaledX = this.position.x * this.game.ratio;
        this.frames = 0;
        this.currentSprite = this.sprites.stand.right;
        this.currentSpriteX = this.sprites.stand.x;
        this.currentSpriteY = this.sprites.stand.y;
        this.currentSpriteWidth = this.sprites.stand.width;
        this.currentSpriteHeight = this.sprites.stand.height;
        this.currentCircleX = 0.77;
        this.collisionRadius = 40 * this.game.ratio;
        this.scaledWidth = this.currentSpriteWidth * this.game.ratio;
        this.scaledHeight = this.currentSpriteHeight * this.game.ratio;
        this.scaledX = this.position.x * this.game.ratio;
        this.scaledY = this.position.y * this.game.ratio;
        this.hitBoxWidth = this.width * this.game.ratio;
        this.hitBoxHeight = this.height * this.game.ratio;
        this.hitBoxPosition.x = 88.8 * this.game.ratio;
        this.hitBoxY = this.hitBoxPosition.y * this.game.ratio;
    }
    resize() {
        this.frames = 0;
        this.currentSprite = this.sprites.stand.right;
        this.currentSpriteX = this.sprites.stand.x;
        this.currentSpriteY = this.sprites.stand.y;
        this.currentSpriteWidth = this.sprites.stand.width;
        this.currentSpriteHeight = this.sprites.stand.height;
        this.currentCircleX = 0.77;
        this.collisionRadius = 40 * this.game.ratio;
        this.scaledWidth = this.currentSpriteWidth * this.game.ratio;
        this.scaledHeight = this.currentSpriteHeight * this.game.ratio;
        this.scaledX = this.changedX * this.game.ratio;
        this.scaledY = this.position.y * this.game.ratio;
        this.hitBoxWidth = this.width * this.game.ratio;
        this.hitBoxHeight = this.height * this.game.ratio;
        this.hitBoxPosition.x = 88.8 * this.game.ratio;
        this.hitBoxY = this.hitBoxPosition.y * this.game.ratio;
    }
}
export default Player;
