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
    this.player = new Player(this);
    this.coins = [];
    this.platforms = [
      new Platform(this, 0, 470, 700, 250),
      new Platform(this, 699, 470, 700, 250),
      new Platform(this, 700 * 2 - 2, 470, 700, 250)
    ];
    this.gravity;

    this.start;
    this.startButton = new StartButton(this, 500, 0, 300, 60, 40);

    this.score;
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
    this.controller = new ButtonController();
    
    this.lBtn = new Button(400, 676, 170, 170, "purple", this);
    this.rBtn = new Button(700, 676, 170, 170, "red", this);
    this.jBtn = new Button(1500, 676, 170, 170, "grey", this);
    
    
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
          this.keys.d.pressed = true;
          break;
        
        case 'a':
          this.keys.a.pressed = true;
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
      this.mouse.fired = false;
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
  handleOrientationChange() {
    if (window.orientation === 0) {
      this.canvas.style.display = 'none';
      this.orientationMessage.style.display = 'block';
    } else {
      this.canvas.style.display = 'block';
      this.orientationMessage.style.display = 'none';
      this.resize(window.innerWidth, window.innerHeight);
    }
  }
  resize(width, height) {
    this.canvas.width = width * this.pixelRatio;
    this.canvas.height = height * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);
    this.width = width;
    this.height = height;
    this.buttonRatio = this.width / this.baseWidth;
    this.ratio = this.height / this.baseHeight;
    this.gravity = 1.5 * this.ratio;

    this.start = false;
    this.startButton.resize();

    this.score = 0;
    this.coins = [
      new Coins(this, 700, 380),
      new Coins(this, 1000, 100),
      new Coins(this, 1300, 250),
      new Coins(this, 1700, 310),
      new Coins(this, 2000, 180)
    ];
    this.background.resize();
    this.platforms.forEach((platform) => {
      platform.resize();
    });
    this.controller.buttons.forEach(button => {
      button.resize();
    });
    this.player.resize();
    this.coins.forEach((coin) => {
      coin.resize();
    });
  }
  checkCollision(player, platform) {
    return (
      player.scaledY + player.scaledHeight <= platform.scaledY && player.scaledY + player.scaledHeight + player.speed.y >= platform.scaledY && player.scaledX + player.scaledWidth >= platform.scaledX && player.scaledX <= platform.scaledX + platform.scaledWidth
    );
  }
  isCollected(rect1, rect2) {
    return (
      rect1.scaledX < rect2.scaledX + rect2.scaledWidth && rect1.scaledX + rect1.scaledWidth > rect2.scaledX && rect1.scaledY < rect2.scaledY + rect2.scaledHeight && rect1.scaledY + rect1.scaledHeight > rect2.scaledY
    );
  }
  isClickedOn(mouse, startButton) {
    return (
      mouse.x < startButton.scaledX + startButton.scaledWidth && mouse.x + mouse.width > startButton.scaledX && mouse.y < startButton.scaledY + startButton.scaledHeight && mouse.y + mouse.height > startButton.scaledY
    );
  }
  drawScoreText() {
    this.ctx.save();
    this.ctx.fillStyle = 'magenta';
    this.ctx.font = `bold ${33 * this.ratio}px Poppins, sans-serif`;
    this.ctx.fillText(`score: ${this.score}`, 40 * this.ratio, 80 * this.ratio);
    this.ctx.restore();
  }
  render() {
    if (window.orientation === 0) {
      this.handleOrientationChange();
    }

    if (this.start) {
      this.background.draw();

      this.drawScoreText();

      this.coins.forEach((coin) => {
        coin.update();
        coin.draw();
      });

      this.platforms.forEach((platform) => {
        platform.draw();
      });

      this.controller.buttons.forEach(button => {
        button.draw();
      });

      this.player.update();
      this.player.draw();
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
          this.platforms.forEach((platform) => {
            platform.moveLeft();
          });
          this.coins.forEach((coin) => {
            coin.moveLeft();
          });
        } else if (this.keys.a.pressed) {
          this.background.moveRight();
          this.platforms.forEach((platform) => {
            platform.moveRight();
          });
          this.coins.forEach((coin) => {
            coin.moveRight();
          });
        } else if (this.lBtn.active) {
          this.background.moveRight();
          this.platforms.forEach((platform) => {
            platform.moveRight();
          });
          this.coins.forEach((coin) => {
            coin.moveRight();
          });
        } else if (this.rBtn.active) {
          this.background.moveLeft();
          this.platforms.forEach((platform) => {
            platform.moveLeft();
          });
          this.coins.forEach((coin) => {
            coin.moveLeft();
          });
        }
      }
      
      this.platforms.forEach((platform) => {
        if (this.checkCollision(this.player, platform)) {
          this.player.speed.y = 0;
        }
      });
    } else {
      this.startButton.draw();
      if (this.isClickedOn(this.mouse, this.startButton)) {
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
