import { Component, OnInit } from '@angular/core';
import { FamilyModel } from '../../models/familyModel';
import { bkDataService } from '../../services/bk-data.service';
import { NotificationsService } from 'angular2-notifications';
import { NukhData } from '../../data/nukhs';
import { CategoryData } from '../../data/categories';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss'],
  providers: [bkDataService, NukhData, CategoryData]
})
export class FamilyComponent implements OnInit {

  dataSource: FamilyModel[];
  model: FamilyModel;
  familyForm: FormGroup;
  
  constructor(private router: Router, private dataService: bkDataService, 
    private alertService: NotificationsService, public nukhs: NukhData, public categories:CategoryData) { 
      this.model = new FamilyModel();
    }

    displayedColumns = ['Name', 'Gender', 'Date Of Birth', 'Relatin', 'Head Of Family'];

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
  }
}
