import * as createjs from 'createjs-module';
import { twoDVector } from './two-d-vector';

export class WfLine {
    start: twoDVector;
    end: twoDVector;
    shape: createjs.Shape;

    constructor() {
        this.shape = new createjs.Shape();
    }

    drawLine(): void {
        console.log('drawing...');
        this.shape.graphics.beginStroke("black").moveTo(this.start.x, this.start.y).lineTo(this.end.x, this.end.y);
    }

}