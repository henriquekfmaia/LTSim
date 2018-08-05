import * as createjs from 'createjs-module';
import { SignalDispatcher, SimpleEventDispatcher, EventDispatcher } from "strongly-typed-events";

import { Process } from './process';
import { MouseEventExtension } from './extensions/mouse-event-extension';
import { StageExtension } from './extensions/stage-extension';
import { ProcessContainer } from './containers/process-container';

export class StageHandler {
  private _onShowDetail = new SimpleEventDispatcher<ProcessContainer>();
  stage: StageExtension;
  
  constructor(canvasName: string) {
     this.stage = new StageExtension(canvasName);
    (this.stage.canvas as HTMLCanvasElement).style.width='100%';
    (this.stage.canvas as HTMLCanvasElement).width = (this.stage.canvas as HTMLCanvasElement).offsetWidth;
    (this.stage.canvas as HTMLCanvasElement).height = window.innerHeight * 0.5;
    this.stage.enableMouseOver(10); // enabled mouse over / out events
    this.stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas
    this.stage.onShowDetail.subscribe(s => this._onShowDetail.dispatch(s));
  }

  newProcess(process: Process): void {
    var container = new ProcessContainer();
    this.stage.addChild(container);
    container.start(process);
    this.stage.addProcess(process);
    process.setInOutRelationships();
    this.stage.addRelationships(process.input);
    this.stage.addRelationships(process.output);  
  }

  deleteElement(): void {
    this.stage.selectedElement.deleteSelf();
    this.stage.selectElement(null);
  }

  public get onShowDetail() {
    return this._onShowDetail.asEvent();
  }
}
