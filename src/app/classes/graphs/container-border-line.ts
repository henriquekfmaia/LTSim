import { RotatedLine } from "./rotated-line";
import { ProcessContainer } from '../containers/process-container'
import * as mathjs from 'mathjs';

export class ContainerBorderLine extends RotatedLine {
    side: string;

    constructor(side: string, parent: ProcessContainer) {
        var start = [0, 0] as [number, number];
        var length = 0;
        var rotation = 0;
        var width = parent.getBounds().width;
        var height = parent.getBounds().height;

        if(side.toLowerCase() == "top") {
            start = [0, 0];
            length = width;
            rotation = 0;
        }
        else if(side.toLowerCase() == "right") {
            start = [width, 0];
            length = height;
            rotation = mathjs.pi/2;
        }
        else if(side.toLowerCase() == "bottom") {
            start = [width, height];
            length = width;
            rotation = mathjs.pi;
        }
        else if(side.toLowerCase() == "left") {
            start = [0, height];
            length = height;
            rotation = 3*mathjs.pi/2;
        }
        super(start, length, rotation);
        this.drawLine();
    }
}