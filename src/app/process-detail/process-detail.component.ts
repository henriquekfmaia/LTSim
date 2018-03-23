import { Component, OnInit, Input } from '@angular/core';
import { Scope } from '../classes/scope';
import { Model } from '../classes/model';

@Component({
  selector: 'app-process-detail',
  templateUrl: './process-detail.component.html',
  styleUrls: ['./process-detail.component.css']
})
export class ProcessDetailComponent implements OnInit {
  @Input() scope: Scope;
  constructor() { }

  ngOnInit() {
  }

  changeModel(model: Model): void {
    this.scope.stageHandler.stage.selectedContainer.process.model = model;
  }

}
