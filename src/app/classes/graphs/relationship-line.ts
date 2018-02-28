import { WfLine } from "./workflow-line";
import { twoDVector } from "./two-d-vector";

export class RelationshipLine extends WfLine {
    constructor(startX: number, startY: number, endX: number, endY: number) {
        super();
        this.start = new twoDVector([startX, startY]);
        this.end = new twoDVector([endX, endY]);
    }
}