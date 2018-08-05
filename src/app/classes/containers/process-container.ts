import * as createjs from 'createjs-module';
import { timer } from 'rxjs/observable/timer';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { SignalDispatcher, SimpleEventDispatcher, EventDispatcher } from "strongly-typed-events";

import { Process } from '../process';
import { MouseEventExtension } from '../extensions/mouse-event-extension';
import { Borders } from './container-borders';
import { StageExtension } from '../extensions/stage-extension';
import { Relationship } from '../relationship';
import { BorderPoint } from '../graphs/point/border-point';
import { ContainerExtension } from '../extensions/container-extension';
import { resolve } from '../../../../node_modules/@types/q';

export class ProcessContainer extends ContainerExtension {
    private _onShowDetail = new SimpleEventDispatcher<ProcessContainer>();
    process: Process;
    borders: Borders;
  
    constructor() {
      super();
    }

    start(process: Process): void {
      this.process = process;
      this.setBitmap(this.process.imagePath);
      this.x = 20;
      this.y = 20;
      this.process.modelStartup();
      this.addEventHandlersToProcessContainer(this);
      var borders = this.createBorders();
      borders.then(v => {
        this.createRelationshipPoints();
      });
    }

    setBitmap(path: string) {
      var bitmap = new createjs.Bitmap(path);
      this.addChild(bitmap);
    }

    createRelationshipPoints(): void {
      this.createInputPoints();
      this.createOutputPoints();
    }

    createInputPoints(): void {
      var isInput = true;
      var posX = 0;
      for(var i = 0; i < this.process.inputLimit; i++) {
        var posY = (i + 1)/(this.process.inputLimit + 1);
        this.createPoint(i, isInput, posX, posY);
      }
    }

    createOutputPoints(): void {
      var isInput = false;
      var posX = 1;
      for(var i = 0; i < this.process.outputLimit; i++) {
        var posY = (i + 1)/(this.process.outputLimit + 1);
        this.createPoint(i, isInput, posX, posY);
      }
    }

    createPoint(arrayId: number, isInput: Boolean, posX: number, posY: number): BorderPoint {
      var point = new BorderPoint(arrayId, isInput);
      this.addChild(point);
      point.setPosition(posX, posY);
      return point;
    }

    createBorders(): Promise<any> {
      var p = new Promise((resolve, reject) => {
        var bounds = this.getBounds();
        if(bounds && bounds != null) {
          this.borders = new Borders(this);
          resolve();
        }
        else {
          timer(50).subscribe(val => {
           resolve(this.createBorders());
          });
        }
      });
      return p;
    }

    addEventHandlersToProcessContainer(container: ProcessContainer): void {
        container.on("mousedown", function (evt: MouseEventExtension) {
          if(evt.nativeEvent.button == 0
          && this.stage.creatingRelationship == false
          && evt.target.parent == container) {
            this.stage.selectElement(this);
            this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
          }
          else if(evt.nativeEvent.button == 2) {
            var stage = this.stage as StageExtension;
            this.offset = null;
            stage.selectProcessContainer(this);
            this._onShowDetail.dispatch(this);
          }
        });

        // the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
        container.on("pressmove", function (evt: MouseEventExtension) {
          if(this.offset && this.offset != null && evt.target.parent == container){
              this.x = evt.stageX + this.offset.x;
              this.y = evt.stageY + this.offset.y;
          }
        });
    
        container.on("dblclick", function (evt: MouseEventExtension) {
          if(this.stage.creatingRelationship == false) {
            this.stage.selselectedElement(this);
            this.stage.creatingRelationship = true;
          }
          else if(this.stage.creatingRelationship == true) {
            this.addInputRelationship(this.stage.selectedElement);
            this.stage.creatingRelationship = false;
          }
        });
    }

    public get onShowDetail() {
      return this._onShowDetail.asEvent();
    }

    deleteSelf(): void {
      var stage = this.stage as StageExtension;
      stage.removeChild(this);
      stage.removeProcess(this.process);
    }
}