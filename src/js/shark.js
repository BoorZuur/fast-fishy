import { Vector } from "excalibur";
import { Obstacle } from './obstacle.js';
import { Resources } from './resources.js';


export class Shark extends Obstacle {
    constructor(x, y) {
        super(x, y, Resources.Shark); // Use a specific image for life-up
    }

    obstacleLeft() {
        super.obstacleLeft();
        this.scale = new Vector(0.55, 0.55); // Reset scale to a specific value
    }
}