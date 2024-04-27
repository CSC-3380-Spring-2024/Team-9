import Background from './background.js';
import BackgroundBackHills from './backgroundbackhills.js';
import BackgroundClouds from './backgroundclouds.js';
import BackgroundHills from './backgroundhills.js';
import {Button, ButtonController} from './buttonTouchEvents.js';
import Castle from './castle.js';
import Coins from './coins.js';
import FloatingPlatform from './floatingPlatform.js';
import gameOverButton from './gameOverButton.js';
import LowPowerModeScreen from './lowPowerModeScreen.js';
import Platform from './platform.js';
import Player from './player.js';
import StartButton from './startButton.js';
import winButton from './winButton.js';

interface Mouse {
  x: any;
  y: any;
  width: number;
  height: number;
  pressed: boolean;
}

interface D {
  pressed: boolean;
}

interface A {
  pressed: boolean;
}

interface Keys {
  d: D;
  a: A;
}

class Game {
  public canvas: any;
  public ctx: any;
  private pixelRatio: number;
  public width: number;
  public height: number;
  public baseHeight: number;
  private baseWidth: number;
  public ratio: number;
  private background: Background;
  private backgroundclouds: BackgroundClouds;
  private backgroundbackhills: BackgroundBackHills;
  private backgroundhills: BackgroundHills;
  public player: Player;
  private lastKey: any;
  private lastButton: any;
  private lives: number;
  public coins: Array<Coins>;
  private platforms: Array<Platform>;
  private floatingPlatforms: Array<FloatingPlatform>;
  private castle: Castle;
  public gravity: any;
  private start: boolean;
  private win: boolean;
  private scrollOffset: number;
  private startButton: StartButton;
  private gameOverButton: gameOverButton;
  private winButton: winButton;
  public score: number;
  private orientationMessage: any;
  private mouse: Mouse;
  private keys: Keys;
  private canMove: any;
  private controller: ButtonController;
  private lBtn: Button;
  private rBtn: Button;
  private jBtn: Button;
  private lowPowerMode: LowPowerModeScreen;
  private isLowPowerMode: boolean;
  private frameCount: number;
  private lastFrameTime: any;
  private buttonRatio: any;

  constructor(canvas: any, context: any) {
    this.canvas = canvas;
    this.ctx = context;
    this.buttonRatio;
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
      new Coins(this, 950, 100),
      new Coins(this, 1600, 330),
      new Coins(this, 2100, 120),
      new Coins(this, 3200, 430),
      new Coins(this, 3850, 180),
      new Coins(this, 4640, 200),
      new Coins(this, 5110, 100),
      new Coins(this, 5600, 100),
      new Coins(this, 6250, 100),
      new Coins(this, 6700, 430),
    ];
    this.platforms = [
      new Platform(this, 0, 550, 503, 251, 0, 562, 503, 251),
      new Platform(this, 502, 550, 503, 251, 502, 562, 503, 251),
      new Platform(this, 503 * 2 - 2, 550, 503, 251, 503 * 2 - 2, 562, 503, 251),
      new Platform(this, 2700, 550, 503, 251, 2700, 562, 503, 251),
      new Platform(this, 3202, 550, 503, 251, 3202, 562, 503, 251),
      new Platform(this, 4050, 550, 503, 251, 4050, 562, 503, 251),
      new Platform(this, 6350, 550, 503, 251, 6350, 562, 503, 251),
      new Platform(this, 6851, 550, 503, 251, 6851, 562, 503, 251),
      new Platform(this, 6851, 550, 503, 251, 6851, 562, 503, 251),
      new Platform(this, 7352, 550, 503, 251, 7352, 562, 503, 251),
    ];
    this.floatingPlatforms = [
      new FloatingPlatform(this, 900, 400, 176, 68, 900, 415, 176, 50),
      new FloatingPlatform(this, 1800, 400, 176, 68, 1800, 415, 176, 50),
      new FloatingPlatform(this, 2300, 400, 176, 68, 2300, 415, 176, 50),
      new FloatingPlatform(this, 4800, 400, 176, 68, 4800, 415, 176, 50),
      new FloatingPlatform(this, 5300, 400, 176, 68, 5300, 415, 176, 50),
      new FloatingPlatform(this, 5800, 400, 176, 68, 5800, 415, 176, 50)
    ];

    this.castle = new Castle(this, 7300, 163, 400, 400, 7326, 187, 373, 400);
    this.gravity;

    this.start = false;
    this.win = false;
    this.scrollOffset = 0;
    this.startButton = new StartButton(this, 500, 0, 300, 60, 40);
    this.gameOverButton = new gameOverButton(this, 300, 60, 40);
    this.winButton = new winButton(this, 300, 60, 40)

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

    this.lowPowerMode = new LowPowerModeScreen(this, 0, 0, 1700, 720, 40);
    this.isLowPowerMode = false;
    this.resize(window.innerWidth, window.innerHeight);

    window.addEventListener('resize', e => {
      this.resize(window.innerWidth, window.innerHeight);
    });

    window.addEventListener('keydown', (event: any) => {
      switch (event.key) {
        case ' ':
          if (this.checkIfAtEnd(this.player, this.castle) && this.score === 10) {
            this.win = true;
          } else {
            this.player.jump();
          }
          //this.player.jump();
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
    window.addEventListener('keyup', (event: any) => {
      switch (event.key) {
        case 'd':
          this.keys.d.pressed = false;
          break;
        
        case 'a':
          this.keys.a.pressed = false;
          break;
      }
    });
    window.addEventListener('mousedown', (e: any) => {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
      this.mouse.pressed = true;
    });
    window.addEventListener('mouseup', (e: any) => {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
      this.mouse.pressed = false;
    });
    window.addEventListener('touchstart', (e: any) => {
      this.mouse.x = e.changedTouches[0].pageX;
      this.mouse.y = e.changedTouches[0].pageY;
      this.mouse.pressed = true;
      this.controller.touchStart(e);
      if (this.jBtn.active) {
        if (this.checkIfAtEnd(this.player, this.castle) && this.score === 10) {
          this.win = true;
        } else {
          this.player.jump();
        }
      }
      if (this.rBtn.active) {
        this.lastButton = 'right';
      }
      if (this.lBtn.active) {
        this.lastButton = 'left';
      }
    }, { passive: false });

    window.addEventListener('touchend', (e: any) => {
      this.mouse.x = e.changedTouches[0].pageX;
      this.mouse.y = e.changedTouches[0].pageY;
      this.mouse.pressed = false;
      this.controller.touchEnd(e);
    });
    window.addEventListener('orientationchange', () => {
      this.handleOrientationChange();
    });

    this.frameCount = 0;
    this.lastFrameTime = performance.now();
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
    this.background.resize();
    this.backgroundclouds.resize();
    this.backgroundbackhills.resize();
    this.backgroundhills.resize();
    this.floatingPlatforms.forEach((floatingPlatform) => {
      floatingPlatform.resize();
    });
    this.platforms.forEach((platform: Platform) => {
      platform.resize();
    });
    this.castle.resize();
    this.controller.buttons.forEach((button: Button) => {
      button.resizeButtons();
    });
    this.player.resize();
    this.coins.forEach((coin: Coins) => {
      coin.resize();
    });
  }
  resetLives() {
    this.lives = 3;
  }
  resetCoins() {
    this.coins = [
      new Coins(this, 950, 100),
      new Coins(this, 1600, 330),
      new Coins(this, 2100, 120),
      new Coins(this, 3200, 430),
      new Coins(this, 3850, 180),
      new Coins(this, 4640, 200),
      new Coins(this, 5110, 100),
      new Coins(this, 5600, 100),
      new Coins(this, 6250, 100),
      new Coins(this, 6700, 430),
    ];
  }
  resize(width: number, height: number) {
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

    this.lowPowerMode.resize();
    this.startButton.resize();
    this.winButton.resize();
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
  checkCollision(player: any, platform: any) {
    return (
      player.hitBoxY + player.hitBoxHeight <= platform.hitBoxY && player.hitBoxY + player.hitBoxHeight + player.speed.y >= platform.hitBoxY && player.hitBoxX + player.hitBoxWidth >= platform.hitBoxX && player.hitBoxX <= platform.hitBoxX + platform.hitBoxSWidth
    );
  }
  checkIfAtEnd(player: Player, castle: Castle) {
    return (
      player.hitBoxX < castle.hitBoxX + castle.hitBoxSWidth && player.hitBoxX + player.hitBoxWidth > castle.hitBoxX && player.hitBoxY < castle.hitBoxY + castle.hitBoxSHeight && player.hitBoxY + player.hitBoxHeight > castle.hitBoxY
    );
  }
  isCollected(a: any, b: any) {
    const dx: number = a.currentCollisionX - b.currentCollisionX;
    const dy: number = a.currentCollisionY - b.currentCollisionY;
    const distance: number = Math.hypot(dx, dy);
    const sumOfRadii: number = a.collisionRadius + b.collisionRadius;
    return distance <= sumOfRadii;
  }
  isClickedOn(mouse: any, startButton: any) {
    return (
      mouse.x < startButton.scaledX + startButton.scaledWidth && mouse.x + mouse.width > startButton.scaledX && mouse.y < startButton.scaledY + startButton.scaledHeight && mouse.y + mouse.height > startButton.scaledY
    );
  }
  isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints;
  }
  drawScoreText() {
    this.ctx.save();
    this.ctx.fillStyle = 'black';
    this.ctx.font = `600 ${33 * this.ratio}px Pixelify Sans, sans-serif`;
    this.ctx.fillText(`score: ${this.score}`, 76 * this.ratio, 80 * this.ratio);
    for (let i = 0; i < this.lives; i++) {
      this.ctx.drawImage(document.getElementById('lives'), (60 + 60 * i) * this.ratio, 100 * this.ratio, 64 * this.ratio, 64 * this.ratio);
    }
    this.ctx.restore();
  }
  checkLowPowerMode() {
    let val: boolean = false;
    if (this.isLowPowerMode) {
      val = true;
    } else {
      val = false;
    }
    return val;
  }
  render(currentTime: number) {
    const deltaTime: number = currentTime - this.lastFrameTime;
    this.frameCount++;
    if (deltaTime >= 500) {
      if (this.frameCount > 20) {
        this.isLowPowerMode = false;
      } else {
        this.isLowPowerMode = true;
      }
      this.frameCount = 0;
      this.lastFrameTime = currentTime;
    }

    if (window.innerWidth < window.innerHeight) {
      this.handleOrientationChange();
    }
    if (!this.checkLowPowerMode()) {
      if (this.start && this.lives >= 1 && !this.win) {
        this.background.update();
        this.background.draw();
        this.backgroundclouds.update();
        this.backgroundclouds.draw();
        this.backgroundbackhills.update();
        this.backgroundbackhills.draw();
        this.backgroundhills.update();
        this.backgroundhills.draw();
  
        this.coins.forEach((coin: Coins) => {
          coin.update();
          coin.draw();
        });
  
        this.castle.update();
        this.castle.draw();
  
        this.player.update();
        this.player.draw();
  
        this.floatingPlatforms.forEach((floatingPlatform: FloatingPlatform) => {
          floatingPlatform.update();
          floatingPlatform.draw();
        });
  
        this.platforms.forEach((platform: Platform) => {
          platform.update();
          platform.draw();
        });

        this.drawScoreText();
  
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
              if (this.castle.scaledX + this.castle.scaledWidth > this.width) {
                this.background.moveLeft();
                this.backgroundclouds.moveLeft();
                this.backgroundbackhills.moveLeft();
                this.backgroundhills.moveLeft();
                this.castle.moveLeft();
                this.floatingPlatforms.forEach((floatingPlatform: FloatingPlatform) => {
                  floatingPlatform.moveLeft();
                });
                this.platforms.forEach((platform: Platform) => {
                  platform.moveLeft();
                  this.scrollOffset -= 9 * this.ratio;
                });
                this.coins.forEach((coin: Coins) => {
                  coin.moveLeft();
                });
              } else {
                if (this.player.scaledX + this.player.scaledWidth < this.width) {
                  this.player.moveRight();
                }
              }
            } else if (this.keys.a.pressed) {
              if (this.scrollOffset < 0) {
                this.background.moveRight();
                this.backgroundclouds.moveRight();
                this.backgroundbackhills.moveRight();
                this.backgroundhills.moveRight();
                this.castle.moveRight();
                this.floatingPlatforms.forEach((floatingPlatform: FloatingPlatform) => {
                  floatingPlatform.moveRight();
                });
                this.platforms.forEach((platform: Platform) => {
                  platform.moveRight();
                  this.scrollOffset += 9 * this.ratio;
                });
                this.coins.forEach((coin: Coins) => {
                  coin.moveRight();
                });
              } else {
                if (this.player.scaledX > 0) {
                  this.player.moveLeft();
                }
              }
            } else if (this.lBtn.active) {
              if (this.scrollOffset < 0) {
                this.background.moveRight();
                this.backgroundclouds.moveRight();
                this.backgroundbackhills.moveRight();
                this.backgroundhills.moveRight();
                this.castle.moveRight();
                this.floatingPlatforms.forEach((floatingPlatform: FloatingPlatform) => {
                  floatingPlatform.moveRight();
                });
                this.platforms.forEach((platform: Platform) => {
                  platform.moveRight();
                  this.scrollOffset += 9 * this.ratio;
                });
                this.coins.forEach((coin: Coins) => {
                  coin.moveRight();
                });
              } else {
                if (this.player.scaledX > 0) {
                  this.player.moveLeft();
                }
              }
            } else if (this.rBtn.active) {
              if (this.castle.scaledX + this.castle.scaledWidth > this.width) {
                this.background.moveLeft();
                this.backgroundclouds.moveLeft();
                this.backgroundbackhills.moveLeft();
                this.backgroundhills.moveLeft();
                this.castle.moveLeft();
                this.floatingPlatforms.forEach((floatingPlatform: FloatingPlatform) => {
                  floatingPlatform.moveLeft();
                });
                this.platforms.forEach((platform: Platform) => {
                  platform.moveLeft();
                  this.scrollOffset -= 9 * this.ratio;
                });
                this.coins.forEach((coin: Coins) => {
                  coin.moveLeft();
                });
              } else {
                if (this.player.scaledX + this.player.scaledWidth < this.width) {
                  this.player.moveRight();
                }
              }
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
            this.player.hitBoxPosition.x = 88.8 * this.ratio;
          } else if (this.rBtn.active && this.lastButton === 'right' && this.player.currentSprite !== this.player.sprites.run.right) {
            this.player.currentSprite = this.player.sprites.run.right;
            this.player.currentSpriteX = this.player.sprites.run.x;
            this.player.currentSpriteY = this.player.sprites.run.y;
            this.player.currentSpriteWidth = this.player.sprites.run.width;
            this.player.currentSpriteHeight = this.player.sprites.run.height;
            this.player.currentCircleX = 0.77;
            this.player.hitBoxPosition.x = 88.8 * this.ratio;
          } else if (this.keys.a.pressed && this.lastKey === 'left' && this.player.currentSprite !== this.player.sprites.run.left) {
            this.player.currentSprite = this.player.sprites.run.left;
            this.player.currentSpriteX = this.player.sprites.run.x;
            this.player.currentSpriteY = this.player.sprites.run.y;
            this.player.currentSpriteWidth = this.player.sprites.run.width;
            this.player.currentSpriteHeight = this.player.sprites.run.height;
            this.player.currentCircleX = 0.23;
            this.player.hitBoxPosition.x = 72 * this.ratio;
          } else if (this.lBtn.active && this.lastButton === 'left' && this.player.currentSprite !== this.player.sprites.run.left) {
            this.player.currentSprite = this.player.sprites.run.left;
            this.player.currentSpriteX = this.player.sprites.run.x;
            this.player.currentSpriteY = this.player.sprites.run.y;
            this.player.currentSpriteWidth = this.player.sprites.run.width;
            this.player.currentSpriteHeight = this.player.sprites.run.height;
            this.player.currentCircleX = 0.23;
            this.player.hitBoxPosition.x = 72 * this.ratio;
          } else if (!this.keys.a.pressed && this.lastKey === 'left' && this.player.currentSprite !== this.player.sprites.stand.left) {
            this.player.currentSprite = this.player.sprites.stand.left;
            this.player.currentSpriteX = this.player.sprites.stand.x;
            this.player.currentSpriteY = this.player.sprites.stand.y;
            this.player.currentSpriteWidth = this.player.sprites.stand.width;
            this.player.currentSpriteHeight = this.player.sprites.stand.height;
            this.player.currentCircleX = 0.23;
            this.player.hitBoxPosition.x = 72 * this.ratio;
          } else if (!this.lBtn.active && this.lastButton === 'left' && this.player.currentSprite !== this.player.sprites.stand.left) {
            this.player.currentSprite = this.player.sprites.stand.left;
            this.player.currentSpriteX = this.player.sprites.stand.x;
            this.player.currentSpriteY = this.player.sprites.stand.y;
            this.player.currentSpriteWidth = this.player.sprites.stand.width;
            this.player.currentSpriteHeight = this.player.sprites.stand.height;
            this.player.currentCircleX = 0.23;
            this.player.hitBoxPosition.x = 72 * this.ratio;
          } else if (!this.keys.d.pressed && this.lastKey === 'right' && this.player.currentSprite !== this.player.sprites.stand.right) {
            this.player.currentSprite = this.player.sprites.stand.right;
            this.player.currentSpriteX = this.player.sprites.stand.x;
            this.player.currentSpriteY = this.player.sprites.stand.y;
            this.player.currentSpriteWidth = this.player.sprites.stand.width;
            this.player.currentSpriteHeight = this.player.sprites.stand.height;
            this.player.currentCircleX = 0.77;
            this.player.hitBoxPosition.x = 88.8 * this.ratio;
          } else if (!this.rBtn.active && this.lastButton === 'right' && this.player.currentSprite !== this.player.sprites.stand.right) {
            this.player.currentSprite = this.player.sprites.stand.right;
            this.player.currentSpriteX = this.player.sprites.stand.x;
            this.player.currentSpriteY = this.player.sprites.stand.y;
            this.player.currentSpriteWidth = this.player.sprites.stand.width;
            this.player.currentSpriteHeight = this.player.sprites.stand.height;
            this.player.currentCircleX = 0.77;
            this.player.hitBoxPosition.x = 88.8 * this.ratio;
          }
        }
  
        this.floatingPlatforms.forEach((floatingPlatform: FloatingPlatform) => {
          if (this.checkCollision(this.player, floatingPlatform)) {
            this.player.speed.y = 0;
          }
        });
        
        this.platforms.forEach((platform: Platform) => {
          if (this.checkCollision(this.player, platform)) {
            this.player.speed.y = 0;
          }
        });
  
        if (this.player.scaledY > this.height) {
          this.player.reset = true;
          this.background.resizeXPos();
          this.backgroundclouds.resizeXPos();
          this.backgroundbackhills.resizeXPos();
          this.backgroundhills.resizeXPos();
          this.castle.resizeXYPos();
          this.floatingPlatforms.forEach((floatingPlatform: FloatingPlatform) => {
            floatingPlatform.resizeXYPos();
          });
          this.platforms.forEach((platform: Platform) => {
            platform.resizeXYPos();
          });
          this.controller.buttons.forEach((button: Button) => {
            button.resizeButtons();
          });
          this.player.resizeXPos();
          this.resetCoins();
          this.coins.forEach((coin: Coins) => {
            coin.resizeXPos();
          });
          this.scrollOffset = 0;
          this.score = 0;
          this.lives--;
        }
  
        if (this.pixelRatio >= 3) {
          this.controller.buttons.forEach((button: Button) => {
            button.draw();
          });
        } else if (this.pixelRatio === 2 && this.isTouchDevice()) {
          this.controller.buttons.forEach((button: Button) => {
            button.draw();
          });
        }
      }
      else if (this.start && this.lives < 1) {
        this.gameOverButton.draw();
        if (this.mouse.pressed && this.isClickedOn(this.mouse, this.gameOverButton)) {
          this.resetLives();
          this.score = 0;
          this.scrollOffset = 0;
          this.resetCoins();
          this.background.resizeXPos();
          this.backgroundclouds.resizeXPos();
          this.backgroundbackhills.resizeXPos();
          this.backgroundhills.resizeXPos();
          this.castle.resizeXYPos();
          this.floatingPlatforms.forEach((floatingPlatform: FloatingPlatform) => {
            floatingPlatform.resizeXYPos();
          });
          this.platforms.forEach((platform: Platform) => {
            platform.resizeXYPos();
          });
          this.controller.buttons.forEach((button: Button) => {
            button.resizeButtons();
          });
          this.player.resizeXPos();
          this.coins.forEach((coin: Coins) => {
            coin.resizeXPos();
          });
        }
      }
      else if (this.start && this.lives >= 1 && this.win) {
        this.winButton.draw();
        if (this.mouse.pressed && this.isClickedOn(this.mouse, this.winButton)) {
          this.win = false;
          this.resetLives();
          this.score = 0;
          this.scrollOffset = 0;
          this.resetCoins();
          this.background.resizeXPos();
          this.backgroundclouds.resizeXPos();
          this.backgroundbackhills.resizeXPos();
          this.backgroundhills.resizeXPos();
          this.castle.resizeXYPos();
          this.floatingPlatforms.forEach((floatingPlatform: FloatingPlatform) => {
            floatingPlatform.resizeXYPos();
          });
          this.platforms.forEach((platform: Platform) => {
            platform.resizeXYPos();
          });
          this.controller.buttons.forEach((button: Button) => {
            button.resizeButtons();
          });
          this.player.resizeXPos();
          this.coins.forEach((coin: Coins) => {
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
    } else {
      this.lowPowerMode.draw();
    }
    
  }
}

export default Game;

window.addEventListener('load', function() {
  const canvas: any = document.getElementById('canvas');
  const ctx: any = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const game: Game = new Game(canvas, ctx);
  
  function animate(currentTime: number) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render(currentTime);
    requestAnimationFrame(animate);
  }

  this.requestAnimationFrame(animate);
});