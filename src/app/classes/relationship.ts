import { Process } from './process';
import { RelationshipLineProperties } from './graphs/line-properties/relationship-line';
import { ProcessContainer } from './containers/process-container';
import { StageExtension } from './extensions/stage-extension';
import { StageHandler } from './stage-handler';
import { Flow } from './flow';

export class Relationship {
    sourceId: number;
    destinationId: number;
    path: RelationshipLineProperties[];
    stageId: number;
    isRelationshipValid: Boolean;
    flow: Flow;

    constructor(source: ProcessContainer, destination: ProcessContainer, stage: StageExtension) {
        this.isRelationshipValid = this.setInputOutput(source, destination);
        if(this.isRelationshipValid) {
            this.getPath(source, destination, stage);
        }
        this.flow = new Flow();
    }
    
    setInputOutput(source: ProcessContainer, destination: ProcessContainer): Boolean {
        this.sourceId = source.process.stageId;
        this.destinationId = destination.process.stageId;
        if(source.process.checkOutputLimit() && destination.process.checkInputLimit()) {
            source.process.addOutput(this);
            destination.process.addInput(this);
            return true;
        }
        else {
            return false;
        }
    }

    getPath(source: ProcessContainer, destination: ProcessContainer, stage: StageExtension): void {
        var sourcePoint = source.createPoint('red');
        var destinationPoint = destination.createPoint('LawnGreen');
        var line = new RelationshipLineProperties(sourcePoint, destinationPoint);
        // var line = new RelationshipLineProperties(this.source, this.destination);
        stage.addChild(line.shape);
    }
}