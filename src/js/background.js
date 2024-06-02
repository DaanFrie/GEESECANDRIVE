import { Actor, Vector } from "excalibur";
import { Resources } from './resources.js';

export class Background extends Actor {
    constructor(width, height) {
        super({
            pos: new Vector(1500*0.85, 1500*0.85),
            scale: new Vector(0.85, 0.85),
        });
        this.graphics.use(Resources.backgroundImage.toSprite());
    }
}
