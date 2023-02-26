window.addEventListener('load', function () {


    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d')

    canvas.width = 1000;
    canvas.height = 500;


    class InputHandler {
        constructor(game) {
            this.game = game;
            //&& 保证game.keys[]数组里面只添加一次
            window.addEventListener('keydown', (e) => {
                if (((e.key === 'ArrowUp') || (e.key === 'ArrowDown')) && this.game.keys.indexOf(e.key) === -1) {
                    this.game.keys.push(e.key)
                } else if (e.key === ' ') {
                    this.game.player.shootTop()
                } else if (e.key === 'd') {
                    this.game.debug = !this.game.debug
                }

                //如果使用function(e)这里的this指向的时window不是InputHandler，所以这里可以改成使用箭头函数
            })

            window.addEventListener('keyup', e => {
                if (this.game.keys.indexOf(e.key) > -1) {
                    //splice(start,deleteCount)
                    this.game.keys.splice(this.game.keys.indexOf(e.key), 1)
                }

            })
        }
    }


    //发射物
    class Projectile {
        constructor(game, x, y) {
            this.game = game;
            this.x = x;
            this.y = y;
            this.width = 10
            this.height = 3;
            this.speed = 3;
            //是否被清除
            this.markedForDeletion = false;
            this.image = document.getElementById('projectile')
        }

        update() {
            this.x += this.speed;
            //子弹移动距离为game.width的80%就会被清除
            if (this.x > this.game.width * 0.95) {
                this.markedForDeletion = true
            }

        }

        draw(context) {
            context.drawImage(this.image, this.x, this.y)
        }
    }   

    //TODO 掉落部件 齿轮
    class Particle {
        constructor(game, x, y) {
            this.game = game;
            this.x = x;
            this.y = y;
            this.image = document.getElementById('gears')
            this.frameX = Math.floor(Math.random() * 3)
            this.frameY = Math.floor(Math.random() * 3)
            this.spriteSize = 50;
            this.sizeModifier = (Math.random() * 0.5 + 0.5).toFixed(1)
            this.size = this.spriteSize * this.sizeModifier
            this.speedX = Math.random() * 6 - 3
            this.speedY = Math.random() * -15;
            this.gravity = 0.5
            this.markedForDeletion = false;
            this.angle = 0;
            this.va = Math.random() * 0.2 - 0.1
        }
        update() {
            this.angle += this.va
            this.speedY += this.gravity
            this.x -= this.speedX;
            this.y += this.speedY
            if (this.y > this.game.height + this.size || this.x < 0 - this.size) {
                this.markedForDeletion = true;
            }
        }

        draw(context) {
            context.drawImage(this.image, this.frameX * this.spriteSize, this.frameY * this.spriteSize, this.spriteSize, this.spriteSize, this.x, this.y, this.size, this.size)
        }

    }

    class Player {
        constructor(game) {
            this.game = game
            this.width = 120;
            this.height = 190;
            this.x = 20
            this.y = 90
            //精灵图循环
            this.frameX = 0;
            this.frameY = 0;
            this.maxFrame = 37;
            this.speedY = 0;
            this.maxSpeed = 2;
            this.projectiles = []
            this.image = document.getElementById('player')
            this.powerUp = false;
            this.powerUpTimer = 0;
            this.powerUpLimit = 5000;

        }

        update(deltaTime) {
            if (this.game.keys.includes('ArrowUp')) {
                this.speedY = -this.maxSpeed
            } else if (this.game.keys.includes('ArrowDown')) this.speedY = this.maxSpeed

            else this.speedY = 0
            this.y += this.speedY

            //边界建立
            if (this.y > this.game.height - this.height * 0.5) this.y = this.game.height - this.height * 0.5
            else if (this.y < -this.height * 0.5) this.y = -this.height * 0.5



            this.projectiles.forEach(projectile => {
                projectile.update()
            })

            this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion)

            //animate 动画
            if (this.frameX < this.maxFrame) {
                this.frameX++
            } else {
                this.frameX = 0
            }

            if (this.powerUp) {
                if (this.powerUpTimer > this.powerUpLimit) {
                    this.powerUp = false;
                    this.frameY = 0;

                } else {
                    this.powerUpTimer += deltaTime
                    this.frameY = 1
                    this.game.ammo += 0.1
                }
            }
        }

        draw(context) {

            if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height)

            //发射物生成
            this.projectiles.forEach(projectile => {
                projectile.draw(context)
            })


            //TODO 好像 2 - 5的属性是切图用的
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height)


        }

        //发射物从player头顶发射
        shootTop() {
            if (this.game.ammo > 0) {
                // x y 分别为玩家的坐标
                this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 30))
                this.game.ammo--;
            }

            if (this.powerUp) this.shootBottom()
        }


        shootBottom() {
            if (this.game.ammo > 0) {
                this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 175))
            }
        }

        enterPowerUp() {
            this.powerUpTimer = 0;
            this.powerUp = true;
            //TODO 这里会有一个问题，update()里当处于PowerUp状态时候，this.game.ammo += 0.1会突破最大限制，当突破后，再碰上luckyFish，ammo数量就会减少
            if (this.game.ammo < this.game.maxAmmo) {
                this.game.ammo = this.game.maxAmmo
            }

        }

    }

    class Enemy {
        constructor(game) {
            this.game = game;
            this.x = this.game.width;
            this.speedX = Math.random() * -5
            // Math.random() * -15 - 0.5
            this.markedForDeletion = false;
            this.frameX = 0;
            this.frameY = 0;
            this.maxFrame = 37;
        }
        update() {
            //TODO this.width 由子代的contructor定义
            this.x += this.speedX - this.game.speed //绑定游戏速度
            if (this.x + this.width < 0) this.markedForDeletion = true;
            if (this.frameX < this.maxFrame) {
                this.frameX++
            } else this.frameX = 0
        }
        draw(context) {
            if (this.game.debug) {
                context.strokeRect(this.x, this.y, this.width, this.height)
                context.fillStyle = 'black'
                context.font = '20px Helvetica'
                context.fillText(this.lives, this.x, this.y)
            }

            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height)


        }

    }

    //sub class
    class Angler1 extends Enemy {
        constructor(game) {
            super(game)
            this.width = 228
            this.height = 169
            this.y = Math.random() * (this.game.height * 0.8 - this.height)
            this.image = document.getElementById('angler1')
            this.frameY = Math.floor(Math.random() * 3)
            this.lives = 2;
            this.score = this.lives;
        }

    }

    class Angler2 extends Enemy {
        constructor(game) {
            super(game)
            this.width = 213
            this.height = 165
            this.y = Math.random() * (this.game.height * 0.8 - this.height)
            this.image = document.getElementById('angler2')
            this.frameY = Math.floor(Math.random() * 2)
            this.lives = 3;
            this.score = this.lives;
        }

    }

    class LuckyFish extends Enemy {
        constructor(game) {
            super(game)
            this.width = 99
            this.height = 95
            this.y = Math.random() * (this.game.height * 0.8 - this.height)
            this.image = document.getElementById('lucky')
            this.frameY = Math.floor(Math.random() * 2)
            this.lives = 2;
            this.score = 15
            this.type = 'lucky'
        }

    }



    class Layer {
        constructor(game, image, speedModifier) {
            this.game = game;
            this.image = image;
            this.speedModifier = speedModifier;
            this.width = 1768;
            this.x = 0;
            this.y = 0;
        }

        update() {
            if (this.x < -this.width) this.x = 0;
            else this.x -= (this.speedModifier * this.game.speed)
        }

        draw(context) {
            //TODO drawImage
            //使用两个图层实现无缝地拼贴

            //TODO 两段图片拼成一段长图片, 从 x = 0 开始, 当图层1的末尾移除屏幕时,图层2的位置正好为 x = 0 (this.x + this.width), 接下来图层1的位置又会变回x = 0, 图层2的位置则变为 0 + this.width
            context.drawImage(this.image, this.x, this.y)

            context.drawImage(this.image, this.x + this.width, this.y)


        }
    }

    class Background {
        constructor(game) {
            this.game = game;
            this.image1 = document.getElementById('layer1')
            this.image2 = document.getElementById('layer2')
            this.image3 = document.getElementById('layer3')
            this.image4 = document.getElementById('layer4')
            this.layer1 = new Layer(this.game, this.image1, 0.2)
            this.layer2 = new Layer(this.game, this.image2, 0.4)
            this.layer3 = new Layer(this.game, this.image3, 1)
            this.layer4 = new Layer(this.game, this.image4, 1.2)
            this.layers = [this.layer1, this.layer2, this.layer3]

        }

        update() {
            this.layers.forEach(layer => layer.update());
        }

        draw(context) {
            this.layers.forEach(layer => layer.draw(context))
        }
    }

    class UI {
        constructor(game) {
            this.game = game;
            this.fontSize = 25;
            this.fontFamily = 'Bangers'
            this.color = 'white';

        }

        draw(context) {
            //TODO save() -- 只将效果作用于save - restore之间?
            context.save()
            context.fillStyle = this.color
            context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;
            context.shadowColor = 'black'
            //TODO 'px '后面要有空格，否则会有问题
            context.font = this.fontSize + 'px ' + this.fontFamily;
            console.log(context)
            //score
            context.fillText('Score: ' + this.game.score, 20, 40)


            //timer
            const formattedTime = (this.game.gameTime * 0.001).toFixed(1)
            //TODO *0.01 是将毫秒转化为秒 toFixed是为了固定小数点
            context.fillText('Timer: ' + formattedTime, 20, 100)

            if (this.game.gameOver) {
                context.textAlign = 'center'
                let message1;
                let message2;
                if (this.game.score > this.game.winningScore) {
                    message1 = 'You Win'
                    message2 = 'Well Done'
                } else {
                    message1 = 'You Lose! xxxx'
                    message2 = 'Try again  next time!'
                }

                //font 'px '都是要有空格
                context.font = '70px ' + this.fontFamily
                context.fillText(message1, this.game.width * 0.5, this.game.height * 0.5 - 30)
                context.font = '25px ' + this.fontFamily
                context.fillText(message2, this.game.width * 0.5, this.game.height * 0.5)

            }

            //ammo
            if (this.game.player.powerUp) context.fillStyle = 'yellow'
            for (let i = 0; i < this.game.ammo; i++) {
                context.fillRect(20 + 5 * i, 50, 3, 20)

            }

            //TODO canvas.restore()
            context.restore()
        }
    }

    class Game {
        constructor(width, height) {
            this.width = width
            this.height = height;
            //创建对象
            this.player = new Player(this);
            this.input = new InputHandler(this)
            this.ui = new UI(this)
            this.background = new Background(this)

            //key
            this.keys = []
            //enemy
            this.enemies = []
            this.particles = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            //ammo
            this.ammo = 2;
            this.maxAmmo = 5;
            this.ammoTimer = 0;
            this.ammoInterval = 500;
            this.gameOver = false;
            this.score = 0;
            this.winningScore = 2000
            this.gameTime = 0;
            this.timeLimit = 50000;
            this.speed = 1
            this.debug = false

        }

        //使用Player里面的方法
        update(deltaTime) {
            //时间限制
            //如果游戏不结束 游戏时间就会增加
            if (!this.gameOver) this.gameTime += deltaTime
            if (this.gameTime > this.timeLimit) this.gameOver = true;

            this.background.update()
            this.player.update(deltaTime)
            this.background.layer4.update()

            //ammoTimer是冷却计时器，一旦可以达到可以增加子弹的条，就会增加子弹，同时将计时器归零
            if (this.ammoTimer > this.ammoInterval) {
                //子弹生成速度
                if (this.ammo < this.maxAmmo) this.ammo += 1;
                this.ammoTimer = 0;
            } else {
                this.ammoTimer += deltaTime
            }

            //齿轮
            this.particles.forEach(particle => particle.update());
            this.particles = this.particles.filter(particle => !particle.markedForDeletion)

            //enemy
            this.enemies.forEach(enemy => {
                enemy.update();
                //判断敌人是否与玩家发生碰撞 
                if (this.checkCollision(this.player, enemy)) {
                    enemy.markedForDeletion = true
                    if (enemy.type == 'lucky') this.player.enterPowerUp()
                    else this.score--
                    //掉落齿轮数
                    for (let i = 0; i < enemy.lives * 2; i++) {
                        this.particles.push(new Particle(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5))
                    }
                }

                //判断敌人是否与发射物进行碰撞
                this.player.projectiles.forEach(projectile => {
                    if (this.checkCollision(projectile, enemy)) {
                        //发射物和敌人碰撞
                        enemy.lives--;
                        //发生撞击后子弹也要消失
                        projectile.markedForDeletion = true
                        //掉落齿轮数
                        for (let i = 0; i < 2; i++) {
                            this.particles.push(new Particle(this, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5))
                        }

                        //敌人死亡
                        if (enemy.lives <= 0) {
                            enemy.markedForDeletion = true

                            if (!this.gameOver) {
                                this.score += enemy.score;
                            }

                            if (this.score > this.winningScore) this.gameOver = true;
                        }

                    }
                })
            })

            //对敌人数组进行过滤, 会影响到this.draw(context)中敌人的绘制
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion)

            //生成新敌人的条件
            if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime
            }
        }
        draw(context) {
            this.background.draw(context)
            this.player.draw(context)
            this.ui.draw(context)
            this.particles.forEach(partile => partile.draw(context))
            //在enemies数组中的敌人才会绘制
            this.enemies.forEach(enemy => {
                enemy.draw(context)
            })
            this.background.layer4.draw(context)
        }
        addEnemy() {
            const randomize = Math.random()
            if (randomize < 0.3) this.enemies.push(new Angler1(this))
            else if (randomize < 0.6) this.enemies.push(new Angler2(this))
            else this.enemies.push(new LuckyFish(this))
        }

        //可以画图来确认
        checkCollision(rect1, rect2) {
            return (
                //玩家的右边界 > 敌人的左边界
                rect1.width + rect1.x > rect2.x &&
                //玩家的左边界 < 敌人的右边界
                rect1.x < rect2.width + rect2.x &&
                //玩家的下边界 > 敌人的上边界
                rect1.height + rect1.y > rect2.y &&
                //玩家的上边界 < 敌人的下边界
                rect1.y < rect2.height + rect2.y
            )
        }
    }

    const game = new Game(canvas.width, canvas.height)
    let lastTime = 0; // 储存上次工作的时间
    console.log(game)

    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.update(deltaTime)
        game.draw(ctx)
        requestAnimationFrame(animate) //无尽调用
    }

    animate(0)


})

