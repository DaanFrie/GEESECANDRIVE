import { Scene, Color, Actor, vec, Label, Font, TextAlign, Sprite, Vector } from 'excalibur';
import { Resources } from './resources.js';

export class StartScreen extends Scene {
    onInitialize(engine) {

        const background = new Actor({
            pos: vec(engine.drawWidth / 2, engine.drawHeight / 2),
            width: engine.drawWidth,
            height: engine.drawHeight,
            color: Color.fromHex("CECCCD")
        });
        this.add(background);

        const text = new Actor({
            pos: vec(engine.drawWidth / 2, 75),
            scale: new Vector(0.5, 0.5),
        });
        text.graphics.add(Sprite.from(Resources.starttext)); 
        this.add(text);

        const text2 = new Actor({
            pos: vec(engine.drawWidth / 2, 660), 
            scale: new Vector(0.29, 0.29),
        });
        text2.graphics.add(Sprite.from(Resources.instruction1)); 
        this.add(text2);

        const button = new Actor({
            pos: vec(engine.drawWidth / 2, engine.drawHeight / 2), 
            scale: new Vector(0.5, 0.5),
        });
        button.graphics.add(Sprite.from(Resources.playagainbutton)); 
        this.add(button);
        button.on('pointerup', () => {
            engine.goToScene('main');
        });
    }
}
