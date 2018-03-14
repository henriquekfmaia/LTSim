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

  addProcess(process: Process): void {
    process.stageId = this.getProcessStageId(-1);
    console.log(process.stageId);
    this.processes.push(process);
  }

  removeProcess(process: Process): void {
    var index = this.processes.indexOf(process);
    this.processes.splice(index, 1);
  }

  getProcessStageId(feed: number): number {
    if(feed > 10){return 10;}
    if(feed == -1) {
      return this.getProcessStageId(this.processes.length);
    }
    else if (feed > 0 && (
      this.processes.length == 0 || 
      this.processes.every(function(process, index, array) {
        if(process.stageId != feed) { return true; }
        else { return false; }
      }))) {
        return feed;
    }
    else {
      return this.getProcessStageId(feed + 1);
    }
  }

  checkStageId(item, index, array, feed): boolean {
    if(item.stageId != feed) { return true; }
    else { return false; }
  }
}
