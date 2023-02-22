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
                }

                //如果使用function(e)这里的this指向的时window不是InputHandler，所以这里可以改成使用箭头函数
                console.log(this)
                console.log(this.game.keys)
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

    class Projectile {

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


        }

        update() {
            this.y += this.speedY
        }

        draw(context) {
            context.fillRect(this.x, this.y, this.width, this.height)
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
        }

        //使用Player里面的方法
        update() {
            this.player.update()
        }
        draw(context) {
            this.player.draw(context)
        }
    }

    const game = new Game(canvas.width, canvas.height)
    console.log(game)
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.update()
        game.draw(ctx)
        requestAnimationFrame(animate) //无尽调用
    }

    animate()


})

