import * as mathjs from 'mathjs';


export class twoDVector {
    x: number;
    y: number;
    array: [number, number]

    constructor(array: [number, number]) {
        this.x = array[0];
        this.y = array[1];
        this.array = [this.x, this.y]
    }

    rotate(rotation: number): twoDVector {
        var rotationMatrix = mathjs.matrix([[mathjs.cos(rotation), mathjs.sin(rotation)], 
                                            [-mathjs.sin(rotation), mathjs.cos(rotation)]]);
        var rotatedArray = this.getRowFromMatrix(mathjs.multiply(rotationMatrix, this.array));
        return new twoDVector(rotatedArray);
    }

    rotateThis(rotation: number): void {
        var vector = this.rotate(rotation);
        this.x = vector.x;
        this.y = vector.y;
        this.array = vector.array;
    }

    getRowFromMatrix(mat: mathjs.Matrix): [number, number] {
        var x = mathjs.round(mat.get([0])) as number;
        var y = mathjs.round(mat.get([1])) as number;
        return [x, y];
    }

}