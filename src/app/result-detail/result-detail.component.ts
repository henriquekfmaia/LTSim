import { Component, OnInit, Input } from '@angular/core';
import { Model } from '../classes/model';

@Component({
  selector: 'app-result-detail',
  templateUrl: './result-detail.component.html',
  styleUrls: ['./result-detail.component.css']
})
export class ResultDetailComponent implements OnInit {
  @Input() model: Model;
  constructor() { }

  ngOnInit() {
    console.log(this.model);
  }

}
