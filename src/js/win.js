import { Scene, Color, Actor, vec, Sprite, Vector, Label, TextAlign } from "excalibur";
import { Resources } from './resources.js';

export class Win extends Scene {
    constructor(game) {
        super();
        this.engine = null;
        this.highscoreLabel = null;
        this.game = game;
    }

    onInitialize(engine) {
        this.engine = engine;

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
            this.engine.resetMainScene();
            this.engine.goToScene('main');
        });

        this.timeLabel = new Label({
            pos: vec(100, 300),
            text: `Time: ${this.engine.currentTime.toFixed(3)}s`,
            fontFamily: 'Arial',
            scale: new Vector(3, 3),
            color: Color.Black,
            textAlign: TextAlign.Center,
        });
        this.add(this.timeLabel);

        this.highscoreLabel = new Label({
            pos: vec(600, 300),
            text: `Highscore: ${(parseFloat(localStorage.getItem('highscore')) || 0).toFixed(3)}`,
            fontFamily: 'Arial',
            scale: new Vector(3, 3),
            color: Color.Black,
            textAlign: TextAlign.Center
        });
        this.add(this.highscoreLabel);
    }

    onActivate() {
        const time = this.engine.currentTime;
        console.log(time);
        const highscore = parseFloat(localStorage.getItem('highscore'));

        // Controleer of er een eerdere highscore is opgeslagen en of de huidige tijd lager is
        if (!isNaN(highscore) && time < highscore) {
            localStorage.setItem('highscore', time.toString());
            this.highscoreLabel.text = `Highscore: ${time.toFixed(3)}`;
        }
    }


    onPostUpdate(engine, delta) {
        this.timeLabel.text = `Time: ${this.engine.currentTime.toFixed(3)}s`;
    }
}
