import { Point } from './point';
import { MouseEventExtension } from '../../extensions/mouse-event-extension';


export class BorderPoint extends Point {

    radius: number;

    constructor() {
        super();
        this.x = 0;
        this.y = 0;
        this.radius = 4;
        this.createShape();
        this.addEventHandlersToContainer(this);
    }

    createShape(): void {
        // this.shape.visible = false;
        this.shape.graphics.beginStroke('black')
                           .beginFill('white')
                           .drawCircle(this.x, this.y, this.radius);
    }

    addEventHandlersToContainer(container: BorderPoint): void {
        container.on('mouseover', function(evt) {
            this.shape.visible = true;
            console.log('over');
        });
        
        container.on('mouseout', function(evt) {
            this.shape.visible = false;
            console.log('out');
        });
        
        container.on('mousedown', function(evt: MouseEventExtension) {
            this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
            console.log('down');
        });
        
        container.on('mouseup', function(evt) {
            this.offset = undefined;
        });
        
        container.on('mousemove', function(evt: MouseEventExtension) {
            if(this.offset){
                console.log('move');
                this.x = evt.stageX + this.offset.x;
                this.y = evt.stageY + this.offset.y;
                this.stage.update();
            }
        });
    }
}