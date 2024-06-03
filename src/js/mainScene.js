import { Scene, Vector } from 'excalibur';
import { PlayerGoose } from './playerGoose.js';
import { Background } from './background.js';
import { Enemy } from './enemy.js';
import { Boundary } from './boundary.js';
import { FinishLineBoundary } from './finishLineBoundary.js';
import { WhiteLine } from './whiteLine.js';
import { FinishLine } from './finishLine.js';
import { Game } from './game.js';

export function createMainScene(engine) {
    const mainScene = new Scene(engine);

    const background = new Background(engine.drawWidth, engine.drawHeight);
    mainScene.add(background);

    const finishLine = new FinishLine();
    mainScene.add(finishLine);

    const whiteLine = new WhiteLine();
    mainScene.add(whiteLine);

    const enemy = new Enemy();
    mainScene.add(enemy);

    const playerGoose = new PlayerGoose();
    mainScene.add(playerGoose);

    mainScene.camera.strategy.lockToActor(playerGoose);

    const finishLineBoundary = new FinishLineBoundary(490, 630, 210, 10);
    mainScene.add(finishLineBoundary);

    const boundaries = [
        new Boundary(490, 660, 210, 10, true),
        new Boundary(706, 564, 200, 10, true),
        new Boundary(906, 614, 100, 10, true),
        new Boundary(1006, 679, 300, 10, true),
        new Boundary(1306, 1254, 430, 10, true),
        new Boundary(1736, 1179, 60, 10, true),
        new Boundary(1796, 925, 50, 10, true),
        new Boundary(1796, 1125, 50, 10, true),
        new Boundary(703, 1968, 55, 10, true),
        new Boundary(758, 1255, 805, 10, true),
        new Boundary(1563, 1725, 55, 10, true),
        new Boundary(1618, 1445, 115, 10, true),

        new Boundary(703, 578, 10, 1390, false),
        new Boundary(906, 564, 10, 50, false),
        new Boundary(1006, 614, 10, 65, false),
        new Boundary(1306, 679, 10, 575, false),
        new Boundary(1736, 1179, 10, 75, false),
        new Boundary(1796, 925, 10, 254, false),
        new Boundary(1846, 925, 10, 200, false),
        new Boundary(1736, 1250, 10, 200, false),
        new Boundary(758, 1255, 10, 713, false),
        new Boundary(1563, 1255, 10, 470, false),
        new Boundary(1618, 1445, 10, 280, false),

        new Boundary(490, 2198, 490, 10, true),
        new Boundary(980, 1488, 365, 10, true),
        new Boundary(1345, 1963, 490, 10, true),
        new Boundary(1835, 1625, 110, 10, true),
        new Boundary(490, 355, 600, 10, true),
        new Boundary(1090, 465, 440, 10, true),
        new Boundary(1530, 1035, 50, 10, true),
        new Boundary(1580, 685, 490, 10, true),
        new Boundary(1960, 1250, 110, 10, true),
        new Boundary(1940, 1625, 15, 10, true),

        new Boundary(490, 355, 10, 1845, false),
        new Boundary(980, 1488, 10, 710, false),
        new Boundary(1345, 1488, 10, 475, false),
        new Boundary(1835, 1625, 10, 338, false),
        new Boundary(1090, 355, 10, 110, false),
        new Boundary(1530, 465, 10, 570, false),
        new Boundary(1580, 685, 10, 350, false),
        new Boundary(2070, 685, 10, 565, false),
        new Boundary(1960, 1250, 10, 380, false),
    ];

    boundaries.forEach(boundary => mainScene.add(boundary));

    mainScene.on('initialize', () => {
        engine.startTimer();
    });

    mainScene.on('activate', () => {
        Game.currentTime = 0;
        engine.startTime = Date.now();
    });

    mainScene.on('deactivate', () => {
        engine.stopTimer(); // Stop de timer wanneer de MainScene wordt gedeactiveerd
    });

    finishLineBoundary.on('collisionstart', () => {
        const elapsedTime = engine.stopTimer(); // Stop de timer wanneer de speler de finishlijn bereikt
        engine.updateHighscore(elapsedTime); // Update de highscore
        engine.goToScene('win', elapsedTime); // Geef de verstreken tijd door naar de Win-scene
    });

    return mainScene;
}


