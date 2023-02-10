import { canvas, context } from ".."

export class GenericObject {
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

export class Platform {
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
