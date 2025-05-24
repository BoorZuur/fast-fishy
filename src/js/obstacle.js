import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from './resources.js';
import { Player } from './player.js';
import { UI } from './ui.js';

export class Obstacle extends Actor {
    constructor(x, y, image) {
        super({
            pos: new Vector(x, y),
            width: image.width,
            height: image.height,
            collisionType: CollisionType.Passive
        });
        this.image = image;
        this.scale = new Vector(0.55, 0.55); // Set initial scale
        this.vel = new Vector(-500, 0);
    }

    onInitialize(engine) {
        this.graphics.use(this.image.toSprite()); // Use obstacle sprite
        this.graphics.flipHorizontal = true;
    }

    onPreUpdate(engine) {
        // Check if the obstacle is off-screen
        if (this.pos.x < -200) {
            this.obstacleLeft(); // Reset the obstacle position and size
            engine.player.score++;
            this.scene.engine.ui.updateScore(engine.player.score);
        }

        this.vel.x -= 0.1;
    }

    obstacleLeft() {
        // give the obstacle a new random x position outside the screen on the right and give it a new size
        this.pos.x = 2000 + Math.random() * 20000;
        // random scale between 0.3 and 0.8
        let scale = 0.4 + Math.random() * 0.5;
        this.scale = new Vector(scale, scale);
    }
}