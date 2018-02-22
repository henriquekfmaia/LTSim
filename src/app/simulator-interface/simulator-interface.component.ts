import { Component, OnInit } from '@angular/core';

import { Scope } from '../classes/scope';

@Component({
  selector: 'app-simulator-interface',
  templateUrl: './simulator-interface.component.html',
  styleUrls: ['./simulator-interface.component.css']
})
export class SimulatorInterfaceComponent implements OnInit {

  scope: Scope = new Scope();

  constructor() { }

  ngOnInit() {
  }

}
