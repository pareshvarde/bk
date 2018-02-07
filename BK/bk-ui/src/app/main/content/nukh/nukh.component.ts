import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { NUKHS_DATA } from '../../data/nukhs';

@Component({
  selector: 'app-nukh',
  templateUrl: './nukh.component.html',
  styleUrls: ['./nukh.component.scss']
})

export class NukhComponent implements OnInit {

  constructor() { }

  displayedColumns = ['mainNukh', 'subNukh1', 'subNukh2', 'subNukh3', 'subNukh4',
  'subNukh5', 'subNukh6', 'subNukh7', 'subNukh8',
  'subNukh9', 'subNukh10', 'subNukh11', 'subNukh12'];

  dataSource = new MatTableDataSource<any>(NUKHS_DATA);
  
  ngOnInit() {
  }
}