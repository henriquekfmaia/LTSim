import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Process } from '../classes/process';
import { Relationship } from '../classes/relationship';
@Injectable()
export class SimulatorService {
  private url = 'http://localhost:5000/';
  
  constructor(private http: HttpClient) { }

  simulate(processes: Process[], relationships: Relationship[]): void {
    var endpoint = this.url + 'simulate';
    var body = {
      processes: processes,
      relationships: relationships
    }
    var r = this.http.post<Body>(endpoint, body).subscribe(result => console.log(result));
  }

}

export class Body {
  processes: Process[]
  relationship: Relationship[]
}