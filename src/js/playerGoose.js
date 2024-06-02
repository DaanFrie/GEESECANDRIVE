import { FinishLineBoundary } from './finishLineBoundary.js'; 
import { Actor, Vector, Keys, CollisionType } from 'excalibur';
import { Resources } from './resources.js';
import { Boundary } from './boundary.js';

export class PlayerGoose extends Actor {
    constructor() {
        super({
            pos: new Vector(540, 750),
            scale: new Vector(0.24, 0.24),
            rotation: Math.PI / 2
        });

        this.maxSpeed = 650;
        this.acceleration = 18;
        this.deceleration = 10;

        this.body.collisionType = CollisionType.Active;
        this.graphics.use(Resources.playerGoose.toSprite());
    }

    onPreUpdate(engine) {
        const mainScene = this.scene; 

        let xspeed = this.vel.x;
        let yspeed = this.vel.y;

        if (engine.input.keyboard.isHeld(Keys.W) || engine.input.keyboard.isHeld(Keys.Up)) {
            yspeed -= this.acceleration;
        } else if (engine.input.keyboard.isHeld(Keys.S) || engine.input.keyboard.isHeld(Keys.Down)) {
            yspeed += this.acceleration;
        } else {
            if (yspeed < 0) {
                yspeed += this.deceleration;
                yspeed = Math.min(yspeed, 0);
            } else if (yspeed > 0) {
                yspeed -= this.deceleration;
                yspeed = Math.max(yspeed, 0);
            }
        }

        if (engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left)) {
            xspeed -= this.acceleration;
        } else if (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right)) {
            xspeed += this.acceleration;
        } else {
            if (xspeed < 0) {
                xspeed += this.deceleration;
                xspeed = Math.min(xspeed, 0);
            } else if (xspeed > 0) {
                xspeed -= this.deceleration;
                xspeed = Math.max(xspeed, 0);
            }
        }

        const finishLineBoundary = mainScene.actors.find(actor => actor instanceof FinishLineBoundary);

        if (
            finishLineBoundary &&
            this.pos.x < finishLineBoundary.pos.x + finishLineBoundary.width &&
            this.pos.x + this.width > finishLineBoundary.pos.x &&
            this.pos.y < finishLineBoundary.pos.y + finishLineBoundary.height &&
            this.pos.y + this.height > finishLineBoundary.pos.y
        ) {
            engine.goToScene('win');
        }

        const bounds = engine.currentScene.actors.filter(actor => actor instanceof Boundary);

        bounds.forEach(boundary => {
            if (
                this.pos.x < boundary.pos.x + boundary.width &&
                this.pos.x + this.width > boundary.pos.x &&
                this.pos.y < boundary.pos.y + boundary.height &&
                this.pos.y + this.height > boundary.pos.y
            ) {
                engine.goToScene('gameover');
            }
        });

        const speed = Math.sqrt(xspeed * xspeed + yspeed * yspeed);
        if (speed > this.maxSpeed) {
            const ratio = this.maxSpeed / speed;
            xspeed *= ratio;
            yspeed *= ratio;
        }

        this.vel = new Vector(xspeed, yspeed);

        if (xspeed !== 0 || yspeed !== 0) {
            this.rotation = Math.atan2(yspeed, xspeed);
        }
    }
}
