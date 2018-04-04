import { Component, OnInit } from '@angular/core';

import { Scope } from '../classes/scope';
import { Process } from '../classes/process';
import { ProcessDetailComponent } from '../process-detail/process-detail.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-simulator-interface',
  templateUrl: './simulator-interface.component.html',
  styleUrls: ['./simulator-interface.component.css']
})
export class SimulatorInterfaceComponent implements OnInit {

  scope: Scope = new Scope();

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.scope.onShowDetail.subscribe(p => this.showProcessDetail(p.process));
  }

  showProcessDetail(process: Process) {
    const modalRef = this.modalService.open(ProcessDetailComponent, { size: 'lg', backdropClass: 'light-blue-backdrop' });
    modalRef.componentInstance.process = process;
  }

}
