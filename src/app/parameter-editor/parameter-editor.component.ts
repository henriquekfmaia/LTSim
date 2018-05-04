import { Component, OnInit, Input } from '@angular/core';
import { Model } from '../classes/model';
import { Parameter } from '../classes/parameter';

@Component({
  selector: 'app-parameter-editor',
  templateUrl: './parameter-editor.component.html',
  styleUrls: ['./parameter-editor.component.css']
})
export class ParameterEditorComponent implements OnInit {

  @Input() model: Model;
  constructor() { }

  ngOnInit() {
  }

  addParameter(): void {
    var parameter = new Parameter();
    this.model.parameters.push(parameter);
  }

  deleteParameter(parameter: Parameter): void {
    var index = this.model.parameters.indexOf(parameter);
    this.model.parameters.splice(index, 1);
  }

}
