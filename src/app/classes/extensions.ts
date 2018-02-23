import * as createjs from 'createjs-module';
import { Process } from './process';

export interface MouseEventExtension extends MouseEvent {
    readonly stageX: number;
    readonly stageY: number;
}

export class StageExtension extends createjs.Stage {
  selectedContainer: ContainerExtension;

  constructor(canvasName: string) {
    super(canvasName);
  }
}

export class ContainerExtension extends createjs.Container {
  process: Process;

  constructor(process: Process) {
    super();
    this.process = process;
    var bitmap = new createjs.Bitmap(this.process.image);
    this.addChild(bitmap);
    this.x = 20;
    this.y = 20;
  }
}