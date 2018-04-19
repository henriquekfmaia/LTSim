import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Process } from '../classes/process';
import { Relationship } from '../classes/relationship';
import { SimulationObject } from '../classes/simulation-object';
import { Distribution } from '../classes/distribution';
@Injectable()
export class SimulatorService {
  private url = 'http://localhost:5000/';
  
  constructor(private http: HttpClient) { }

  simulate(processes: Process[], relationships: Relationship[]): Observable<SimulationObject> {
    var endpoint = this.url + 'simulate';
    // var body = {
    //   processes: processes,
    //   relationships: relationships
    // }
    var simulationObject = new SimulationObject(processes, relationships);
    var result = this.http.post<SimulationObject>(endpoint, simulationObject);
    return result;
  }

}