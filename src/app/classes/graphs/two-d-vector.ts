import * as mathjs from 'mathjs';

export class twoDVector {
    x: number;
    y: number;
    _array: [number, number];
    get array(): [number, number] {
        return [this.x, this.y] as [number, number];
    }

    constructor(array: [number, number]) {
        this.x = array[0];
        this.y = array[1];
    }

    rotate(rotation: number): twoDVector {
        var rotationMatrix = mathjs.matrix([[this.cos(rotation), this.sin(rotation)], 
                                            [this.sin(rotation), -this.cos(rotation)]]);
        var rotatedArray = this.getRowFromMatrix(mathjs.multiply(rotationMatrix, this.array));
        return new twoDVector(rotatedArray);
    }

    rotateThis(rotation: number): void {
        var vector = this.rotate(rotation);
        this.x = vector.x;
        this.y = vector.y;
    }

    getRowFromMatrix(mat: mathjs.Matrix): [number, number] {
        var x = mathjs.round(mat.get([0])) as number;
        var y = mathjs.round(mat.get([1])) as number;
        return [x, y];
    }

    sin(angle: number): number {
        return mathjs.round(mathjs.sin(angle)) as number;
    }

    cos(angle: number): number {
        return mathjs.round(mathjs.cos(angle)) as number;
    }

}