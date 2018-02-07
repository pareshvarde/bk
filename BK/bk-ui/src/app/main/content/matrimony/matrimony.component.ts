import { Component, OnInit } from '@angular/core';
import { MatrimonyModel } from '../../models/matrimonyModel';

@Component({
  selector: 'app-matrimony',
  templateUrl: './matrimony.component.html',
  styleUrls: ['./matrimony.component.scss']
})
export class MatrimonyComponent implements OnInit {

  memberId: number;
  matrimonyId: number;
  model: MatrimonyModel;

  constructor() { }

  ngOnInit() {
  }

}
