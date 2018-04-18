import { Process } from './process';
import { Relationship } from './relationship';

export class SimulationObject {
    processes: Process[];
    relationships: Relationship[];

    constructor(processes: Process[], relationships: Relationship[]) {
        this.processes = processes;
        this.relationships = relationships;
    }
}