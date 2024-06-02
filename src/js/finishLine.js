import { Actor, CollisionType, Vector } from 'excalibur';
import { Resources } from './resources.js';

export class FinishLine extends Actor {
    constructor() {
        super({
            pos: new Vector(594.5, 650),
            scale: new Vector(0.29, 0.29)
        });

        this.body.collisionType = CollisionType.Fixed;
        this.graphics.use(Resources.finishLine.toSprite());
    }
}
