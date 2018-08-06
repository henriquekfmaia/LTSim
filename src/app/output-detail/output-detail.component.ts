import { Component, OnInit, Input } from '@angular/core';
import { Process } from '../classes/process';
import { Relationship } from '../classes/relationship';
import { Distribution } from '../classes/distribution';

@Component({
  selector: 'app-output-detail',
  templateUrl: './output-detail.component.html',
  styleUrls: ['./output-detail.component.css']
})
export class OutputDetailComponent implements OnInit {

  @Input() process: Process;

  // flow: Flow;
  outputs: Array<Relationship>;
  allowEdit: Boolean;

  constructor() {
   }

  ngOnInit() {
    this.allowEdit = false;
    this.SetEmptyOutputs(this.process.output);
  }

  SetEmptyOutputs(outputs: Array<Relationship>) {
    this.outputs = new Array<Relationship>();
    for(var i = 0; i < outputs.length; i++) {
      if(outputs[i]) {
        this.outputs[i] = outputs[i];
      }
      else {
        this.outputs[i] = new Relationship();
      }
    }
  }

  calculateFirst(distribution: Distribution): void {
    distribution.calculateFirst();
  }
}
