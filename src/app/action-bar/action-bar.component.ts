import { Component, OnInit, Input } from '@angular/core';

import { ActionBarStateEnum } from './action-bar-state';
import { Scope } from '../classes/scope';
import { Process } from '../classes/process';
import { ProcessType } from '../classes/process-type';
import { PROCESS_TYPES } from '../mock/process-type-mock';

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

  constructor() { }

  ngOnInit() {
    this.state = ActionBarStateEnum.IDLE;
    this.types = PROCESS_TYPES;
    console.log(this.types);
  }

  newElementBtn(): void {
    this.state = ActionBarStateEnum.TYPE;
  }

  typeBtn(type: ProcessType): void {
    this.processes = type.processes;
    this.state = ActionBarStateEnum.PROCESS;
  }

  addProcessBtn(process: Process): void {
    this.state = ActionBarStateEnum.IDLE;
    this.scope.stageHandler.newProcess(process);
  }

  deleteElement(): void {
    this.scope.stageHandler.deleteElement();
  }
}
