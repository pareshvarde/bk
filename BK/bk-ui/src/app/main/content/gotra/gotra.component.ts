import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { GOTRAS_DATA } from '../../data/gotras';

@Component({
  selector: 'app-gotra',
  templateUrl: './gotra.component.html',
  styleUrls: ['./gotra.component.scss']
})
export class GotraComponent implements OnInit {

  constructor() { }

  displayedColumns = ['gotraName', 'nukh1', 'nukh2', 'nukh3', 'nukh4', 'nukh5', 'nukh6', 'nukh7'];

  dataSource = new MatTableDataSource<any>(GOTRAS_DATA);

  ngOnInit() {
  }

}