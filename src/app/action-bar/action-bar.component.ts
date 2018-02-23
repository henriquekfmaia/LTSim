import { Component, OnInit, Input } from '@angular/core';

import { Scope } from '../classes/scope';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css']
})
export class ActionBarComponent implements OnInit {
  @Input() scope: Scope;

  constructor() { }

  ngOnInit() {
    
  }

  newElement(): void {
    this.scope.stageHandler.newElement();
  }

  deleteElement(): void {
    this.scope.stageHandler.deleteElement();
  }
}
