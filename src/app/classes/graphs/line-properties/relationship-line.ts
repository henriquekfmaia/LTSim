import * as createjs from 'createjs-module';
import { WfLineProperties } from "./workflow-line";
import { twoDVector } from "../two-d-vector";

export class RelationshipLineProperties extends WfLineProperties {
    startContainer: createjs.Container;
    endContainer: createjs.Container;


    constructor(startContainer: createjs.Container, endContainer: createjs.Container) {
        super();
        this.startContainer = startContainer;
        this.endContainer = endContainer;
        this.addEventHandlersToContainer(this);
        this.addEventListener("tick", this.onTick);
        // createjs.Ticker
        // http://jsfiddle.net/lannymcnie/6rh7P/
    }

    addEventHandlersToContainer(container: RelationshipLineProperties): void {
        container.on("tick", function(evt) {
            container.start = new twoDVector([container.startContainer.x, container.startContainer.y])
            container.end = new twoDVector([container.endContainer.x, container.endContainer.y])
            container.drawLine();
            console.log('yay');
        });
    }

    onTick(evt): void {
        console.log(this);
        // console.log(evt);
    }

    doStuff(): void {
        // console.log(this);
    }
}