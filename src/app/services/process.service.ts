import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Process } from '../classes/process';
import { ProcessType } from '../classes/process-type';
import { PROCESSES_T1, PROCESSES_T2, PROCESSES_T3 } from '../mock/process-mock';
import { PROCESS_TYPES } from '../mock/process-type-mock';

@Injectable()
export class ProcessService {

  constructor() { }
  
  test(): void {
    console.log('AAA');
  }

  getProcessTypes(): Observable<ProcessType[]> {
    return of(PROCESS_TYPES);
  }
}
