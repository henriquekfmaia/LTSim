import * as createjs from 'createjs-module';
import {  debounceTime } from 'rxjs/operators';
import { timer } from 'rxjs/observable/timer';

import { Process } from './process';

export class StageHandler {
  stage: createjs.Stage;

  constructor(canvasName: string) {
    this.stage = new createjs.Stage(canvasName);
    (this.stage.canvas as HTMLCanvasElement).height = window.innerHeight * 0.5;
    this.stage.enableMouseOver(10); // enabled mouse over / out events
    this.stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas
  }

  newElement(): void {
    var process = new Process();
    this.stage.addChild(process.image.container);
    timer(100).subscribe(val => {
      this.stage.update();
    });
    
  }

  deleteElement(): void {
    timer(100).subscribe(val => {
      this.stage.update();
    });
  }
}
