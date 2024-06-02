import { Actor, CollisionType, Vector, Color } from 'excalibur';

export class Boundary extends Actor {
    constructor(x, y, width, height, isHorizontal) {
        super({
            pos: new Vector(x, y),
            width: width,
            height: height,
            // color: Color.Red  
        });

        

        if (isHorizontal) {
            this.anchor.setTo(0, 0); 
        } else {
            this.anchor.setTo(1, 0); 
        }
        this.body.collisionType = CollisionType.Fixed;
    }
}
