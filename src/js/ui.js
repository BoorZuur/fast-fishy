import { Actor, Vector, Label, FontUnit, Font, Color, TextAlign } from "excalibur"

export class UI extends Actor {
    #scoreLabel;
    #livesLabel;
    #highScoreLabel;

    constructor() {
        super();
        this.#scoreLabel = new Label({
            text: 'Score: 0',
            pos: new Vector(100, 100),
            font: new Font({
                family: 'Roboto',
                size: 24,
                unit: FontUnit.Px,
                color: Color.Yellow
            })
        });
        this.#livesLabel = new Label({
            text: 'Lives: 3',
            pos: new Vector(100, 130),
            font: new Font({
                family: 'Roboto',
                size: 24,
                unit: FontUnit.Px,
                color: Color.Red
            })
        });
        this.#highScoreLabel = new Label({
            text: 'High Score: 0',
            pos: new Vector(1180, 100),
            font: new Font({
                family: 'Roboto',
                size: 24,
                unit: FontUnit.Px,
                color: Color.Green,
                textAlign: TextAlign.Right
            }),
            anchor: Vector.Right
        });

        this.addChild(this.#scoreLabel);
        this.addChild(this.#livesLabel);
        this.addChild(this.#highScoreLabel);
    }

    onInitialize(engine) {
        // Load high score from local storage
        let highScore = this.loadHighScore();
        this.updateHighScore(highScore);
    }

    updateScore(score) {
        this.#scoreLabel.text = `Score: ${score}`;
        // Save high score if current score exceeds it
        if (score > this.loadHighScore()) {
            localStorage.setItem('highScore', score);
            this.updateHighScore(score);
        }
    }

    updateLives(lives) {
        this.#livesLabel.text = `Lives: ${lives}`;
    }

    updateHighScore(highScore) {
        this.#highScoreLabel.text = `High Score: ${highScore}`;
    }

    loadHighScore() {
        return parseInt(localStorage.getItem('highScore')) || 0; // Load high score or default to 0
    }
}