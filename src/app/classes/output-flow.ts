export class OutputFlow {
    id: number;
    modelId: number;
    name: string;
    waterFlowId: number;
    massFlowId: number;
    distributionId: number;
    positionX: number;
    positionY: number;

    start_from_json(outputFlow: OutputFlow): void {
        this.id = outputFlow.id;
        this.modelId = outputFlow.modelId;
        this.name = outputFlow.name;
        this.waterFlowId = outputFlow.waterFlowId;
        this.massFlowId = outputFlow.massFlowId;
        this.distributionId = outputFlow.distributionId;
        this.positionX = outputFlow.positionX;
        this.positionY = outputFlow.positionY;
    }
}