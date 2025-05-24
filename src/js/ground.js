import { Actor, Vector, CollisionType, Shape, Sprite } from "excalibur";
import { Resources } from './resources.js';

export class Ground extends Actor {
    
    speed

    constructor(x, y, width, height) {
        super({
            pos: new Vector(x, y),
            width: width,
            height: height,
            collisionType: CollisionType.Fixed // Makes the ground unmovable
        });
        this.speed = 500
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
        // this.sprite.sourceView.x += 0.5 * delta;
        this.speed += 0.1; // Increase speed over time
        this.sprite.sourceView.x -= -this.speed * delta / 1000; 
    }
}