import { calculateGravityVelocity, canvas, context, updatePlayerMovements } from ".."
import { createImage } from "../utils"
import spriteRunLeft from '../../assets/spriteRunLeft.png'
import spriteRunRight from '../../assets/spriteRunRight.png'
import spriteStandLeft from '../../assets/spriteStandLeft.png'
import spriteStandRight from '../../assets/spriteStandRight.png'

export class Player {
    constructor() {
        // define the default positions, this method will run each time that we consume our player class
        this.position = {
            x: 100,
            y: 100
        }
        this.width = 66
        this.height = 150
        this.velocity = {
            x: 0,
            y: 0
        }

        this.image = createImage(spriteStandRight)
        this.frames = 0
        this.sprites = {
            stand: {
                right: createImage(spriteStandRight),
                left: createImage(spriteStandLeft),
                cropWidth: 177,
                width: 66
            },
            run: {
                right: createImage(spriteRunRight),
                left: createImage(spriteRunLeft),
                cropWidth: 340,
                width: 127.875

            }
        }
        this.currentCropwWidth = 177

        this.currentSprite = this.sprites.stand.right
    }
    // defines how our player will look
    draw() {
        context.drawImage(
            this.currentSprite,
            this.currentCropwWidth * this.frames,
            0,
            this.currentCropwWidth,
            400,
            this.position.x,
            this.position.y,
            this.width,
            this.height)

    }

    // changes player properties over time
    update() {
        this.frames++
        if (this.frames > 59 && this.currentSprite === this.sprites.stand.right) {
            this.frames = 0
        } else if (this.frames > 59 && this.currentSprite === this.sprites.stand.left) {
            this.frames = 0
        }

        else if (this.frames > 29 && this.currentSprite === this.sprites.run.right) {
            this.frames = 0
        }
        else if (this.frames > 29 && this.currentSprite === this.sprites.run.left) {
            this.frames = 0
        }
        this.draw()

        updatePlayerMovements()
        calculateGravityVelocity()

    }

}

