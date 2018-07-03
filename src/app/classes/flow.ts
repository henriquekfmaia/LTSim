import { Parameter } from './parameter';
import { DefaultDistribution } from './default/distribution-default';

export class Flow {
    waterFlow: Parameter;
    massFlow: Parameter;
    sizeDistribution: Parameter;

    constructor() {
        this.GetInstances();
    }
    
    GetInstances() {
        if(!this.waterFlow) {
            this.waterFlow = new Parameter();
            this.SetDefaultWaterFlow();        
        }
        if(!this.massFlow) {
            this.massFlow = new Parameter();
            this.SetDefaultMassFlow();        
        }
        if(!this.sizeDistribution) {
            this.sizeDistribution = new Parameter();
            this.SetDefaultSizeDistribution();
        }
    }

    SetDefaultValues(): void {
        this.SetDefaultWaterFlow();
        this.SetDefaultMassFlow()
        this.SetDefaultSizeDistribution();
    }

    SetDefaultWaterFlow(): void {
        this.waterFlow.key = 'waterFlow';
        this.waterFlow.name = 'Water Flow';
        this.waterFlow.unit = 't/h';
        this.waterFlow.type = 1;
    }

    SetDefaultMassFlow(): void {
        this.massFlow.key = 'massFlow';
        this.massFlow.name = 'Mass Flow';
        this.massFlow.unit = 't/h';
        this.massFlow.type = 1;
    }

    SetDefaultSizeDistribution(): void {
        this.sizeDistribution.key = 'sizeDistribution';
        this.sizeDistribution.name = 'Size Distribution';
        this.sizeDistribution.unit = 'mm';
        this.sizeDistribution.type = 4;
        this.sizeDistribution.value = new DefaultDistribution();
    }
}