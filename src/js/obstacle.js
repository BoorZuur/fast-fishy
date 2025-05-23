import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from './resources.js';
import { Player } from './player.js';

export class Obstacle extends Actor {
    constructor(x, y, image) {
        super({
            pos: new Vector(x, y),
            width: image.width,
            height: image.height,
            collisionType: CollisionType.Passive
        });
        this.image = image;
        this.scale = new Vector(0.5, 0.5); // Set initial scale
        this.vel = new Vector(-500, 0); // Move left at a constant speed
    }

    onInitialize(engine) {
        this.graphics.use(this.image.toSprite()); // Use obstacle sprite
    }

    onPreUpdate(engine) {
        // Check if the obstacle is off-screen
        if (this.pos.x < -50) {
            this.obstacleLeft(); // Reset the obstacle position and size
        }

        // make it go faster each time it resets
        // this.vel.x -= 0.1;
    }

    obstacleLeft() {
        // give the obstacle a new random x position outside the screen on the right and give it a new size
        this.pos.x = 1280 + Math.random() * 10000;
        // random scale between 0.2 and 0.5
        let scale = 0.5 + Math.random() * 0.3;
        this.scale = new Vector(scale, scale);
    }
}