import { Actor, Vector, Label, FontUnit, Font, Color } from "excalibur"

export class UI extends Actor {

    scoreLabel
    scores

    constructor() {
        super()
        this.scores = []
        this.scoreLabel = new Label({
            text: 'Score: 0',
            pos: new Vector(100, 100),
            font: new Font({
                family: 'Roboto',
                size: 24,
                unit: FontUnit.Px,
                color: Color.Yellow
            })
        })
        this.addChild(this.scoreLabel)
    }
    
    updateScore(name, score) {
        this.scores[name] = score
        let scoreText = "Scores: "
        // Iterate over the properties of the scores object
        for (const playerName in this.scores) {
            scoreText += `\n${playerName}: ${this.scores[playerName]}`
        }
        this.scoreLabel.text = scoreText
    }
}