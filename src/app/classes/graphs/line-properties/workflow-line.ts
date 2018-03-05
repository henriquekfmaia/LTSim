import * as createjs from 'createjs-module';
import { twoDVector } from '../two-d-vector';

export class WfLineProperties extends createjs.Container {
    start: twoDVector;
    end: twoDVector;
    shape: createjs.Shape;

    constructor() {
        super();
        this.shape = new createjs.Shape();
    }

    drawLine(): void {
        this.shape.graphics.beginStroke("black")
                           .moveTo(this.start.x, this.start.y)
                           .lineTo(this.end.x, this.end.y);
    }

}