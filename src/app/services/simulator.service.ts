import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Process } from '../classes/process';
import { Relationship } from '../classes/relationship';
import { SimulationObject } from '../classes/simulation-object';
import { Distribution } from '../classes/distribution';
import { EndpointProvider } from './endpoint';
import { Toast } from "toaster-js";



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
    var result = this.http.post<SimulationObject>(endpoint, simulationObject);
    result.subscribe(r => console.log(r));
    result.toPromise().catch(function(error) {
      console.log(error);
      new Toast(error.error.message, Toast.TYPE_ERROR, Toast.TIME_LONG);
    });
    return result;
  }
}