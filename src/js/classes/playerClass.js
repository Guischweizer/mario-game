import { calculateGravityVelocity, canvas, context, updatePlayerMovements } from ".."

export class Player {
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

