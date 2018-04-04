import { Component, OnInit, Input } from '@angular/core';
import { Scope } from '../classes/scope';
import { Model } from '../classes/model';
import { Process } from '../classes/process';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-process-detail',
  templateUrl: './process-detail.component.html',
  styleUrls: ['./process-detail.component.css']
})
export class ProcessDetailComponent implements OnInit {
  // @Input() scope: Scope;
  @Input() process: Process;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  changeModel(model: Model): void {
    this.process.model = model;
  }

}
