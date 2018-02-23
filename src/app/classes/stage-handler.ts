import * as createjs from 'createjs-module';
import { timer } from 'rxjs/observable/timer';

import { Process } from './process';
import { MouseEventExtension, StageExtension } from './extensions';

export class StageHandler {
  stage: StageExtension;
  

  constructor(canvasName: string) {
    this.stage = new StageExtension(canvasName);
    (this.stage.canvas as HTMLCanvasElement).style.width='100%';
    (this.stage.canvas as HTMLCanvasElement).width = (this.stage.canvas as HTMLCanvasElement).offsetWidth;
    (this.stage.canvas as HTMLCanvasElement).height = window.innerHeight * 0.8;
    this.stage.enableMouseOver(10); // enabled mouse over / out events
    this.stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas
  }

  newElement(): void {
    var process = new Process();
    this.stage.addChild(process.image.container);
    this.addEventHandlersToContainer(process.image.container);
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

  addEventHandlersToContainer(container: createjs.Container): void {
    container.on("mousedown", function (evt: MouseEventExtension) {
      //this.parent.addChild(this);
      this.stage.selectedContainer = this;
      this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
    });

    container.on("mouseup", function (evt) {
      this.offset = undefined;
    });

    // the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
    container.on("pressmove", function (evt: MouseEventExtension) {
      if(this.offset){
          this.x = evt.stageX + this.offset.x;
          this.y = evt.stageY + this.offset.y;
          this.stage.update();
      }
    });
  }
}
