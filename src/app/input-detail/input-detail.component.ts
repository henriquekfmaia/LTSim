import { Component, OnInit, Input } from '@angular/core';
import { Process } from '../classes/process';
import { Flow } from '../classes/flow';

@Component({
  selector: 'app-input-detail',
  templateUrl: './input-detail.component.html',
  styleUrls: ['./input-detail.component.css']
})
export class InputDetailComponent implements OnInit {
  @Input() process: Process;

  flow: Flow;

  constructor() {
   }

  ngOnInit() {
    this.flow = this.process.input[0].flow;
  }

}
