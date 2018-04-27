import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ActionBarStateEnum } from './action-bar-state';
import { Scope } from '../classes/scope';
import { Process } from '../classes/process';
import { ProcessType } from '../classes/process-type';
import { PROCESS_TYPES } from '../mock/process-type-mock';
import { ProcessService } from '../services/process.service';
import { SimulatorService } from '../services/simulator.service';
import { Model } from '../classes/model';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css']
})
export class ActionBarComponent implements OnInit {
  @Input() scope: Scope;

  state: ActionBarStateEnum;
  types: ProcessType[];
  processes: Array<Process>;
  processCache: Array<Process>;

  constructor(private processService: ProcessService, private simulatorService: SimulatorService) {
    this.processCache = new Array<Process>();
  }

  ngOnInit() {
    this.state = ActionBarStateEnum.IDLE;
    this.processService.getProcessTypes()
      .subscribe(processTypes => this.types = processTypes);
  }

  newElementBtn(): void {
    this.state = ActionBarStateEnum.TYPE;
  }

  typeBtn(type: ProcessType): void {
    this.processes = type.processes;
    this.state = ActionBarStateEnum.PROCESS;
  }

  addProcessBtn(processContract: Process): void {
    this.state = ActionBarStateEnum.IDLE;
    this.getProcess(processContract.id).subscribe(p => {
      var process = new Process(p);
      // if(process.models.length == 0) { process.models.push(new Model()); }
      this.scope.stageHandler.newProcess(process);
    });
  }

  deleteElement(): void {
    this.scope.stageHandler.deleteElement();
  }

  beginSimulation(): void {
    this.simulatorService.simulate(this.scope.stageHandler.stage.processes(), 
                                   this.scope.stageHandler.stage.relationships)
                         .subscribe(result => this.scope.stageHandler.stage.updateProcesses(result.processes));
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
}
