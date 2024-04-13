class Game {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.ctx = context;
    this.pixelRatio = window.devicePixelRatio || 1;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.baseHeight = 720;
    this.baseWidth = 1700;
    this.ratio = this.height / this.baseHeight;
    this.background = new Background(this);
    this.backgroundclouds = new BackgroundClouds(this);
    this.backgroundbackhills = new BackgroundBackHills(this);
    this.backgroundhills = new BackgroundHills(this);
    this.player = new Player(this);
    this.lastKey;
    this.lastButton;
    this.lives = 3;
    this.coins = [
      new Coins(this, 700, 380),
      new Coins(this, 1000, 100),
      new Coins(this, 1300, 250),
      new Coins(this, 1700, 310),
      new Coins(this, 2000, 180)
    ];
    this.platforms = [
      new Platform(this, 0, 550, 503, 251, 0, 562, 503, 251),
      new Platform(this, 502, 550, 503, 251, 502, 562, 503, 251),
      new Platform(this, 503 * 2 - 2, 550, 503, 251, 503 * 2 - 2, 562, 503, 251)
    ];
    this.gravity;

    //this.start;
    this.start = false;
    this.startButton = new StartButton(this, 500, 0, 300, 60, 40);
    this.gameOverButton = new gameOverButton(this, 300, 60, 40);

    this.score = 0;
    this.orientationMessage = document.createElement('div');
    this.orientationMessage.style.color = 'black';
    this.orientationMessage.innerText = 'Please rotate your device to landscape mode.';
    this.orientationMessage.style.position = 'absolute';
    this.orientationMessage.style.top = '50%';
    this.orientationMessage.style.left = '50%';
    this.orientationMessage.style.transform = 'translate(-50%, -50%)';
    this.orientationMessage.style.fontSize = '24px';
    this.orientationMessage.style.textAlign = 'center';
    this.orientationMessage.style.display = 'none';
    document.body.appendChild(this.orientationMessage);
    this.mouse = {
      x: undefined,
      y: undefined,
      width: 1,
      height: 1,
      pressed: false,
    };
    this.keys = {
      d: {
        pressed: false
      },
      a: {
        pressed: false
      }
    };
    this.canMove;
    this.controller = new ButtonController();
    
    this.lBtn = new Button(400, 676, 130, 130, "purple", this, 'left');
    this.rBtn = new Button(700, 676, 130, 130, "red", this, 'right');
    this.jBtn = new Button(1500, 676, 130, 130, "grey", this, 'jump');
    
    
    this.controller.addButton(this.lBtn);
    this.controller.addButton(this.rBtn);
    this.controller.addButton(this.jBtn);
    this.resize(window.innerWidth, window.innerHeight);

    window.addEventListener('resize', e => {
      this.resize(window.innerWidth, window.innerHeight);
    });

    window.addEventListener('keydown', (event) => {
      switch (event.key) {
        case ' ':
          this.player.jump();
          break;
        
        case 'd':
          if (this.canMove) {
            this.keys.d.pressed = true;
            this.lastKey = 'right';
          }
          break;
        
        case 'a':
          if (this.canMove) {
            this.keys.a.pressed = true;
            this.lastKey = 'left';
          }
          break;

        case 'f':
          this.toggleFullScreen();
          break;
      }
    });
    window.addEventListener('keyup', (event) => {
      switch (event.key) {
        case 'd':
          this.keys.d.pressed = false;
          break;
        
        case 'a':
          this.keys.a.pressed = false;
          break;
      }
    });
    window.addEventListener('mousedown', e => {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
      this.mouse.pressed = true;
    });
    window.addEventListener('mouseup', e => {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
      this.mouse.pressed = false;
    });
    window.addEventListener('touchstart', e => {
      this.mouse.x = e.changedTouches[0].pageX;
      this.mouse.y = e.changedTouches[0].pageY;
      this.mouse.pressed = true;
      this.controller.touchStart(e);
      if (this.jBtn.active) {
        this.player.jump();
      }
      if (this.rBtn.active) {
        this.lastButton = 'right';
      }
      if (this.lBtn.active) {
        this.lastButton = 'left';
      }
    }, { passive: false });

    window.addEventListener('touchend', e => {
      this.mouse.x = e.changedTouches[0].pageX;
      this.mouse.y = e.changedTouches[0].pageY;
      this.mouse.pressed = false;
      this.controller.touchEnd(e);
    });
    window.addEventListener('orientationchange', () => {
      this.handleOrientationChange();
    });
  }
  toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
  handleOrientationChange() {
    if (window.innerWidth < window.innerHeight) {
      this.canvas.style.display = 'none';
      this.orientationMessage.style.display = 'block';
    } else {
      this.canvas.style.display = 'block';
      this.orientationMessage.style.display = 'none';
      this.resize(window.innerWidth, window.innerHeight);
    }
  }
  init() {
    //this.score = 0;
    /*this.coins = [
      new Coins(this, 700, 380),
      new Coins(this, 1000, 100),
      new Coins(this, 1300, 250),
      new Coins(this, 1700, 310),
      new Coins(this, 2000, 180)
    ];*/
    this.background.resize();
    this.backgroundclouds.resize();
    this.backgroundbackhills.resize();
    this.backgroundhills.resize();
    this.platforms.forEach((platform) => {
      platform.resize();
    });
    this.controller.buttons.forEach(button => {
      button.resizeButtons();
    });
    this.player.resize();
    this.coins.forEach((coin) => {
      coin.resize();
    });
  }
  resetLives() {
    this.lives = 3;
  }
  resetCoins() {
    this.coins = [
      new Coins(this, 700, 380),
      new Coins(this, 1000, 100),
      new Coins(this, 1300, 250),
      new Coins(this, 1700, 310),
      new Coins(this, 2000, 180)
    ];
  }
  resize(width, height) {
    this.canvas.width = width * this.pixelRatio;
    this.canvas.height = height * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = 'green';
    this.width = width;
    this.height = height;
    this.buttonRatio = this.width / this.baseWidth;
    this.ratio = this.height / this.baseHeight;
    this.gravity = 1.5 * this.ratio;

    this.startButton.resize();
    //this.start = false;
    //this.resetLives();

    this.gameOverButton.resize();

    if (this.pixelRatio >= 3) {
      this.lastButton = 'right';
    } else if (this.pixelRatio === 2 && this.isTouchDevice()) {
      this.lastButton = 'right';
    } else if (this.pixelRatio === 2 && !this.isTouchDevice()) {
      this.lastKey = 'right';
    } else {
      this.lastKey = 'right';
    }

    this.init();
  }
  checkCollision(player, platform) {
    return (
      player.hitBoxY + player.hitBoxHeight <= platform.hitBoxY && player.hitBoxY + player.hitBoxHeight + player.speed.y >= platform.hitBoxY && player.hitBoxX + player.hitBoxWidth >= platform.hitBoxX && player.hitBoxX <= platform.hitBoxX + platform.hitBoxSWidth
    );
  }
  isCollected(a, b) {
    const dx = a.currentCollisionX - b.currentCollisionX;
    const dy = a.currentCollisionY - b.currentCollisionY;
    const distance = Math.hypot(dx, dy);
    const sumOfRadii = a.collisionRadius + b.collisionRadius;
    return distance <= sumOfRadii;
  }
  isClickedOn(mouse, startButton) {
    return (
      mouse.x < startButton.scaledX + startButton.scaledWidth && mouse.x + mouse.width > startButton.scaledX && mouse.y < startButton.scaledY + startButton.scaledHeight && mouse.y + mouse.height > startButton.scaledY
    );
  }
  isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints;
  }
  drawScoreText() {
    this.ctx.save();
    this.ctx.fillStyle = 'magenta';
    this.ctx.font = `bold ${33 * this.ratio}px Poppins, sans-serif`;
    this.ctx.fillText(`score: ${this.score}`, 40 * this.ratio, 80 * this.ratio);
    for (let i = 0; i < this.lives; i++) {
      this.ctx.fillStyle = 'orange';
      this.ctx.fillRect((60 + 50 * i) * this.ratio, 100 * this.ratio, 32 * this.ratio, 32 * this.ratio);
    }
    this.ctx.restore();
  }
  render() {
    if (window.innerWidth < window.innerHeight) {
      this.handleOrientationChange();
    } 
    if (this.start && this.lives >= 1) {
      this.background.update();
      this.background.draw();
      this.backgroundclouds.update();
      this.backgroundclouds.draw();
      this.backgroundbackhills.update();
      this.backgroundbackhills.draw();
      this.backgroundhills.update();
      this.backgroundhills.draw();

      this.drawScoreText();

      this.coins.forEach((coin) => {
        coin.update();
        coin.draw();
      });

      this.player.update();
      this.player.draw();

      this.platforms.forEach((platform) => {
        platform.update();
        platform.draw();
      });

      if (this.player.reset) {
        if (this.pixelRatio >= 3) {
          this.lastButton = 'right';
          if (this.lBtn.active) {
            this.lBtn.active = false;
          } else if (this.rBtn.active) {
            this.rBtn.active = false;
          } 
        } else if (this.pixelRatio === 2 && this.isTouchDevice()) {
          this.lastButton = 'right';
          if (this.lBtn.active) {
            this.lBtn.active = false;
          } else if (this.rBtn.active) {
            this.rBtn.active = false;
          } 
        } else if (this.pixelRatio === 2 && !this.isTouchDevice()) {
          this.lastKey = 'right';
          if (!this.keys.d.pressed && this.keys.a.pressed) {
            this.canMove = false;
          } else if (this.keys.d.pressed && !this.keys.a.pressed) {
            this.canMove = false;
          }
        } else {
          this.lastKey = 'right';
          if (!this.keys.d.pressed && this.keys.a.pressed) {
            this.canMove = false;
          } else if (this.keys.d.pressed && !this.keys.a.pressed) {
            this.canMove = false;
          }
        }
        this.player.reset = false;
      }

      if (!this.keys.d.pressed && !this.keys.a.pressed) {
        this.canMove = true;
      }
      if (!this.canMove) {
        this.player.speed.x = 0;
      }
      if (this.canMove) {
        if (this.keys.d.pressed && this.player.scaledX < 400 * this.ratio) {
          this.player.moveRight();
        } else if (this.keys.a.pressed && this.player.scaledX > 100 * this.ratio) {
          this.player.moveLeft();
        } else if (this.lBtn.active && this.player.scaledX > 100 * this.ratio) {
          this.player.moveLeft();
        } else if (this.rBtn.active && this.player.scaledX < 400 * this.ratio) {
          this.player.moveRight();
        } else {
          this.player.fullStop();

          if (this.keys.d.pressed) {
            this.background.moveLeft();
            this.backgroundclouds.moveLeft();
            this.backgroundbackhills.moveLeft();
            this.backgroundhills.moveLeft();
            this.platforms.forEach((platform) => {
              platform.moveLeft();
            });
            this.coins.forEach((coin) => {
              coin.moveLeft();
            });
          } else if (this.keys.a.pressed) {
            this.background.moveRight();
            this.backgroundclouds.moveRight();
            this.backgroundbackhills.moveRight();
            this.backgroundhills.moveRight();
            this.platforms.forEach((platform) => {
              platform.moveRight();
            });
            this.coins.forEach((coin) => {
              coin.moveRight();
            });
          } else if (this.lBtn.active) {
            this.background.moveRight();
            this.backgroundclouds.moveRight();
            this.backgroundbackhills.moveRight();
            this.backgroundhills.moveRight();
            this.platforms.forEach((platform) => {
              platform.moveRight();
            });
            this.coins.forEach((coin) => {
              coin.moveRight();
            });
          } else if (this.rBtn.active) {
            this.background.moveLeft();
            this.backgroundclouds.moveLeft();
            this.backgroundbackhills.moveLeft();
            this.backgroundhills.moveLeft();
            this.platforms.forEach((platform) => {
              platform.moveLeft();
            });
            this.coins.forEach((coin) => {
              coin.moveLeft();
            });
          }
        }
      }

      if (this.canMove) {
        if (this.keys.d.pressed && this.lastKey === 'right' && this.player.currentSprite !== this.player.sprites.run.right) {
          this.player.currentSprite = this.player.sprites.run.right;
          this.player.currentSpriteX = this.player.sprites.run.x;
          this.player.currentSpriteY = this.player.sprites.run.y;
          this.player.currentSpriteWidth = this.player.sprites.run.width;
          this.player.currentSpriteHeight = this.player.sprites.run.height;
          this.player.currentCircleX = 0.77;
          //this.hitBoxX = 188 * this.game.ratio;
          this.player.hitBoxPosition.x = 88.8 * this.ratio;
        } else if (this.rBtn.active && this.lastButton === 'right' && this.player.currentSprite !== this.player.sprites.run.right) {
          this.player.currentSprite = this.player.sprites.run.right;
          this.player.currentSpriteX = this.player.sprites.run.x;
          this.player.currentSpriteY = this.player.sprites.run.y;
          this.player.currentSpriteWidth = this.player.sprites.run.width;
          this.player.currentSpriteHeight = this.player.sprites.run.height;
          this.player.currentCircleX = 0.77;
          //this.hitBoxX = 188 * this.game.ratio;
          this.player.hitBoxPosition.x = 88.8 * this.ratio;
        } else if (this.keys.a.pressed && this.lastKey === 'left' && this.player.currentSprite !== this.player.sprites.run.left) {
          this.player.currentSprite = this.player.sprites.run.left;
          this.player.currentSpriteX = this.player.sprites.run.x;
          this.player.currentSpriteY = this.player.sprites.run.y;
          this.player.currentSpriteWidth = this.player.sprites.run.width;
          this.player.currentSpriteHeight = this.player.sprites.run.height;
          this.player.currentCircleX = 0.23;
          //this.hitBoxX = 171 * this.game.ratio;
          this.player.hitBoxPosition.x = 72 * this.ratio;
        } else if (this.lBtn.active && this.lastButton === 'left' && this.player.currentSprite !== this.player.sprites.run.left) {
          this.player.currentSprite = this.player.sprites.run.left;
          this.player.currentSpriteX = this.player.sprites.run.x;
          this.player.currentSpriteY = this.player.sprites.run.y;
          this.player.currentSpriteWidth = this.player.sprites.run.width;
          this.player.currentSpriteHeight = this.player.sprites.run.height;
          this.player.currentCircleX = 0.23;
          //this.hitBoxX = 171 * this.game.ratio;
          this.player.hitBoxPosition.x = 72 * this.ratio;
        } else if (!this.keys.a.pressed && this.lastKey === 'left' && this.player.currentSprite !== this.player.sprites.stand.left) {
          this.player.currentSprite = this.player.sprites.stand.left;
          this.player.currentSpriteX = this.player.sprites.stand.x;
          this.player.currentSpriteY = this.player.sprites.stand.y;
          this.player.currentSpriteWidth = this.player.sprites.stand.width;
          this.player.currentSpriteHeight = this.player.sprites.stand.height;
          this.player.currentCircleX = 0.23;
          //this.hitBoxX = 171 * this.game.ratio;
          this.player.hitBoxPosition.x = 72 * this.ratio;
        } else if (!this.lBtn.active && this.lastButton === 'left' && this.player.currentSprite !== this.player.sprites.stand.left) {
          this.player.currentSprite = this.player.sprites.stand.left;
          this.player.currentSpriteX = this.player.sprites.stand.x;
          this.player.currentSpriteY = this.player.sprites.stand.y;
          this.player.currentSpriteWidth = this.player.sprites.stand.width;
          this.player.currentSpriteHeight = this.player.sprites.stand.height;
          this.player.currentCircleX = 0.23;
          //this.hitBoxX = 171 * this.game.ratio;
          this.player.hitBoxPosition.x = 72 * this.ratio;
        } else if (!this.keys.d.pressed && this.lastKey === 'right' && this.player.currentSprite !== this.player.sprites.stand.right) {
          this.player.currentSprite = this.player.sprites.stand.right;
          this.player.currentSpriteX = this.player.sprites.stand.x;
          this.player.currentSpriteY = this.player.sprites.stand.y;
          this.player.currentSpriteWidth = this.player.sprites.stand.width;
          this.player.currentSpriteHeight = this.player.sprites.stand.height;
          this.player.currentCircleX = 0.77;
          //this.hitBoxX = 188 * this.game.ratio;
          this.player.hitBoxPosition.x = 88.8 * this.ratio;
        } else if (!this.rBtn.active && this.lastButton === 'right' && this.player.currentSprite !== this.player.sprites.stand.right) {
          this.player.currentSprite = this.player.sprites.stand.right;
          this.player.currentSpriteX = this.player.sprites.stand.x;
          this.player.currentSpriteY = this.player.sprites.stand.y;
          this.player.currentSpriteWidth = this.player.sprites.stand.width;
          this.player.currentSpriteHeight = this.player.sprites.stand.height;
          this.player.currentCircleX = 0.77;
          //this.hitBoxX = 188 * this.game.ratio;
          this.player.hitBoxPosition.x = 88.8 * this.ratio;
        }
      }
      
      this.platforms.forEach((platform) => {
        if (this.checkCollision(this.player, platform)) {
          this.player.speed.y = 0;
        }
      });

      if (this.player.scaledY > this.height) {
        this.player.reset = true;
        //this.init();
        this.background.resizeXPos();
        this.backgroundclouds.resizeXPos();
        this.backgroundbackhills.resizeXPos();
        this.backgroundhills.resizeXPos();
        this.platforms.forEach((platform) => {
          platform.resizeXYPos();
        });
        this.controller.buttons.forEach(button => {
          button.resizeButtons();
        });
        this.player.resizeXPos();
        this.coins.forEach((coin) => {
          coin.resizeXPos();
        });
        this.lives--;
      }

      if (this.pixelRatio >= 3) {
        this.controller.buttons.forEach(button => {
          button.draw();
        });
      } else if (this.pixelRatio === 2 && this.isTouchDevice()) {
        this.controller.buttons.forEach(button => {
          button.draw();
        });
      }
    }
    else if (this.start && this.lives < 1) {
      this.gameOverButton.draw();
      if (this.mouse.pressed && this.isClickedOn(this.mouse, this.gameOverButton)) {
        this.resetLives();
        this.score = 0;
        this.resetCoins();
        //this.init();
        this.background.resizeXPos();
        this.backgroundclouds.resizeXPos();
        this.backgroundbackhills.resizeXPos();
        this.backgroundhills.resizeXPos();
        this.platforms.forEach((platform) => {
          platform.resizeXYPos();
        });
        this.controller.buttons.forEach(button => {
          button.resizeButtons();
        });
        this.player.resizeXPos();
        this.coins.forEach((coin) => {
          coin.resizeXPos();
        });
      }
    }
    else {
      this.startButton.draw();
      if (this.mouse.pressed && this.isClickedOn(this.mouse, this.startButton)) {
        this.start = true;
      }
    }
    
    
  }
}

window.addEventListener('load', function() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const game = new Game(canvas, ctx);
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render();
    requestAnimationFrame(animate);
  }

  this.requestAnimationFrame(animate);
});