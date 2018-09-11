import { Distribution } from '../distribution';


export class DefaultDistribution extends Distribution {

    constructor() {
        var fixedIncrement = true;
        var increment = 10;
        var size = 15;
        var limit = 100;
        var startFromUp = false;
        super(fixedIncrement, increment, size, limit, startFromUp);
        this.SerDistributionTulio();
    }

    SerDistributionTulio() {
        this.array[0].key = '2';
        this.array[1].key = '1';
        this.array[2].key = '0.5';
        this.array[3].key = '0.3';
        this.array[4].key = '0.15';
        this.array[5].key = '0.106';
        this.array[6].key = '0.075';
        this.array[7].key = '0.063';
        this.array[8].key = '0.045';
        this.array[9].key = '0.038';
        this.array[10].key = '0.02';
        this.array[11].key = '0.01';
        this.array[12].key = '0.005';
        this.array[13].key = '0.002';
        this.array[14].key = '0.001';
        this.array[15].key = '< 0.001';

        this.array[0].name = '2';
        this.array[1].name = '1';
        this.array[2].name = '0.5';
        this.array[3].name = '0.3';
        this.array[4].name = '0.15';
        this.array[5].name = '0.106';
        this.array[6].name = '0.075';
        this.array[7].name = '0.063';
        this.array[8].name = '0.045';
        this.array[9].name = '0.038';
        this.array[10].name = '0.02';
        this.array[11].name = '0.01';
        this.array[12].name = '0.005';
        this.array[13].name = '0.002';
        this.array[14].name = '0.001';
        this.array[15].name = '< 0.001';
    }
}