import * as createjs from 'createjs-module';
import * as mathjs from 'mathjs';
import { twoDVector } from '../two-d-vector';
import { WfLineProperties } from "./workflow-line";

export class RotatedLineProperties extends WfLineProperties {
    start: twoDVector;
    end: twoDVector;
    normal: twoDVector;
    length: number;
    rotation: number;

    constructor(start: twoDVector, length: number, rotation: number) {
        super();
        this.start = start;
        this.rotation = rotation;
        this.length = length
        this.normal = this.getNormal(this.rotation);
        this.end = this.getEnd(this.start, this.length, this.rotation);
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

    deleteSelf(): void {
        
    }   
}