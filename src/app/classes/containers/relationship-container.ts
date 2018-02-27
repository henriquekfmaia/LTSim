import * as createjs from 'createjs-module';
import { WfLine } from '../graphs/line';

export class RelationshipContainer extends createjs.Container {
    startLine: WfLine;
    midLine: WfLine;
    endLine: WfLine;

    constructor(startX: number, startY: number, endX: number, endY: number) {
        super();
        var midX = (startX + endX)/2
        // var midY = (startY + endY)/2
        this.startLine = new WfLine(startX, startY, midX, startY);
        this.addChild(this.startLine.shape);
        this.midLine = new WfLine(midX, startY, midX, endY);
        this.addChild(this.midLine.shape);
        this.endLine = new WfLine(midX, endY, endX, endY);
        this.addChild(this.endLine.shape);
        this.drawLines();
     }

    drawLines() : void {
        this.startLine.drawLine();
        this.midLine.drawLine();
        this.endLine.drawLine();
    }
}