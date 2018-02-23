import { ProcessType } from '../classes/process-type';

import {PROCESSES_T1, PROCESSES_T2, PROCESSES_T3} from './process-mock';

export const PROCESS_TYPES: ProcessType[] = [
    { id: 1, name: 'Type 1', processes: PROCESSES_T1 },
    { id: 2, name: 'Type 2', processes: PROCESSES_T2 },
    { id: 3, name: 'Type 3', processes: PROCESSES_T3 }
];