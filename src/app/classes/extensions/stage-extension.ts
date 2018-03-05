import * as createjs from 'createjs-module';
import { Process } from '../process';



export class StageExtension extends createjs.Stage {
  selectedContainer: createjs.Container;
  boo: boolean;
  creatingRelationship: boolean;


  constructor(canvasName: string) {
    super(canvasName);
    this.boo = false;
    this.creatingRelationship = false;
  }
}
