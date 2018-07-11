import { Point } from './point';
import { MouseEventExtension } from '../../extensions/mouse-event-extension';
import { StageExtension } from '../../extensions/stage-extension';
import { ProcessContainer } from '../../containers/process-container';
import { Relationship } from '../../relationship';

export class BorderPoint extends Point {
    arrayId: number;
    isInput: Boolean;
    radius: number;
    color: string;
    targetBorderPoint: BorderPoint;

    constructor(arrayId: number, isInput: Boolean) {
        super();
        this.x = 0;
        this.y = 0;
        this.arrayId = arrayId;
        this.isInput = isInput;
        if(this.isInput) {
            this.color = 'LawnGreen';
        }
        else {
            this.color = 'red';
        }
        this.radius = 4;
        this.createShape();
        this.addEventHandlersToContainer(this);
    }

    createShape(): void {
        this.addChild(this.shape);
        // this.shape.visible = false;
        this.shape.graphics.beginStroke('black')
                           .beginFill(this.color)
                           .drawCircle(this.x, this.y, this.radius);
    }

    setPosition(posX: number, posY: number): void {
        var bounds = this.parent.getBounds();
        var height = bounds.height;
        var width = bounds.width;
        this.x = posX * width;
        this.y = posY * height;
    }

    addEventHandlersToContainer(container: BorderPoint): void {
        container.on('mousedown', function(evt: MouseEventExtension) {
            if(evt.target.parent == container) {
                var stage = container.parent.stage as StageExtension;
                stage.selectBorderPoint(this);
                console.log('mousedown');
            }
        });
        
        container.on('pressup', function(evt: MouseEventExtension) {
            if(evt.target.parent == container) {
                var stage = container.parent.stage as StageExtension;
                console.log('pressup');
                if(container.isInput) {
                    this.createRelationship(container.targetBorderPoint, container);
                    console.log('creating relationship')                    
                }
                else {
                    this.createRelationship(container, container.targetBorderPoint);
                }
                stage.selectBorderPoint(null);
            }
        });

        container.on('mouseover', function(evt: MouseEventExtension) {
            if(evt.target.parent == container) {
                var stage = container.parent.stage as StageExtension;
                var selectedPoint = stage.selectedElement as BorderPoint;
                if(selectedPoint && (selectedPoint.targetBorderPoint || selectedPoint.targetBorderPoint == null)) {
                    selectedPoint.targetBorderPoint = container;
                    console.log('mouseover');
                }
            }
        });

        container.on('mouseout', function(evt: MouseEventExtension) {
            if(evt.target.parent == container) {
                var stage = container.parent.stage as StageExtension;
                var selectedPoint = stage.selectedElement as BorderPoint;
                if(selectedPoint && (selectedPoint.targetBorderPoint || selectedPoint.targetBorderPoint == null)) {
                    selectedPoint.targetBorderPoint = container;
                    console.log('mouseout');
                }
            }
        });
        
        container.on('pressmove', function(evt: MouseEventExtension) {
            var stage = container.parent.stage as StageExtension;
            var selectedPoint = stage.selectedElement as BorderPoint;
            if(selectedPoint && (selectedPoint.targetBorderPoint || selectedPoint.targetBorderPoint == null)) {
                stage.creatingRelationshipLine.updateEnd(evt.rawX, evt.rawY);
            }
            console.log('move');
        });
    }

    createRelationship(source: BorderPoint, destination: BorderPoint): void {
        if(this.validateRelationship(source, destination)) {
            var stage = source.parent.stage as StageExtension;
            var relationship = new Relationship();
            relationship.setPoints(source, destination);
            stage.addRelationship(relationship);
        }
    }

    validateRelationship(source: BorderPoint, destination: BorderPoint): Boolean {
        if(source.isInput == destination.isInput) { return true; }
        else { return true; }
    }

    deleteSelf(): void {
        
    }   
}