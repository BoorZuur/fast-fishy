import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, Color, CollisionType, SolverStrategy, Shape } from "excalibur" // Added Color, CollisionType, SolverStrategy, Shape
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './player.js'
import { Background } from './background.js'
import { UI } from './ui.js'
import { Ground } from './ground.js';
import { Obstacle } from './obstacle.js';
import { LifeUp } from './lifeup.js'
import { Shark } from './shark.js'

export class Game extends Engine {

    ui

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
            // Enable Arcade Physics
            physics: {
                solver: SolverStrategy.Arcade, // Use Arcade solver
                gravity: new Vector(0, 2500),   // Global gravity matching player's acc
            }
        })
        this.showDebug(false) // debug mode
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!")

        let background = new Background()
        this.add(background)

        // Add a ground actor using the Ground class
        this.ground = new Ground(this.drawWidth / 2, this.drawHeight - 40, this.drawWidth, 80);
        this.add(this.ground);

        this.player = new Player(700, 420)
        this.add(this.player)

        // Add obstacles
        let obstacle1 = new Obstacle(2000 + Math.random() * 10000, 600, Resources.Coral1);
        let obstacle2 = new Obstacle(2000 + Math.random() * 10000, 600, Resources.Coral2);
        let obstacle3 = new Obstacle(2000 + Math.random() * 10000, 600, Resources.Coral3);
        let obstacle4 = new Obstacle(2000 + Math.random() * 10000, 600, Resources.Coral4);
        let shark = new Shark(2000 + Math.random() * 10000, 450);

        this.add(obstacle1);
        this.add(obstacle2);
        this.add(obstacle3);
        this.add(obstacle4);
        this.add(shark);

        // Add a LifeUp actor
        let lifeUp = new LifeUp(5000 + Math.random() * 10000, 600);
        this.add(lifeUp);

        // load the UI last
        // this is important because the UI needs to be on top of everything else
        this.ui = new UI()
        this.add(this.ui)
    }
}

new Game()
