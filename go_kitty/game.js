class Game {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.ctx = context;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.player = new Player(this);
    this.gravity = 1.5;
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
    
    this.lBtn = new Button(100, 100, 100, 100, "purple");
    this.rBtn = new Button(300, 100, 100, 100, "red");
    this.jBtn = new Button(500, 100, 100, 100, "grey");
    this.controller.addButton(this.lBtn);
    this.controller.addButton(this.rBtn);
    this.controller.addButton(this.jBtn);

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
  }
  checkCollision(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y
    );
  }
  render() {
    this.player.fullStop();
    if (this.keys.d.pressed) {
      this.player.moveRight();
    } else if (this.keys.a.pressed) {
      this.player.moveLeft();
    } else if (this.lBtn.active) {
      this.player.moveLeft();
    } else if (this.rBtn.active) {
      this.player.moveRight();
    }

    this.controller.buttons.forEach(button => {
      this.ctx.fillStyle = button.color;
      this.ctx.fillRect(button.x, button.y, button.width, button.height);
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

  let rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * devicePixelRatio;
  canvas.height = rect.height * devicePixelRatio;
  
  ctx.scale(devicePixelRatio, devicePixelRatio);
  
  canvas.style.width = rect.width + 'px';
  canvas.style.height = rect.height + 'px';
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render();
    requestAnimationFrame(animate);
  }
  this.requestAnimationFrame(animate);
});