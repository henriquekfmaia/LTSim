import { ContainerBorderLine } from '../graphs/container-border-line';
import { ProcessContainer } from './process-container';
export class Borders {
    top: ContainerBorderLine;
    right: ContainerBorderLine;
    bottom: ContainerBorderLine;
    left: ContainerBorderLine;

    constructor(parent: ProcessContainer) {
        this.top = new ContainerBorderLine("top", parent);
        this.right = new ContainerBorderLine("right", parent);
        this.bottom = new ContainerBorderLine("bottom", parent);
        this.left = new ContainerBorderLine("left", parent);
    }

    getBorders(): ContainerBorderLine[] {
        return [this.top, this.right, this.bottom, this.left];
    }
}