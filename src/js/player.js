import { Actor, CollisionType, Vector, Keys } from "excalibur";
import { Resources } from './resources.js';
import { Ground } from './ground.js';
import { Obstacle } from './obstacle.js';
import { UI } from './ui.js';

export class Player extends Actor {

    lives
    score

    constructor() {
        super({ width: Resources.Fish.width, height: Resources.Fish.height });
        this.vel = new Vector(0, 0);
        this.body.collisionType = CollisionType.Active;
        this.isOnGround = false;
        this.jumpStrength = 1200;
        this.lives = 3;
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Fish.toSprite());
        this.graphics.flipHorizontal = true;

        this.pos = new Vector(100, 600);
        this.on('collisionstart', (event) => this.hitSomething(event))
    }

    hitSomething(event) {
        // Check if collision is with ground
        if (event.other.owner instanceof Ground) {
            this.isOnGround = true;
        } else if (event.other.owner instanceof Obstacle) {
            this.lives--;
            event.other.owner.pos.x = 1280 + Math.random() * 10000;
            console.log("Lives left: " + this.lives);
            if (this.lives <= 0) {
                console.log("Game Over");
                this.lives = 3;
                this.graphics.use(Resources.Bones.toSprite());
                let obstacles = event.other.owner.scene.actors.filter(actor => actor instanceof Obstacle);
                obstacles.forEach(obstacle => {
                    obstacle.pos.x = 1280 + Math.random() * 10000;
                    obstacle.vel.x = -500; // Reset speed
                    // random scale between 0.2 and 0.5
                    let scale = 0.5 + Math.random() * 0.3;
                    obstacle.scale = new Vector(scale, scale);
                });
                // wait 5 seconds and then change back to fish
                this.scene.engine.stop();
                setTimeout(() => {
                    this.scene.engine.start();
                    this.graphics.use(Resources.Fish.toSprite());
                }, 5000);
            }
        }
    }

    onPreUpdate(engine) {
        // Jump when Space key is pressed and player is on ground
        if (engine.input.keyboard.wasPressed(Keys.Space) && this.isOnGround) {
            this.vel = new Vector(this.vel.x, -this.jumpStrength);
            this.isOnGround = false;
        }
    }
}