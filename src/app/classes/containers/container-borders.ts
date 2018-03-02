import { ContainerBorderLine } from '../graphs/container-border-line';
import { ProcessContainer } from './process-container';
import * as createjs from 'createjs-module'; //

export class Borders {
    top: ContainerBorderLine;
    right: ContainerBorderLine;
    bottom: ContainerBorderLine;
    left: ContainerBorderLine;
    parent: ProcessContainer;

    constructor(parent: ProcessContainer) {
        this.parent = parent;
        this.top = new ContainerBorderLine("top", this.parent);
        this.right = new ContainerBorderLine("right", this.parent);
        this.bottom = new ContainerBorderLine("bottom", this.parent);
        this.left = new ContainerBorderLine("left", this.parent);
    }

    getBorders(): ContainerBorderLine[] {
        return [this.top, this.right, this.bottom, this.left];
    }
}