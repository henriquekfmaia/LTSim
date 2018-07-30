import * as createjs from 'createjs-module';
import { SignalDispatcher, SimpleEventDispatcher, EventDispatcher } from "strongly-typed-events";

import { Process } from '../process';
import { ContainerExtension } from './container-extension';
import { ProcessContainer } from '../containers/process-container';
import { Relationship } from '../relationship';
import { BorderPoint } from '../graphs/point/border-point';
import { CursorLineProperties } from '../graphs/line-properties/cursor-line';
import { SimulationObject } from '../simulation-object';
import { npost } from '../../../../node_modules/@types/q';



export class StageExtension extends createjs.Stage {
  private _onShowDetail = new SimpleEventDispatcher<ProcessContainer>();
  selectedElement: ContainerExtension;
  creatingRelationship: boolean;
  creatingRelationshipLine: CursorLineProperties;

  // processes: Process[];
  processContainers(): ProcessContainer[] {
    return this.children.filter(function(child) {
      if(child instanceof ProcessContainer) {
        return true;
      }
      else {
        return false;
      }
    }).map(function(container: ProcessContainer) {
      return container;
    });
  }

  processes(): Process[] {
    return this.processContainers().map(function(container) {
      return container.process;
    })
  }
  relationships: Relationship[];

  constructor(canvasName: string) {
    super(canvasName);
    this.creatingRelationship = false;
    // this.processes = [];
    this.relationships = [];
    this.updateOnTick();
    this.createRelationshipLineIndicator();
  }

  addProcess(process: Process): void {
    process.stageId = this.getNextIdFromArray(-1, this.processes());
    // this.processes.push(process);
  }

  removeProcess(process: Process): void {
    var index = this.processes().indexOf(process);
    // this.processes.splice(index, 1);
  }

  addRelationship(relationship: Relationship): void {
    relationship.stageId = this.getNextIdFromArray(-1, this.relationships);
    this.relationships.push(relationship);
  }

  addRelationships(relationships: Array<Relationship>): void {
    for(var i = 0; i < relationships.length; i++) {
      if(relationships[i] && relationships[i] != null) {
        this.addRelationship(relationships[i]);
      }
    }
  }

  removeRelationship(relationship: Relationship): void {
    var index = this.relationships.indexOf(relationship);
    this.relationships.splice(index, 1);
  }

  selectElement(element: ContainerExtension): void {
    this.selectedElement = element;
  }

  selectBorderPoint(borderPoint: BorderPoint): void {
    this.selectElement(borderPoint);
    this.creatingRelationship = (borderPoint != null);
    if(this.creatingRelationship) {
      this.createRelationshipLineIndicator();
      var absolutePosition = borderPoint.getAbs();
      this.creatingRelationshipLine.updateStart(absolutePosition.x, absolutePosition.y);
      this.creatingRelationshipLine.updateEnd(absolutePosition.x, absolutePosition.y);
    }
    else {
      this.deleteRelationshipLineIndicator();
    }
    
  }

  selectProcessContainer(processContainer: ProcessContainer): void {
    this.selectElement(processContainer);
    (this.selectedElement as ProcessContainer).onShowDetail.one(s => this._onShowDetail.dispatch(s));
  }

  public get onShowDetail() {
    return this._onShowDetail.asEvent();
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
      this.processes().length == 0 || 
      this.processes().every(function(process, index, array) {
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

  updateOnTick(): void {
    var stage = this;
    createjs.Ticker.framerate = 120;
    createjs.Ticker.addEventListener('tick', function(evt) {
      stage.update();
    });
  }
  
  setSimulationResults(result: SimulationObject): void {
    var newProcesses = result.processes;
    var newRelationships = result.relationships;
    this.updateProcesses(newProcesses);
    this.updateRelationships(newRelationships);
  }
  
  updateProcesses(newProcesses: Process[]): void{
    this.processContainers().forEach(function(c) {
      var result = newProcesses.find(function(np) {
        if(np.stageId == c.process.stageId) {
          return true;
        }
        else {
          return false;
        }
      });
      c.process.setSimulationResult(result);
    });
  }

  updateRelationships(newRelationships: Relationship[]): void {
    this.relationships.forEach(function(r) {
      var result = newRelationships.find(function(nr) {
        if(nr.stageId == r.stageId) {
          return true;
        }
        else {
          return false;
        }
      });
      r.setSimulationResult(result);
    });
  }
  
  createRelationshipLineIndicator(): void {
    this.creatingRelationshipLine = new CursorLineProperties();
    this.addChild(this.creatingRelationshipLine.shape);
  }

  deleteRelationshipLineIndicator(): void {
    this.removeChild(this.creatingRelationshipLine.shape);
    this.creatingRelationshipLine = null;
  }
}
