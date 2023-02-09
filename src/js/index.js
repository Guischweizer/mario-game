import platFormImg from '../assets/platform.png'
import backgroundImg from '../assets/background.png'

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

// could be done with CSS
canvas.width = 1024
canvas.height = 576

const gravity = 0.9

class Player {
    constructor() {
        // define the default positions, this method will run each time that we consume our player class
        this.position = {
            x: 100,
            y: 100
        }
        this.width = 40
        this.height = 40
        this.velocity = {
            x: 0,
            y: 0
        }
    }
    // defines how our player will look
    draw() {
        context.fillStyle = 'red'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    // changes player properties over time
    update() {
        this.draw()

        updatePlayerMovements()
        calculateGravityVelocity()

    }

}

class Platform {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y
        }
        this.image = image

        this.width = image.width
        this.height = image.height

    }

    draw() {
        context.drawImage(this.image, this.position.x, this.position.y)
    }
}

function updatePlayerMovements() {
    player.position.y += player.velocity.y
    player.position.x += player.velocity.x
}

function calculateGravityVelocity() {
    // this ensure that our player will be always pushed to the bottom and stop when hitting it
    const isPlayerPlayerYMinorThanCanvasY = player.position.y + player.height + player.velocity.y <= canvas.height

    if (isPlayerPlayerYMinorThanCanvasY) {
        player.velocity.y += gravity
    } else player.velocity.y = 0
}

const image = new Image()
image.src = platFormImg

const player = new Player()
const platforms = [
    // new Platform({ x: 200, y: 900, image }),
    // new Platform({ x: 200, y: 900, image }),
    new Platform({ x: 300, y: 500, image }),
    new Platform({ x: 500, y: 100, image }),

]
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

let scrollOffset = 0

function animate() {
    requestAnimationFrame(animate)
    context.fillStyle = 'white'
    context.fillRect(0, 0, canvas.width, canvas.height)
    platforms.forEach(platform => {
        platform.draw()
    })

    player.update()

    handlePlayerVelocityAxisX()
    collisionDetection()
    winScenario()

}

function winScenario() {
    if (scrollOffset > 2000) {
        console.log("You win!")
    }
}


function collisionDetection() {
    platforms.forEach(platform => {
        const YAxis = player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y
        const XAxis = player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width
        if (YAxis && XAxis) {
            player.velocity.y = 0
        }
    })

}

function handlePlayerVelocityAxisX() {
    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 5
    } else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -5
    } else {
        player.velocity.x = 0
        movesBackground()
    }
}

function movesBackground() {
    if (keys.right.pressed) {
        scrollOffset += 5
        platforms.forEach(platform => {
            platform.position.x -= 5
        })

    } else if (keys.left.pressed) {
        scrollOffset -= 5
        platforms.forEach(platform => {
            platform.position.x += 5
        })
    }
}

addEventListener('keydown', ({ code }) => {
    switch (code) {
        //moves left
        case 'KeyA':
            keys.left.pressed = true
            break;

        // moves right
        case 'KeyD':
            keys.right.pressed = true
            break;

        case 'KeyS':
            console.log("down")
            break;

        case 'Space':
            player.velocity.y -= 20
            break;

        default:
            break;
    }
})


addEventListener('keyup', ({ code }) => {
    switch (code) {
        //moves left
        case 'KeyA':
            keys.left.pressed = false
            break;

        // moves right
        case 'KeyD':
            keys.right.pressed = false
            break;

        case 'KeyS':
            console.log("down")
            break;

        case 'Space':
            player.velocity.y = 0
            break;

        default:
            break;
    }
})

animate()