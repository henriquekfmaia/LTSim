import { RotatedLine } from "./rotated-line";
import { ProcessContainer } from '../containers/process-container'
import * as mathjs from 'mathjs';
import { twoDVector } from "./two-d-vector";
import * as createjs from 'createjs-module';

export class ContainerBorderLine extends createjs.Container {
    side: string;
    properties: RotatedLine;

    constructor(side: string, parent: ProcessContainer) {
        super();
        var start = new twoDVector([0, 0] as [number, number]);
        var length = 0;
        var rotation = 0;
        var width = parent.getBounds().width;
        var height = parent.getBounds().height;

        if(side.toLowerCase() == "top") {
            // start.x = 0;
            // start.y = 0;
            length = width;
            rotation = 0;
        }
        else if(side.toLowerCase() == "right") {
            start.x = width;
            // start.y = 0;
            length = height;
            rotation = mathjs.pi/2;
        }
        else if(side.toLowerCase() == "bottom") {
            start.x = width;
            length = width;
            start.y = height;
            rotation = mathjs.pi;
        }
        else if(side.toLowerCase() == "left") {
            // start.x = 0;
            start.y = height;
            length = height;
            rotation = 3*mathjs.pi/2;
        }
        this.properties = new RotatedLine(start, length, rotation);
        parent.addChild(this);
        this.addChild(this.properties.shape);
        this.properties.drawLine();
    }

    
}