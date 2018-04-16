import { Component, OnInit, Input } from '@angular/core';
import { Model } from '../classes/model';
import { Distribution } from '../classes/distribution';

@Component({
  selector: 'app-parameter-detail',
  templateUrl: './parameter-detail.component.html',
  styleUrls: ['./parameter-detail.component.css']
})
export class ParameterDetailComponent implements OnInit {
  @Input() model: Model;
  constructor() { }

  ngOnInit() {
  }

  calculateFirst(distribution: Distribution): void {
    distribution.calculateFirst();
  }
}
