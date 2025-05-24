import { Actor, CollisionType, Vector, Keys } from "excalibur";
import { Resources } from './resources.js';
import { Ground } from './ground.js';
import { Obstacle } from './obstacle.js';
import { LifeUp } from "./lifeup.js";
import { UI } from './ui.js';

export class Player extends Actor {

    #lives
    score

    constructor() {
        super({ width: Resources.Fish.width, height: Resources.Fish.height });
        this.vel = new Vector(0, 0);
        this.body.collisionType = CollisionType.Active;
        this.isOnGround = false;
        this.jumpStrength = 1200;
        this.#lives = 3;
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Fish.toSprite());
        this.graphics.flipHorizontal = true;
        this.score = 0;

        this.pos = new Vector(100, 600);
        this.on('collisionstart', (event) => this.hitSomething(event))
    }

    hitSomething(event) {
        // Check if collision is with ground
        if (event.other.owner instanceof Ground) {
            this.isOnGround = true;
            this.rotation = 0;
            this.angularVelocity = 0
        } else if (event.other.owner instanceof LifeUp) {
            this.#lives++;
            this.scene.engine.ui.updateLives(this.#lives);
            event.other.owner.obstacleLeft(this.scene.engine);
        } else if (event.other.owner instanceof Obstacle) {
            this.#lives--;
            this.scene.engine.ui.updateLives(this.#lives);
            event.other.owner.pos.x = 2000 + Math.random() * 10000;
            // update the UI with the new lives count
            if (this.#lives <= 0) {
                console.log("Game Over");
                this.score = 0;
                this.#lives = 3;
                this.graphics.use(Resources.Bones.toSprite());
                let obstacles = event.other.owner.scene.actors.filter(actor => actor instanceof Obstacle);
                obstacles.forEach(obstacle => {
                    obstacle.obstacleLeft(this.scene.engine);
                    obstacle.vel.x = -500; // Reset speed
                });
                this.scene.engine.ground.speed = 500;
                // wait 5 seconds and then change back to fish
                this.scene.engine.stop();
                setTimeout(() => {
                    this.scene.engine.ui.updateScore(this.score);
                    this.scene.engine.ui.updateLives(this.#lives);

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
            this.rotation = 5.5
            this.angularVelocity = 0.9
        }
        // squeeze the player when crouch key is pressed
        if (engine.input.keyboard.isHeld(Keys.Down) && this.isOnGround) {
            this.scale = new Vector(1, 0.5); // Squeeze the player
        } else {
            this.scale = new Vector(1, 1); // Reset to normal size
        }
    }
}