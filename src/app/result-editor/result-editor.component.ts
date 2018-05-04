import { Component, OnInit, Input } from '@angular/core';
import { Model } from '../classes/model';
import { Parameter } from '../classes/parameter';

@Component({
  selector: 'app-result-editor',
  templateUrl: './result-editor.component.html',
  styleUrls: ['./result-editor.component.css']
})
export class ResultEditorComponent implements OnInit {
  @Input() model: Model;

  constructor() { }

  ngOnInit() {
  }

  addResult(): void {
    var result = new Parameter();
    this.model.results.push(result);
  }

  deleteResult(result: Parameter): void {
    var index = this.model.results.indexOf(result);
    this.model.results.splice(index, 1);
  }

}
