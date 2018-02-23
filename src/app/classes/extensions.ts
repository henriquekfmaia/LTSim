import * as createjs from 'createjs-module';

export interface MouseEventExtension extends MouseEvent {
    readonly stageX: number;
    readonly stageY: number;
}

export class StageExtension extends createjs.Stage {
  selectedContainer: createjs.Container;

  constructor(canvasName: string) {
    super(canvasName);
  }
}