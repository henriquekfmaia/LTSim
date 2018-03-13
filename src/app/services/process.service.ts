import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Process } from '../classes/process';
import { ProcessType } from '../classes/process-type';
import { PROCESSES_T1, PROCESSES_T2, PROCESSES_T3 } from '../mock/process-mock';
import { PROCESS_TYPES } from '../mock/process-type-mock';

@Injectable()

export class ProcessService {
  private url = 'http://localhost:5000/';

  constructor(private http: HttpClient) { }
  // constructor() { }
  
  test(): void {
    console.log('AAA');
  }

  getProcessTypes(): Observable<ProcessType[]> {
    var endpoint = this.url + 'get_process_types';
    return this.http.get<ProcessType[]>(endpoint);
    // return of(PROCESS_TYPES);
  }
}
