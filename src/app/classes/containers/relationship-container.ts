import * as createjs from 'createjs-module';
import { RelationshipLine } from '../graphs/relationship-line';

export class RelationshipContainer extends createjs.Container {
    startLine: RelationshipLine;
    midLine: RelationshipLine;
    endLine: RelationshipLine;

    constructor(startX: number, startY: number, endX: number, endY: number) {
        super();
        var midX = (startX + endX)/2
        // var midY = (startY + endY)/2
        this.startLine = new RelationshipLine(startX, startY, midX, startY);
        this.addChild(this.startLine.shape);
        this.midLine = new RelationshipLine(midX, startY, midX, endY);
        this.addChild(this.midLine.shape);
        this.endLine = new RelationshipLine(midX, endY, endX, endY);
        this.addChild(this.endLine.shape);
        this.drawLines();
     }

    drawLines() : void {
        this.startLine.drawLine();
        this.midLine.drawLine();
        this.endLine.drawLine();
    }
}