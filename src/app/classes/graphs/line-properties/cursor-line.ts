import * as createjs from 'createjs-module';
import { WfLineProperties } from "./workflow-line";
import { twoDVector } from "../two-d-vector";
import { ContainerExtension } from '../../extensions/container-extension';

export class CursorLineProperties extends WfLineProperties {

    constructor() {
        super();
    }

    updateStart(posX: number, posY: number) {
        this.start = new twoDVector([posX, posY]);
        this.drawIfValid();
    }

    updateEnd(posX: number, posY: number) {
        this.end = new twoDVector([posX, posY]);
        this.drawIfValid();
    }

    drawIfValid() {
        if(this.checkIfLineIsValid()) {
            this.drawLine();
        }
    }
}