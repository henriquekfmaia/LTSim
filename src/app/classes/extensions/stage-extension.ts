import * as createjs from 'createjs-module';
import { Process } from '../process';
import { ContainerExtension } from './container-extension';



export class StageExtension extends createjs.Stage {
  selectedContainer: ContainerExtension;
  boo: boolean;
  creatingRelationship: boolean;


  constructor(canvasName: string) {
    super(canvasName);
    this.boo = false;
    this.creatingRelationship = false;
  }
}
