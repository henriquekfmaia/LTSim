import { Component, OnInit, Input } from '@angular/core';

import { ActionBarStateEnum } from './action-bar-state';
import { Scope } from '../classes/scope';
import { Process } from '../classes/process';
import { ProcessType } from '../classes/process-type';
import { PROCESS_TYPES } from '../mock/process-type-mock';
import { ProcessService } from '../services/process.service';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css']
})
export class ActionBarComponent implements OnInit {
  @Input() scope: Scope;

  state: ActionBarStateEnum;
  types: ProcessType[];
  processes: Process[];

  constructor(private processService: ProcessService) { }

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
    var process = new Process(processContract);
    this.scope.stageHandler.newProcess(process);
  }

  deleteElement(): void {
    this.scope.stageHandler.deleteElement();
  }

  beginSimulation(): void {
    console.log(this.scope.stageHandler.stage);
  }
}
