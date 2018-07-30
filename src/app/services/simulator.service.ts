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
    result.subscribe(r => console.log(r));
    result.pipe(
      catchError(this.handleError('getHeroes', []))
    );
    return result;
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}