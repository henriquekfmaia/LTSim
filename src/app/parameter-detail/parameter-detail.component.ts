import { Component, OnInit, Input } from '@angular/core';
import { Parameter } from '../classes/parameter';

@Component({
  selector: 'app-parameter-detail',
  templateUrl: './parameter-detail.component.html',
  styleUrls: ['./parameter-detail.component.css']
})
export class ParameterDetailComponent implements OnInit {
  @Input() parameter: Parameter;
  constructor() { }

  ngOnInit() {
  }

}
