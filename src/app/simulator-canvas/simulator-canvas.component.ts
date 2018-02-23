import { Component, AfterViewInit, Input } from '@angular/core';
// import * as createjs from 'createjs-module';

import { Scope } from '../classes/scope';
import { StageHandler } from '../classes/stage-handler';

@Component({
  selector: 'app-simulator-canvas',
  templateUrl: './simulator-canvas.component.html',
  styleUrls: ['./simulator-canvas.component.css']
})
export class SimulatorCanvasComponent implements AfterViewInit {
  @Input() scope: Scope;

  constructor() { }

  ngAfterViewInit() {
    this.scope.stageHandler = new StageHandler('simulatorCanvas', this.scope);
  }
}
