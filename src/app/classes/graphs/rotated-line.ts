import * as createjs from 'createjs-module';
import * as mathjs from 'mathjs';
import { twoDVector } from './two-d-vector';

export class RotatedLine extends createjs.Container {
    start: twoDVector;
    end: twoDVector;
    normal: twoDVector;
    length: number;
    rotation: number;
    shape: createjs.Shape;

    constructor(start: twoDVector, length: number, rotation: number) {
        super();
        this.start = start;
        this.rotation = rotation;
        this.length = length
        this.normal = this.getNormal(this.rotation);
        this.end = this.getEnd(this.start, this.length, this.rotation);
        this.shape = new createjs.Shape();
    }

    drawLine(): void {
        this.shape.graphics.beginStroke("black");
        //                    .moveTo(this.start.x, this.start.y)
        //                    .lineTo(this.end.x, this.end.y);
        var w = this.end.x - this.start.x;
        var h = this.end.y - this.start.y;
        this.shape.graphics.rect(this.start.x, this.start.y, w, h);
        // this.shape.graphics.drawRect(this.start.x, this.start.y, w, h);
        this.shape.addEventListener("mouseover", function(a) {console.log(a)})
        var x = (this.start.x + this.end.x)/2;
        var y = (this.start.y + this.end.y)/2;
        this.shape.graphics.beginStroke("black")
                           .moveTo(x, y)
                           .lineTo(x+10*this.normal.x, y+10*this.normal.y);
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