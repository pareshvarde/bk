import { Component, OnInit } from '@angular/core';
import { FamilyModel } from '../../models/familyModel';
import { bkDataService } from '../../services/bk-data.service';
import { NotificationsService } from 'angular2-notifications';
import { NukhData } from '../../data/nukhs';
import { CategoryData } from '../../data/categories';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { FamilyLookupModel } from '../../models/familyLookupModel';
import { debuglog } from 'util';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss'],
  providers: [bkDataService, NukhData, CategoryData]
})
export class FamilyComponent implements OnInit {

  model: FamilyModel;
  familyForm: FormGroup;
  currentFamilyId: number;
  familyLookup: FamilyLookupModel[];

  constructor(private router: Router, private dataService: bkDataService,
    private alertService: NotificationsService, public nukhs: NukhData, public categories: CategoryData) {
    this.model = new FamilyModel();
  }

  displayedColumns = ['name'];

  ngOnInit() {
    this.familyForm = new FormGroup({
      categoryId: new FormControl('', [Validators.required]),
      nukhId: new FormControl('', [Validators.required]),
      address1: new FormControl('', null),
      address2: new FormControl('', null),
      city: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
    });

    this.loadFamilyLookup();
  }

  loadFamilyLookup() {
    this.dataService.loadFamilyLookup().subscribe(
      (res) => {      
        this.familyLookup = res.result;
        debugger;
        if (this.familyLookup && this.familyLookup.length > 0)
          this.currentFamilyId = this.familyLookup[0].familyId;
      },
      (err) => {        
        if (err.errors)
          this.alertService.error(err.errors[0]);
        else
          this.alertService.error(err);
      }
    );
  }
}
