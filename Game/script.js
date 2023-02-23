window.addEventListener('load', function () {


    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d')

    canvas.width = 1500;
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
                }

                //如果使用function(e)这里的this指向的时window不是InputHandler，所以这里可以改成使用箭头函数
            })

            window.addEventListener('keyup', e => {
                if (this.game.keys.indexOf(e.key) > -1) {
                    //splice(start,deleteCount)
                    this.game.keys.splice(this.game.keys.indexOf(e.key), 1)
                }
                console.log(this.game.keys)
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
        }

        update() {
            this.x += this.speed;
            //子弹移动距离为game.width的80%就会被清除
            if (this.x > this.game.width * 0.8) {
                this.markedForDeletion = true
            }

        }

        draw(context) {
            context.fillStyle = 'yellow'
            console.log(context)
            context.fillRect(this.x, this.y, this.width, this.height)
        }
    }

    class Particle {

    }

    class Player {
        constructor(game) {
            this.game = game
            this.width = 120;
            this.height = 190;
            this.x = 20
            this.y = 10
            this.speedY = 0;
            this.maxSpeed = 2;
            this.projectiles = []


        }

        update() {
            if (this.game.keys.includes('ArrowUp')) {
                this.speedY = -this.maxSpeed
            } else if (this.game.keys.includes('ArrowDown')) this.speedY = this.maxSpeed
            else this.speedY = 0
            this.y += this.speedY

            this.projectiles.forEach(projectile => {
                projectile.update()
            })

            this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion)
        }

        draw(context) {
            //context.fillStyle要先设置好
            context.fillStyle = 'black'
            context.fillRect(this.x, this.y, this.width, this.height)
            this.projectiles.forEach(projectile => {
                console.log(projectile);
                projectile.draw(context)
            })
        }

        //发射物从player头顶发射
        shootTop() {
            if (this.game.ammo > 0) {
                // x y 分别为玩家的坐标
                this.projectiles.push(new Projectile(this.game, this.x + 70, this.y + 30))
                this.game.ammo--;
            }



        }


    }

    class Enemy {

    }

    class Background {

    }

    class Game {
        constructor(width, height) {
            this.width = width
            this.height = height;
            this.player = new Player(this);
            this.input = new InputHandler(this)
            this.keys = []
            this.ammo = 20;
            this.maxAmmo = 50;
            this.ammoTimer = 0;
            this.ammoInterval = 500;

        }

        //使用Player里面的方法
        update(deltaTime) {
   
            this.player.update()
            if (this.ammoTimer > this.ammoInterval) {
                if (this.ammo < this.maxAmmo) this.ammo++;
            }else{
            this.ammoTimer += deltaTime 
            }
        }
        draw(context) {
            this.player.draw(context)
        }
    }

    const game = new Game(canvas.width, canvas.height)
    let lastTime = 0; // 储存上次工作的时间


    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.update(deltaTime)
        game.draw(ctx)
        requestAnimationFrame(animate) //无尽调用
    }

    animate()


})

