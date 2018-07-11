import * as createjs from 'createjs-module';
import { twoDVector } from '../two-d-vector';
import { ContainerExtension } from '../../extensions/container-extension';
export class WfLineProperties extends ContainerExtension {
    start: twoDVector;
    end: twoDVector;
    shape: createjs.Shape;

    constructor() {
        super();
        this.shape = new createjs.Shape();
    }

    drawLine(): void {
        this.shape.graphics.clear()
                           .beginStroke("black")
                           .moveTo(this.start.x, this.start.y)
                           .lineTo(this.end.x, this.end.y);
    }

    checkIfLineIsValid(): Boolean {
        if (this.start && this.start.x && this.start.y && this.end && this.end.x && this.end.y) {
            return true;
        }
        else {
            return false;
        }
    }

    deleteSelf(): void {
        
    }   
}