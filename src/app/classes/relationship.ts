import { LineProperties } from './graphs/line-properties/line-properties';
import { ProcessContainer } from './containers/process-container';
import { StageExtension } from './extensions/stage-extension';
import { Flow } from './flow';
import { BorderPoint } from './graphs/point/border-point';
import { Process } from './process';

export class Relationship {
    sourceId: number;
    destinationId: number;
    path: LineProperties[];
    stageId: number;
    flow: Flow;
    
    constructor() {
        this.flow = new Flow();
    }

    setOnlySource(sourceProcess: Process) {
        this.sourceId = sourceProcess.stageId;
        this.destinationId = 0;
    }

    setOnlyDestination(destinationProcess: Process) {
        this.sourceId = 0;
        this.destinationId = destinationProcess.stageId;
    }

    setPoints(sourcePoint: BorderPoint, destinationPoint: BorderPoint): void {
        var sourceContainer = sourcePoint.parent as ProcessContainer;
        this.sourceId = sourceContainer.process.stageId;

        var destinationContainer = destinationPoint.parent as ProcessContainer;
        this.destinationId = destinationContainer.process.stageId;

        sourceContainer.process.addOutput(this, sourcePoint.arrayId);
        destinationContainer.process.addOutput(this, destinationPoint.arrayId);

        this.getPath(sourcePoint, destinationPoint);
    }
    
    getPath(sourcePoint: BorderPoint, destinationPoint: BorderPoint): void {
        var line = new LineProperties();
        line.startContainer = sourcePoint;
        line.endContainer = destinationPoint;
        sourcePoint.stage.addChild(line.shape);
    }
}