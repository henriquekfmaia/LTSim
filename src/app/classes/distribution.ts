import { Parameter } from "./parameter";
import * as mathjs from 'mathjs';

export class Distribution {
    fixedIncrement: boolean;
    increment: number
    size: number;
    limit: number;
    startFromUp: boolean;
    array: Array<Parameter>;

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
            if(!this.array[i]) {
                this.array[i] = new Parameter();
            }
            this.array[i].key = this.getKeyFromDown(i);
            this.array[i].name = this.array[i].key;
            this.array[i].value = 0;
        }
        this.array[0] = new Parameter();
        this.array[0].key = '< ' + this.array[1].key;
        this.array[0].name = this.array[0].key;
        this.calculateFirst();
    }
    
    setKeysFromArrayFromUp(): void {
        for(var i = this.size; i > 0; i--) {
            if(!this.array[i]) {
                this.array[i] = new Parameter();
            }
            this.array[i].key = this.getKeyFromUp(i);
            this.array[i].name = this.array[i].key;
            this.array[i].value = 0;
        }
        this.array[0] = new Parameter();
        this.array[0].key = '< ' + this.array[1].key;
        this.array[0].name = this.array[0].key;
        this.calculateFirst();
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

    getKeyFromUp(term: number): string {
        var sign = -1;
        if(this.fixedIncrement) {
            return (this.limit + sign * this.increment * (this.array.length-term)).toString();
        }
        else {
            var pow = mathjs.pow(this.increment, (this.array.length-term)) as number;
            return (this.limit + sign * pow).toString();
        }
    }

    getKeyFromDown(term: number): string {
        var sign = 1;
        if(this.fixedIncrement) {
            return (this.limit + sign * this.increment * term).toString();
        }
        else {
            var pow = mathjs.pow(this.increment, term) as number;
            return (this.limit + sign * pow).toString();
        }
    }

    calculateFirst(): void {
        var sum = 0;
        for(var i = 1; i < this.array.length; i++) {
            var term = parseFloat(this.array[i].value);
            if(!isNaN(term)) {
                sum = sum + term;
            }
            else {
                this.array[i].value = 0;
            }
        }
        this.array[0].value = 100 - sum;
    }
}