class Game {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.ctx = context;
    this.pixelRatio = window.devicePixelRatio || 1;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.baseHeight = 720;
    this.ratio = this.height / this.baseHeight;
    this.background = new Background(this);
    this.player = new Player(this);
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
    
    this.lBtn = new Button(100, 100, 100, 100, "purple", this);
    this.rBtn = new Button(300, 100, 100, 100, "red", this);
    this.jBtn = new Button(500, 100, 100, 100, "grey", this);
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
    if (window.orientation === 0) { // Portrait mode
      this.canvas.style.display = 'none';
      this.orientationMessage.style.display = 'block';
    } else { // Landscape mode
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
    this.ratio = this.height / this.baseHeight;
    this.gravity = 1.5 * this.ratio;
    this.background.resize();
    this.controller.buttons.forEach(button => {
      button.resize();
    });
    this.player.resize();
  }
  checkCollision(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y
    );
  }
  render() {
    if (window.orientation === 0) {
      this.handleOrientationChange();
    }
    if (this.keys.d.pressed && this.player.position.x < 400) {
      console.log('what');
      this.player.moveRight();
    } else if (this.keys.a.pressed && this.player.position.x > 100) {
      this.player.moveLeft();
    } else if (this.lBtn.active && this.player.position.x > 100) {
      this.player.moveLeft();
    } else if (this.rBtn.active && this.player.position.x < 400) {
      this.player.moveRight();
    } else {
      this.player.fullStop();

      if (this.keys.d.pressed) {
        this.background.moveLeft();
      } else if (this.keys.a.pressed) {
        this.background.moveRight();
      } else if (this.lBtn.active) {
        this.background.moveRight();
      } else if (this.rBtn.active) {
        this.background.moveLeft();
      }
    }
    this.background.update();
    this.background.draw();

    this.controller.buttons.forEach(button => {
      button.draw();
    });

    this.player.update();
    this.player.draw();

    
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
