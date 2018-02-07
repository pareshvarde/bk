import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { TEMPLES_DATA } from '../../data/temples';

@Component({
  selector: 'app-temple',
  templateUrl: './temple.component.html',
  styleUrls: ['./temple.component.scss']
})
export class TempleComponent implements OnInit {

  constructor() { }

  dataSource = new MatTableDataSource<any>(TEMPLES_DATA);

  ngOnInit() {
  }
}
