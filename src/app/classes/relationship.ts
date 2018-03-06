import { Process } from './process';
import { RelationshipLineProperties } from './graphs/line-properties/relationship-line';
import { ProcessContainer } from './containers/process-container';
import { StageExtension } from './extensions/stage-extension';
import { StageHandler } from './stage-handler';

export class Relationship {
    source: ProcessContainer;
    destination: ProcessContainer;
    path: RelationshipLineProperties[];

    constructor(source: ProcessContainer, destination: ProcessContainer, stage: StageExtension) {
        console.log(source);
        console.log(destination);
        this.source = source;
        this.destination = destination;
        this.source.process.output.push(this.destination.process);
        this.destination.process.input.push(this.source.process);
        this.getPath(stage);
    }

    getPath(stage: StageExtension): void {
        var line = new RelationshipLineProperties(this.source, this.destination);
        stage.addChild(line.shape);
    }
}