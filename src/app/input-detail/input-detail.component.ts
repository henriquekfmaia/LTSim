import { Component, OnInit, Input } from '@angular/core';
import { Process } from '../classes/process';
import { Relationship } from '../classes/relationship';
import { Distribution } from '../classes/distribution';

@Component({
  selector: 'app-input-detail',
  templateUrl: './input-detail.component.html',
  styleUrls: ['./input-detail.component.css']
})
export class InputDetailComponent implements OnInit {
  @Input() process: Process;

  // flow: Flow;
  inputs: Array<Relationship>;
  allowEdit: Boolean;

  constructor() {
   }

  ngOnInit() {
    if(this.process.inputLimit == 0) {
      this.allowEdit = true;
      this.inputs = this.process.input;
    }
    else {
      this.allowEdit = false;
      this.SetEmptyInputs(this.process.input);
    }
  }

  SetEmptyInputs(inputs: Array<Relationship>) {
    this.inputs = new Array<Relationship>();
    for(var i = 0; i < inputs.length; i++) {
      if(inputs[i]) {
        this.inputs[i] = inputs[i];
      }
      else {
        this.inputs[i] = new Relationship();
      }
    }
  }

  calculateFirst(distribution: Distribution): void {
    distribution.calculateFirst();
  }
}
