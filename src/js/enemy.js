import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from './resources.js';

export class Enemy extends Actor {
    constructor(speed = 700) {
        super({
            pos: new Vector(655, 750),
            scale: new Vector(0.24, 0.24),
        });

        this.speed = speed;
        this.body.collisionType = CollisionType.Active;
        this.graphics.use(Resources.enemy.toSprite());
    }

    onInitialize(engine) {
        this.actions
            .moveBy(new Vector(0, 1300), this.speed)
            .moveBy(new Vector(145, 0), this.speed)
            .moveBy(new Vector(0, -610), this.speed)
            .moveBy(new Vector(590, 0), this.speed)
            .moveBy(new Vector(0, 340), this.speed)
            .moveBy(new Vector(250, 0), this.speed)
            .moveBy(new Vector(270, -700), this.speed)
            .moveBy(new Vector(0, -200), this.speed)
            .moveBy(new Vector(-170, 0), this.speed)
            .moveBy(new Vector(0, 205), this.speed)
            .moveBy(new Vector(-240, 0), this.speed)
            .moveBy(new Vector(0, -360), this.speed)
            .moveBy(new Vector(-590, -210), this.speed)
            .moveBy(new Vector(-260, 0), this.speed)
            .moveBy(new Vector(0, 120), this.speed)
            .callMethod(() => {
                engine.goToScene('gameover');
            });
    }

    onPreUpdate() {
        const velocity = this.vel;

        if (velocity.x !== 0 || velocity.y !== 0) {
            this.rotation = Math.atan2(velocity.y, velocity.x) - Math.PI / 2;
        }
    }
}

export default Enemy;
