import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { HOSTELS_DATA } from '../../data/hostels';

@Component({
  selector: 'app-hostel',
  templateUrl: './hostel.component.html',
  styleUrls: ['./hostel.component.scss']
})
export class HostelComponent implements OnInit {

  constructor() { }

  dataSource = new MatTableDataSource<any>(HOSTELS_DATA);

  ngOnInit() {
  }
}
