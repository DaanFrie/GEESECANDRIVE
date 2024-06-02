import { Scene, Color, Actor, vec, Sprite, Vector } from "excalibur";
import { Resources } from './resources.js';

export class Win extends Scene {
    onInitialize(engine) {
        const background = new Actor({
            pos: vec(engine.drawWidth / 2, engine.drawHeight / 2),
            width: engine.drawWidth,
            height: engine.drawHeight,
            color: Color.fromRGB(200, 198, 199)
        });
        this.add(background);

        const image = new Actor({
            pos: vec(engine.drawWidth / 2, 500),
            scale: new Vector(0.40, 0.40),
        });
        image.graphics.add(Sprite.from(Resources.winimage));
        this.add(image);

        const text = new Actor({
            pos: vec(engine.drawWidth / 2, 75),
            scale: new Vector(0.5, 0.5),
        });
        text.graphics.add(Sprite.from(Resources.wintext));
        this.add(text);

        const button = new Actor({
            pos: vec(engine.drawWidth / 2, 215),
            scale: new Vector(0.5, 0.5),
        });
        button.graphics.add(Sprite.from(Resources.playagainbutton));
        this.add(button);

        button.on('pointerup', () => {
            engine.resetMainScene();
            engine.goToScene('main');
        });
    }
}
