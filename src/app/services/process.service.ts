import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Process } from '../classes/process';
import { ProcessType } from '../classes/process-type';
import { PROCESSES_T1, PROCESSES_T2, PROCESSES_T3 } from '../mock/process-mock';
import { PROCESS_TYPES } from '../mock/process-type-mock';
import { Parameter } from '../classes/parameter';
import { Model } from '../classes/model';

@Injectable()

export class ProcessService {
  private url = 'http://localhost:5000/';

  constructor(private http: HttpClient) { }
  // constructor() { }
  
  getProcessTypes(): Observable<ProcessType[]> {
    var endpoint = this.url + 'get_process_types';
    var result = this.http.get<ProcessType[]>(endpoint);
    result.subscribe(r => console.log(r));
    return result;
  }

  getParametersFromModel(modelId: number): Observable<Parameter[]> {
    var endpoint = this.url + 'get_parameters_from_model/' + modelId.toString();
    var result = this.http.get<Parameter[]>(endpoint);
    result.subscribe(r => console.log(r));
    return result;
  }

  getProcessById(processId: number): Observable<Process> {
    var endpoint = this.url + 'get_process_by_id/' + processId.toString();
    var result = this.http.get<Process>(endpoint);
    result.subscribe(r => console.log(r));
    return result;
  }

  saveModel(model: Model, processId: number): void {
    var endpoint = this.url + 'post_model';
    var body = {
      model: model,
      processId: processId
    };
    console.log(body);
    this.http.post(endpoint, body).subscribe();
  }
}
