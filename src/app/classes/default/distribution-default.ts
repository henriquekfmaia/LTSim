import { Distribution } from '../distribution';


export class DefaultDistribution extends Distribution {

    constructor() {
        var fixedIncrement = true;
        var increment = 10;
        var size = 10;
        var limit = 100;
        var startFromUp = false;
        super(fixedIncrement, increment, size, limit, startFromUp);
    }
}