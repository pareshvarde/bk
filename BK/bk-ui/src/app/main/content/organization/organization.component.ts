import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ORGANIZATIONS_DATE } from '../../data/organizations';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {

  constructor() { }

  dataSource = new MatTableDataSource<any>(ORGANIZATIONS_DATE);

  ngOnInit() {
  }

}