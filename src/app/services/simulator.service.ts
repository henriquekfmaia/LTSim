import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Process } from '../classes/process';
import { Relationship } from '../classes/relationship';
import { SimulationObject } from '../classes/simulation-object';
import { Distribution } from '../classes/distribution';
import { EndpointProvider } from './endpoint';
@Injectable()
export class SimulatorService {
  private endpointProvider = new EndpointProvider();
  constructor(private http: HttpClient) { }

  simulate(processes: Process[], relationships: Relationship[]): Observable<SimulationObject> {
    var endpoint = this.endpointProvider.url + 'simulate';
    // var body = {
    //   processes: processes,
    //   relationships: relationships
    // }
    var simulationObject = new SimulationObject(processes, relationships);
    console.log(simulationObject);
    var result = this.http.post<SimulationObject>(endpoint, simulationObject);
    return result;
  }

}