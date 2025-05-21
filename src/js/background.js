import { Actor, Vector } from "excalibur"
import { Resources } from './resources.js'

export class Background extends Actor {
    constructor() {
        super()
        this.graphics.use(Resources.Background.toSprite())
    }

    onInitialize(engine) {
        console.log("i am background", engine.drawWidth, engine.drawHeight)
        this.pos = new Vector(engine.drawWidth /2, engine.drawHeight / 2)
        // this.scale = new Vector(1.9, 1.9)
    }
}