import { Parameter } from "./parameter";
import * as mathjs from 'mathjs';

export class Distribution {
    fixedIncrement: boolean;
    increment: number
    size: number;
    array: Array<Parameter>;
    limit: number;
    startFromUp: boolean;

    constructor(fixedIncrement: boolean, increment: number, size: number, limit: number, startFromUp: boolean) {
        this.fixedIncrement = fixedIncrement;
        this.increment = increment;
        this.size = size;
        this.limit = limit;
        this.startFromUp = startFromUp;
        this.array = new Array<Parameter>(size + 1);
        this.setKeysFromArray();
        
    }

    setKeysFromArray(): void {
        if(this.startFromUp) { this.setKeysFromArrayFromUp(); }
        else { this.setKeysFromArrayFromDown(); }
    }

    setKeysFromArrayFromDown(): void {
        for(var i = 1; i <= this.size; i++) {
            
        }
    }
    
    setKeysFromArrayFromUp(): void {
        for(var i = this.size; i > 0; i--) {
            this.array[i].key = this.getKey(i);
            this.array[i].name = this.array[i].key
        }
    }

    getKey(term: number): string {
        var sign = 0;
        if(this.startFromUp) { sign = -1; }
        else { sign = 1; }
        if(this.fixedIncrement) {
            return (this.limit + sign * this.increment * term).toString();
        }
        else {
            var pow = mathjs.pow(this.increment, term) as number;
            return (this.limit + sign * pow).toString();
        }
    }
}