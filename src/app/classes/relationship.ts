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
        this.setInputOutput(source, destination);
        
        this.getPath(stage);
    }
    
    setInputOutput(source: ProcessContainer, destination: ProcessContainer): void {
        this.source = source;
        this.destination = destination;
        this.source.process.addOutput(this.destination.process);
        this.destination.process.addInput(this.source.process);
    }

    getPath(stage: StageExtension): void {
        var sourcePoint = this.source.createPoint('red');
        var destinationPoint = this.destination.createPoint('LawnGreen');
        var line = new RelationshipLineProperties(sourcePoint, destinationPoint);
        // var line = new RelationshipLineProperties(this.source, this.destination);
        stage.addChild(line.shape);
    }
}