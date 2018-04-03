import { Component, OnInit } from '@angular/core';

import { Scope } from '../classes/scope';
import { Process } from '../classes/process';

@Component({
  selector: 'app-simulator-interface',
  templateUrl: './simulator-interface.component.html',
  styleUrls: ['./simulator-interface.component.css']
})
export class SimulatorInterfaceComponent implements OnInit {

  scope: Scope = new Scope();

  constructor() { }

  ngOnInit() {
    this.scope.onShowDetail.subscribe(p => this.showProcessDetail(p.process));
    // this.scope.onShowDetail.one(p => this.showProcessDetail(p.process));
  }

  showProcessDetail(process: Process) {
    console.log(process);
  }

}
