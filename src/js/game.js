import { Engine, DisplayMode } from 'excalibur';
import { ResourceLoader } from './resources.js';
import { StartScreen } from './startScreen.js';
import { createMainScene } from './mainScene.js';
import { GameOver } from './gameOver.js';
import { Win } from './win.js';

export class Game extends Engine {
    constructor() {
        super({
            width: 925,
            height: 725,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
        });

        this.currentTime = 0;
        this.timer = null; // Timer toevoegen
        this.highscore = localStorage.getItem('highscore') ? parseFloat(localStorage.getItem('highscore')) : Infinity;

        this.start(ResourceLoader).then(() => {
            console.log("Start the game!");
            this.add('start', new StartScreen());
            this.add('main', createMainScene(this));
            this.add('gameover', new GameOver());

            // Maak een eigenschap aan om een referentie naar de Win-scene te houden
            this.winScene = new Win(this);
            this.add('win', new Win(this)); // Verander deze regel om `this` door te geven in plaats van `this.game`


            this.goToScene('start');
        }).catch(err => {
            console.error('Failed to start game', err);
        });
    }

    setWinTime(time) {
        this.currentTime = time;
    }


    startTimer() {
        this.timer = Date.now();
    }

    stopTimer() {
        this.currentTime = this.getElapsedTime();
        this.timer = null;
    }

    getElapsedTime() {
        return (Date.now() - this.timer) / 1000;
    }

    resetMainScene() {
        this.removeScene('main');
        this.add('main', createMainScene(this));
    }
}

new Game();
