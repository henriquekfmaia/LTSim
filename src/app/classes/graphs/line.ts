import * as createjs from 'createjs-module';

export class WfLine {
    start: { x: number, y: number };
    end: { x: number, y: number };
    shape: createjs.Shape;

    constructor(startX: number, startY: number, endX: number, endY: number) {
        this.start = {
            x: startX,
            y: startY
        };
        this.end = {
            x: endX,
            y: endY
        };
        this.shape = new createjs.Shape();
        
    }

    drawLine(): void {
        console.log('drawing...');
        
        this.shape.graphics.beginStroke("black").moveTo(this.start.x, this.start.y).lineTo(this.end.x, this.end.y);
    }

}