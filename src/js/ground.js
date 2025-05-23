import { Actor, Vector, CollisionType, Shape, Sprite } from "excalibur";
import { Resources } from './resources.js';

export class Ground extends Actor {
    constructor(x, y, width, height) {

        // speed

        super({
            pos: new Vector(x, y),
            width: width,
            height: height,
            collisionType: CollisionType.Fixed // Makes the ground unmovable
        });
        // speed = 500
    }

    onInitialize(engine) {
        // Use a sprite for the ground
        this.sprite = new Sprite({
            image: Resources.Ground,
            sourceView: { x: 0, y: 0, width: this.width, height: this.height },
        });

        this.graphics.use(this.sprite);

        // Set the collider shape for the ground
        this.collider.set(Shape.Box(this.width, this.height));
    }

    onPreUpdate(engine, delta) {
        // Scroll the ground image by updating the sourceView
        // this.speed += 1/1000;
        this.sprite.sourceView.x += 0.5 * delta;
    }
}