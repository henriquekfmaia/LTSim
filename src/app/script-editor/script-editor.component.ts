import { Component, OnInit, Input } from '@angular/core';
import { Model } from '../classes/model';

@Component({
  selector: 'app-script-editor',
  templateUrl: './script-editor.component.html',
  styleUrls: ['./script-editor.component.css']
})
export class ScriptEditorComponent implements OnInit {
  @Input() model: Model;
  constructor() { }

  ngOnInit() {
    
  }

  validateScript(script: string): void {
    console.log(this.model.scriptHead);
    console.log(this.model.scriptBody);
    console.log(this.model.scriptTail);
    console.log(this.model);
  }

}
