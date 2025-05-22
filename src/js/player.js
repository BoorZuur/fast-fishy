import { Actor } from "excalibur"
import { Resources } from './resources.js'

export class Player extends Actor {
    constructor() {
        super({ width: Resources.Player.width, height: Resources.Player.height })
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Player.toSprite())
        this.pos = new Vector(200,200)
    }
}