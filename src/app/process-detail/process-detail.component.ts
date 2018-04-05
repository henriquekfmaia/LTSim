import { Component, OnInit, Input } from '@angular/core';
import { Scope } from '../classes/scope';
import { Model } from '../classes/model';
import { Process } from '../classes/process';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Distribution } from '../classes/distribution';

@Component({
  selector: 'app-process-detail',
  templateUrl: './process-detail.component.html',
  styleUrls: ['./process-detail.component.css']
})
export class ProcessDetailComponent implements OnInit {
  @Input() process: Process;
  
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.changeModel(this.process.model);
  }

  changeModel(model: Model): void {
    if(model && model != null) { 
      this.process.model = model;
      this.process.model.parameters.forEach(function(p) {
        if(p.type == 4 && !(p.value instanceof Distribution)) {
          p.value = new Distribution(true, 10, 10, 100, true);
        }
      });
    }
  }

}
