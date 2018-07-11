import * as createjs from 'createjs-module';
import { WfLineProperties } from "./workflow-line";
import { twoDVector } from "../two-d-vector";
import { ContainerExtension } from '../../extensions/container-extension';

export class LineProperties extends WfLineProperties {
    startContainer: ContainerExtension;
    endContainer: ContainerExtension;

    constructor() {
        super();
        this.forceTickerHandle();
    }

    forceTickerHandle(): void {
        var container = this;
        createjs.Ticker.framerate = 60;
        createjs.Ticker.addEventListener('tick', function(evt) {
            if(container.startContainer && container.endContainer) {
                container.start = new twoDVector([container.startContainer.getAbs().x, container.startContainer.getAbs().y])
                container.end = new twoDVector([container.endContainer.getAbs().x, container.endContainer.getAbs().y])
                container.drawLine();
            }
        });
    }

    deleteSelf(): void {
        
    }   
}