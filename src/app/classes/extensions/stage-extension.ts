import * as createjs from 'createjs-module';
import { Process } from '../process';
import { ContainerExtension } from './container-extension';
import { ProcessContainer } from '../containers/process-container';
import { Relationship } from '../relationship';



export class StageExtension extends createjs.Stage {
  selectedContainer: ProcessContainer;
  boo: boolean;
  creatingRelationship: boolean;

  processes: Process[];
  relationships: Relationship[];

  constructor(canvasName: string) {
    super(canvasName);
    this.boo = false;
    this.creatingRelationship = false;
    this.processes = [];
    this.relationships = [];
  }
}
