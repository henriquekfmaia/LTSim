import * as createjs from 'createjs-module';
import { timer } from 'rxjs/observable/timer';

import { Process } from './process';
import { Scope } from './scope';
import { MouseEventExtension } from './extensions/mouse-event-extension';
import { StageExtension } from './extensions/stage-extension';
import { ProcessContainer } from './containers/process-container';

export class StageHandler {
  stage: StageExtension;
  scope: Scope;
  
  constructor(canvasName: string, scope: Scope) {
    this.scope = scope;
    this.stage = new StageExtension(canvasName);
    (this.stage.canvas as HTMLCanvasElement).style.width='100%';
    (this.stage.canvas as HTMLCanvasElement).width = (this.stage.canvas as HTMLCanvasElement).offsetWidth;
    (this.stage.canvas as HTMLCanvasElement).height = window.innerHeight * 0.5;
    this.stage.enableMouseOver(10); // enabled mouse over / out events
    this.stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas
  }

  newProcess(process: Process): void {
    var container = new ProcessContainer(process);
    this.stage.addChild(container);
    
    timer(100).subscribe(val => {
      this.stage.update();
    });
    
  }

  deleteElement(): void {
    this.stage.removeChild(this.stage.selectedContainer);
    this.stage.selectedContainer = null;
    timer(100).subscribe(val => {
      this.stage.update();
    });
  }
}
