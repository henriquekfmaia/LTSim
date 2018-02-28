import * as createjs from 'createjs-module';
import * as mathjs from 'mathjs';
import { twoDVector } from './two-d-vector';

export class RotatedLine {
    start: twoDVector;
    end: twoDVector;
    normal: twoDVector;
    length: number;
    rotation: number;
    shape: createjs.Shape;

    constructor(start: [number, number], length: number, rotation: number) {
        this.start = new twoDVector(start);
        this.rotation = rotation;
        this.length = length
        this.normal = this.getNormal(this.rotation);
        this.end = this.getEnd(this.start, this.length, this.rotation);
        this.shape = new createjs.Shape();
    }

    drawLine(): void {
        console.log('drawing from [' + this.start.x + ',' + this.start.y + ']');
        console.log('drawing to [' + this.end.x + ',' + this.end.y + ']');
        this.shape.graphics.beginStroke("black").moveTo(0, 0).lineTo(100, 100);
        this.shape.graphics.beginStroke("black").moveTo(this.start.x, this.start.y).lineTo(this.end.x, this.end.y);
    }

    getNormal(rotation: number): twoDVector {
        var normal = new twoDVector([0, 1]);
        normal.rotateThis(rotation);
        return normal;
    }

    getEnd(start: twoDVector, length: number, rotation: number): twoDVector {
        var distance = new twoDVector([length, 0]).rotate(rotation);
        var endMat = mathjs.add(start.array, distance.array);
        return new twoDVector(endMat as [number, number]);
    }
}