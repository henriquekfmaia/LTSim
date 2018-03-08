import * as createjs from 'createjs-module';
import { timer } from 'rxjs/observable/timer';

import { Process } from '../process';
import { MouseEventExtension } from '../extensions/mouse-event-extension';
import { Borders } from './container-borders';
import { StageExtension } from '../extensions/stage-extension';
import { Relationship } from '../relationship';
import { BorderPoint } from '../graphs/point/border-point';
import { ContainerExtension } from '../extensions/container-extension';

export class ProcessContainer extends ContainerExtension {
    process: Process;
    borders: Borders;
  
    constructor() {
      super();
    }

    start(process: Process): void {
      this.process = process;
      this.setBitmap(this.process.image);
      this.x = 20;
      this.y = 20;
      this.addEventHandlersToProcessContainer(this);
      timer(100).subscribe(val => {
        this.borders = new Borders(this);
      });
    }
    
    setBitmap(path: string) {
      var bitmap = new createjs.Bitmap(path);
      this.addChild(bitmap);
    }

    addInputRelationship(sourceContainer: ProcessContainer): void {
      var stage = this.stage as StageExtension;
      var relationship = new Relationship(sourceContainer, this, stage);
    }

    createPoint(): BorderPoint {
      var point = new BorderPoint();
      this.addChild(point);
      // this.addChild(point.shape);
      return point;
    }

    addEventHandlersToProcessContainer(container: ProcessContainer): void {
        container.on("mousedown", function (evt: MouseEventExtension) {
          if(evt.nativeEvent.button == 0
          && this.stage.creatingRelationship == false
          && evt.target.parent == container) {
            this.stage.selectedContainer = this;
            this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
          }
          else if(evt.nativeEvent.button == 2) {
            console.log(evt);
          }
        });
    
        container.on("mouseup", function (evt: MouseEventExtension) {
          this.offset = undefined;
        });

        // the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
        container.on("pressmove", function (evt: MouseEventExtension) {
          if(this.offset && evt.target.parent == container){
              this.x = evt.stageX + this.offset.x;
              this.y = evt.stageY + this.offset.y;
              this.stage.update();
          }
        });
    
        container.on("dblclick", function (evt: MouseEventExtension) {
          if(this.stage.creatingRelationship == false) {
            this.stage.selectedContainer = this;
            this.stage.creatingRelationship = true;
          }
          else if(this.stage.creatingRelationship == true) {
            this.addInputRelationship(this.stage.selectedContainer);
            // this.stage.selectedContainer = null;
            this.stage.creatingRelationship = false;
          }
          if(this.stage.boo == false) {
            this.stage.boo = true;
          }
          else {
            this.stage.boo = false;
            timer(100).subscribe(val => {
              this.stage.update();
            });
          }
        });
      }
  }