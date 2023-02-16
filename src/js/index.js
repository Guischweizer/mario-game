import { GenericObject, Platform } from './classes/scensarioClasses'
import { Player } from './classes/playerClass'
import platFormImg from '../assets/platform.png'
import backgroundImg from '../assets/background.png'
import smallTallPlatformImg from '../assets/platformSmallTall.png'

import hillsImg from '../assets/hills.png'

export const canvas = document.querySelector('canvas')
export const context = canvas.getContext('2d')
export const gravity = 0.8

// could be done with CSS
canvas.width = 1024
canvas.height = 576

let platformHTMLImage = createImage(platFormImg)
let player = new Player()
let platforms = []


let genericOBjects = []

let keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

let scrollOffset = 0

function init() {
    platformHTMLImage = createImage(platFormImg)
    player = new Player()
    platforms = [
        new Platform({ x: -1, y: 470, image: platformHTMLImage }),
        new Platform({ x: platformHTMLImage.width - 3, y: 470, image: platformHTMLImage }),
        new Platform({ x: platformHTMLImage.width * 2 + 100, y: 470, image: platformHTMLImage }),
        new Platform({ x: platformHTMLImage.width * 3 + 250, y: 470, image: platformHTMLImage }),
        new Platform({ x: platformHTMLImage.width * 6 + 250, y: 470, image: platformHTMLImage }),
    ]


    genericOBjects = [
        new GenericObject({ x: 0, y: 0, image: createImage(backgroundImg) }),
        new GenericObject({ x: 0, y: 0, image: createImage(hillsImg) })
    ]

    keys = {
        right: {
            pressed: false
        },
        left: {
            pressed: false
        }
    }

    scrollOffset = 0
}


function createImage(newImage) {
    const image = new Image()
    image.src = newImage
    return image
}

function drawScenarios() {
    genericOBjects.forEach(genericObject => {
        genericObject.draw()
    })

    platforms.forEach(platform => {
        platform.draw()
    })
}

function animate() {
    requestAnimationFrame(animate)
    context.fillStyle = 'white'
    context.fillRect(0, 0, canvas.width, canvas.height)

    drawScenarios()
    player.update()

    handlePlayerVelocityAxisX()
    collisionDetection()
    winScenario()
    loseScenario()

}

function winScenario() {
    if (scrollOffset > 2000) {
        console.log("You win!")
    }
}


function loseScenario() {
    if (player.position.y > canvas.height) {
        console.log("You lose!")
        init()
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
    } else if ((keys.left.pressed && player.position.x > 100) || (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)) {
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
        genericOBjects.forEach(genericObject => {
            genericObject.position.x -= 3
        })
    } else if (keys.left.pressed && scrollOffset > 0) {
        scrollOffset -= 5
        platforms.forEach(platform => {
            platform.position.x += 5
        })
        genericOBjects.forEach(genericObject => {
            genericObject.position.x += 3
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
            player.velocity.y -= 15
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


export function updatePlayerMovements() {
    player.position.y += player.velocity.y
    player.position.x += player.velocity.x
}

export function calculateGravityVelocity() {
    // this ensure that our player will be always pushed to the bottom and stop when hitting it
    const isPlayerPlayerYMinorThanCanvasY = player.position.y + player.height + player.velocity.y <= canvas.height

    if (isPlayerPlayerYMinorThanCanvasY) {
        player.velocity.y += gravity
    }
}

init()
animate()
