import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ProcessType } from '../classes/process-type';
import { Process } from '../classes/process';
import { ProcessService } from '../services/process.service';
import { Parameter } from '../classes/parameter';
import { Model } from '../classes/model';

@Component({
  selector: 'app-process-editor',
  templateUrl: './process-editor.component.html',
  styleUrls: ['./process-editor.component.css']
})
export class ProcessEditorComponent implements OnInit {

  types: ProcessType[];
  processes: Array<Process>;
  processCache: Array<Process>;
  process: Process;

  constructor(private processService: ProcessService) {
    this.processCache = new Array<Process>();
  }

  ngOnInit() {
    this.processService.getProcessTypes()
      .subscribe(processTypes => this.types = processTypes);
  }

  selectProcess(processContract: Process): void {
    this.getProcess(processContract.id).subscribe(p => {
      var process = new Process(p);
      this.process = process;
    });
  }

  getProcess(processId: number): Observable<Process> {
    var index = this.processCache.findIndex(function(p) { return p.id == processId; });
    if(index == -1) {
      return this.processService.getProcessById(processId);
    }
    else {
      return of(this.processCache[index]);
    }
  }

  selectModel(model: Model): void {
    this.process.model = model;
  }

  newModel(): void {
    var model = new Model();
    model.name = "Sample Model";
    this.process.model = model;
    this.process.models.push(model);
  }

  saveModel(model: Model, processId: number): void {
    model.Script = model.Script;
    this.processService.saveModel(model, processId);
  }

}
