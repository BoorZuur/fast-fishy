import { Actor, Vector, CollisionType, Shape, Sprite } from "excalibur";
import { Resources } from './resources.js';

export class Ground extends Actor {
    
    speed

    constructor(x, y, width, height) {
        super({
            pos: new Vector(x, y),
            width: width,
            height: height,
            collisionType: CollisionType.Fixed
        });
        this.speed = 500
    }

    onInitialize(engine) {
        this.sprite = new Sprite({
            image: Resources.Ground,
            sourceView: { x: 0, y: 0, width: this.width, height: this.height },
        });

        this.graphics.use(this.sprite);

        this.collider.set(Shape.Box(this.width, this.height));
    }

    onPreUpdate(engine, delta) {
        this.speed += 0.1;
        this.sprite.sourceView.x -= -this.speed * delta / 1000; 
    }
}