import '../css/style.css';
import { Engine, DisplayMode} from 'excalibur';
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

        this.start(ResourceLoader).then(() => {
            console.log("Start the game!");
            this.add('start', new StartScreen()); 
            this.add('main', createMainScene(this)); 
            this.add('gameover', new GameOver()); 
            this.add('win', new Win()); 
            this.goToScene('start'); 
        }).catch(err => {
            console.error('Failed to start game', err);
        });
    }
    

    resetMainScene() {
        this.removeScene('main'); 
        this.add('main', createMainScene(this)); 
    }
}

new Game();
