import { Actor, Vector } from "excalibur";
import { Resources } from './resources.js';

export class WhiteLine extends Actor {
    constructor() {
        super({
            pos: new Vector(594.5, 795),
            scale: new Vector(0.185, 0.185),
        });
        this.graphics.use(Resources.whiteLine.toSprite());
    }
}
