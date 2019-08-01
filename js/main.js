!function () {
    let timeID
    let btn = document.querySelector('#btn')
    map.classList.add('appear')

    btn.addEventListener('click', () => {
        play()
        btn.disabled = true
        map.classList.remove('appear')
    })
    let stop = document.querySelector('#stop')
    stop.addEventListener('click', () => {
        clearInterval(timeID)
        btn.classList.add('active')
        btn.disabled = false
        stop.classList.add('continue')
        stop.addEventListener('click', () => {
            stop.classList.remove('continue')
           console.log(Snake.prototype.move)
            
        })
    })

   
    


    let play = function () {
        let that = null

        function Game(map) {
            this.food = new Food()
            this.snake = new Snake()
            this.map = map
            that = this
        }

        Game.prototype.init = function () {
            this.food.init(this.map)
            this.snake.init(this.map)
            this.runSnack(this.food, this.map)
            this.bindKey()
        }

        Game.prototype.runSnack = function (food, map) {
            timeID = setInterval(function () {
                this.snake.move(food, map)
                this.snake.init(map)
                let maxX = map.offsetWidth / this.snake.width
                let maxY = map.offsetHeight / this.snake.height
                let headX = this.snake.body[0].x
                let headY = this.snake.body[0].y
                if (headX < 0 || headX >= maxX) {
                    clearInterval(timeID)
                    alert('游戏结束')
                    btn.disabled = false
                }
                if (headY < 0 || headY >= maxY) {
                    clearInterval(timeID)
                    alert('游戏结束')
                    btn.disabled = false
                }

            }.bind(that), 200)
        }

        Game.prototype.bindKey = function () {
            document.addEventListener('keydown', function (e) {
                switch (e.keyCode) {
                    case 37: this.snake.direction = 'left'; break;
                    case 38: this.snake.direction = 'top'; break;
                    case 39: this.snake.direction = 'right'; break;
                    case 40: this.snake.direction = 'bottom'; break;
                }
            }.bind(that), false)//bind(that)改变此处this的指向，由指向document变为指向实例对象gm
        }

        window.Game = Game
        let gm = new Game(map)
        gm.init()
    }

}()

