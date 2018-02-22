import * as createjs from 'createjs-module';

import { Process } from './process';

export class StageHandler {
  stage: createjs.Stage;

  constructor(canvasName: string) {
    this.stage = new createjs.Stage(canvasName);
    this.stage.canvas.height = window.innerHeight * 0.5;
    this.stage.enableMouseOver(10); // enabled mouse over / out events
    this.stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas
  }

  newElement(): void {
    var process = new Process();
    this.stage.addChild(process.image.container);
    this.stage.update();
  }
}
