import * as createjs from 'createjs-module';
import { Process } from '../process';
import { ContainerExtension } from './container-extension';
import { ProcessContainer } from '../containers/process-container';



export class StageExtension extends createjs.Stage {
  selectedContainer: ProcessContainer;
  boo: boolean;
  creatingRelationship: boolean;


  constructor(canvasName: string) {
    super(canvasName);
    this.boo = false;
    this.creatingRelationship = false;
  }
}
