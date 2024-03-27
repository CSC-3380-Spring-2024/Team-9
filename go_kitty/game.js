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
    this.platforms = [
      new Platform(this, 0, 469, 700, 250),
      new Platform(this, 699, 469, 700, 250),
      new Platform(this, 700 * 2 - 2, 469, 700, 250)
    ];
    this.gravity;
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
      fired: false
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
    
    this.lBtn = new Button(300, 676, 160, 160, "purple", this);
    this.rBtn = new Button(600, 676, 160, 160, "red", this);
    this.jBtn = new Button(1570, 676, 160, 160, "grey", this);
    
    
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
    window.addEventListener('touchstart', e => {
      this.controller.touchStart(e);
      if (this.jBtn.active) {
        this.player.jump();
      }
    }, { passive: false });

    window.addEventListener('touchend', e => {
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
    this.background.resize();
    this.platforms.forEach((platform) => {
      platform.resize();
    });
    this.controller.buttons.forEach(button => {
      button.resize();
    });
    this.player.resize();
  }
  checkCollision(player, platform) {
    return (
      player.scaledY + player.scaledHeight <= platform.scaledY && player.scaledY + player.scaledHeight + player.speed.y >= platform.scaledY && player.scaledX + player.scaledWidth >= platform.scaledX && player.scaledX <= platform.scaledX + platform.scaledWidth
    );
  }
  render() {
    if (window.orientation === 0) {
      this.handleOrientationChange();
    }
    this.background.draw();

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
      } else if (this.keys.a.pressed) {
        this.background.moveRight();
        this.platforms.forEach((platform) => {
          platform.moveRight();
        });
      } else if (this.lBtn.active) {
        this.background.moveRight();
        this.platforms.forEach((platform) => {
          platform.moveRight();
        });
      } else if (this.rBtn.active) {
        this.background.moveLeft();
        this.platforms.forEach((platform) => {
          platform.moveLeft();
        });
      }
    }
    
    this.platforms.forEach((platform) => {
      if (this.checkCollision(this.player, platform)) {
        this.player.speed.y = 0;
      }
    });

    
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
