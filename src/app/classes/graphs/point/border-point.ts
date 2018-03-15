import { Point } from './point';
import { MouseEventExtension } from '../../extensions/mouse-event-extension';
import { TargetLocator } from 'selenium-webdriver';
import * as mathjs from 'mathjs';

export class BorderPoint extends Point {

    radius: number;
    color: string;

    constructor(color = 'white') {
        super();
        this.x = 0;
        this.y = 0;
        this.radius = 4;
        this.color = color;
        this.createShape();
        this.addEventHandlersToContainer(this);
    }

    createShape(): void {
        this.addChild(this.shape);
        // this.shape.visible = false;
        this.shape.graphics.beginStroke('black')
                           .beginFill(this.color)
                           .drawCircle(this.x, this.y, this.radius);
    }

    addEventHandlersToContainer(container: BorderPoint): void {
        container.on('mousedown', function(evt: MouseEventExtension) {
            this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
            if(evt.target.parent == container) {
                // console.log(evt);
            }
        });
        
        container.on('mouseup', function(evt: MouseEventExtension) {
            this.offset = undefined;
            if(evt.target.parent == container) {
                // console.log(evt);
            }
        });
        
        container.on('pressmove', function(evt: MouseEventExtension) {
            if(this.offset){
                this.x = evt.stageX + this.offset.x;
                this.y = evt.stageY + this.offset.y;
                var height = container.parent.getBounds().height;
                var width = container.parent.getBounds().width;
                var top = mathjs.abs(this.y);
                var bottom = mathjs.abs(this.y - height);
                var left = mathjs.abs(this.x);
                var right = mathjs.abs(this.x - width);
                var min = mathjs.min([top, bottom, left, right]);

                if(min == top || this.y < 0) {
                    this.y = 0;
                }
                else if(min == bottom || this.y > height) {
                    this.y = height;
                }
                if(min == left || this.x < 0) {
                    this.x = 0;
                }
                else if(min == right || this.x > width) {
                    this.x = container.parent.getBounds().width;
                }
                this.stage.update();
            }
        });
    }
}