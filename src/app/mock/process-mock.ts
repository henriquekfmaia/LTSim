import { Process } from "../classes/process";
import { ProcessImage } from "../classes/process-image";


export const PROCESSES_T1: Process[] = [
    new Process(1, 'P1', 1, './assets/azul.png'),
    new Process(2, 'P2', 1, './assets/azul.png'),
    new Process(3, 'P3', 1, './assets/azul.png'),
];

export const PROCESSES_T2: Process[] = [
    new Process(4, 'Coisa', 2, './assets/azul.png'),
    new Process(5, 'Teste', 2, './assets/azul.png'),
];

export const PROCESSES_T3: Process[] = [
    new Process(6, 'ABC', 3, './assets/azul.png'),
    new Process(7, '123', 3, './assets/azul.png'),
    new Process(8, '!@#', 3, './assets/azul.png'),
    new Process(9, '*()', 3, './assets/azul.png'),
];