import * as createjs from 'createjs-module';
import { Process } from '../process';
import { ContainerExtension } from './container-extension';
import { ProcessContainer } from '../containers/process-container';
import { Relationship } from '../relationship';



export class StageExtension extends createjs.Stage {
  selectedContainer: ProcessContainer;
  creatingRelationship: boolean;

  processes: Process[];
  relationships: Relationship[];

  constructor(canvasName: string) {
    super(canvasName);
    this.creatingRelationship = false;
    this.processes = [];
    this.relationships = [];
  }

  addProcess(process: Process): void {
    process.stageId = this.getNextIdFromArray(-1, this.processes);
    this.processes.push(process);
  }

  removeProcess(process: Process): void {
    var index = this.processes.indexOf(process);
    this.processes.splice(index, 1);
  }

  addRelationship(relationship: Relationship): void {
    relationship.stageId = this.getNextIdFromArray(-1, this.relationships);
    this.relationships.push(relationship);
  }

  removeRelationship(relationship: Relationship): void {
    var index = this.relationships.indexOf(relationship);
    this.relationships.splice(index, 1);
  }

  getNextIdFromArray(feed: number, array: any[]): number {
    {
      if(feed > 10){return 10;}
      if(feed == -1) {
        return this.getNextIdFromArray(array.length, array);
      }
      else if (feed > 0 && (
        array.length == 0 || 
        array.every(function(item, index, array) {
          if(item.stageId != feed) { return true; }
          else { return false; }
        }))) {
          return feed;
      }
      else {
        return this.getNextIdFromArray(feed + 1, array);
      }
    }
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
