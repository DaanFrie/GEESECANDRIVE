import { Actor, CollisionType, Vector } from 'excalibur';

export class FinishLineBoundary extends Actor {
    constructor(x, y, width, height, isHorizontal) {
        super({
            pos: new Vector(x, y),
            width: width,
            height: height,
        });

            this.anchor.setTo(0, 0);

        this.body.collisionType = CollisionType.Fixed;
    }
}