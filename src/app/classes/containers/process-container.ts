import * as createjs from 'createjs-module';
import { timer } from 'rxjs/observable/timer';

import { Process } from '../process';
import { MouseEventExtension } from '../extensions/mouse-event-extension';
import { RelationshipContainer } from './relationship-container';

export class ProcessContainer extends createjs.Container {
    process: Process;
  
    constructor(process: Process) {
      super();
      this.process = process;
      var bitmap = new createjs.Bitmap(this.process.image);
      this.addChild(bitmap);
      this.x = 20;
      this.y = 20;
      this.addEventHandlersToProcessContainer(this);
    }

    addEventHandlersToProcessContainer(container: ProcessContainer): void {
        container.on("mousedown", function (evt: MouseEventExtension) {
          this.stage.selectedContainer = this;
          this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
        });
    
        container.on("mouseup", function (evt) {
          this.offset = undefined;
        });
    
        // the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
        container.on("pressmove", function (evt: MouseEventExtension) {
          if(this.offset){
              this.x = evt.stageX + this.offset.x;
              this.y = evt.stageY + this.offset.y;
              this.stage.update();
          }
        });
    
        container.on("dblclick", function (evt) {
          if(this.stage.boo == false) {
            this.stage.startRel = { x: this.x, y: this.y };
            this.stage.boo = true;
          }
          else {
            this.stage.endRel = { x: this.x, y: this.y };
            this.stage.addChild(new RelationshipContainer(this.stage.startRel.x, this.stage.startRel.y, this.stage.endRel.x, this.stage.endRel.y))
            this.stage.boo = false;
            timer(100).subscribe(val => {
              this.stage.update();
            });
          }
        });
      }
    
  }