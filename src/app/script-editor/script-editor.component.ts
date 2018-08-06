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

  validateScript(event): void {

  }
}
