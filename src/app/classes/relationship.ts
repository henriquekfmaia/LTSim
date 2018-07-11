import { LineProperties } from './graphs/line-properties/line-properties';
import { ProcessContainer } from './containers/process-container';
import { StageExtension } from './extensions/stage-extension';
import { Flow } from './flow';
import { BorderPoint } from './graphs/point/border-point';

export class Relationship {
    sourceId: number;
    destinationId: number;
    path: LineProperties[];
    stageId: number;
    flow: Flow;
    
    // private _sourcePoint: BorderPoint;
    // private _destinationPoint: BorderPoint;

    // get SourcePoint(): BorderPoint { return this._sourcePoint; }
    // get DestinationPoint(): BorderPoint { return this._destinationPoint; }

    // set SourcePoint(point: BorderPoint) { this._sourcePoint = point; }
    // set DestinationPoint(point: BorderPoint) { this._destinationPoint = point; }
    
    constructor(sourcePoint: BorderPoint, destinationPoint: BorderPoint) {
        var stage = sourcePoint.stage as StageExtension;
        // this.SourcePoint = sourcePoint;
        // this.DestinationPoint = destinationPoint;

        var sourceContainer = sourcePoint.parent as ProcessContainer;
        this.sourceId = sourceContainer.process.stageId;

        var destinationContainer = destinationPoint.parent as ProcessContainer;
        this.destinationId = destinationContainer.process.stageId;

        sourceContainer.process.addOutput(this, sourcePoint.arrayId);
        destinationContainer.process.addOutput(this, destinationPoint.arrayId);

        this.flow = new Flow();
        this.getPath(sourcePoint, destinationPoint);
    }
    
    getPath(sourcePoint: BorderPoint, destinationPoint: BorderPoint): void {
        var line = new LineProperties();
        line.startContainer = sourcePoint;
        line.endContainer = destinationPoint;
        sourcePoint.stage.addChild(line.shape);
    }
}