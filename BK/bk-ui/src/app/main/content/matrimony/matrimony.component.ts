import { Component, OnInit } from '@angular/core';
import { MatrimonyModel } from '../../models/matrimonyModel';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationsService } from 'angular2-notifications';
import { bkAuthService } from '../../services/auth-service';
import { bkDataService } from '../../services/bk-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UniversalValidators } from 'ng2-validators';
import { NUKHS_LOOKUP_DATA } from '../../data/nukhsLookup';
import { MARITAL_STATUS_DATA } from '../../data/maritalstatuses';
import { HEIGHT_DATA } from '../../data/height'
import { BODY_TYPE_DATA } from '../../data/bodyType';
import { COMPLEXION_TYPE_DATA } from '../../data/complexionType';

@Component({
  selector: 'app-matrimony',
  templateUrl: './matrimony.component.html',
  styleUrls: ['./matrimony.component.scss']
})
export class MatrimonyComponent implements OnInit {

  memberId: number;
  matrimonyId: number;
  model: MatrimonyModel;
  matrimonyForm: FormGroup;
  readonly NUKHS_LOOKUP_DATA_LOCAL = NUKHS_LOOKUP_DATA;
  readonly MARITAL_STATUS_DATA_LOCAL = MARITAL_STATUS_DATA;
  readonly HEIGHT_DATA_LOCAL = HEIGHT_DATA;
  readonly BODYTYPE_DATA_LOCAL = BODY_TYPE_DATA;
  readonly COMPLEXION_DATA_LOCAL = COMPLEXION_TYPE_DATA;
  editMode: boolean;
  addMode: boolean;
  
  constructor(private route: ActivatedRoute, private router: Router, private dataService: bkDataService,
    private alertService: NotificationsService, public authService: bkAuthService, private location: Location) {
    
      this.route.params.subscribe(params => {
        if (params.memberId > 0)
          this.memberId = params.memberId;
        else
          this.memberId = null;
        
        if (params.matrimonyId > 0)
          this.matrimonyId = params.matrimonyId;
        else
          this.matrimonyId = null;    
          
        this.initializeComponent();
      });    
  }

  ngOnInit() {
    this.matrimonyForm = new FormGroup({
      maternalNukhId: new FormControl('', [Validators.required]),
      birthTime: new FormControl('', [Validators.required]),
      maritalStatusId: new FormControl('',[Validators.required]),
      height: new FormControl('', [Validators.required]),
      weight: new FormControl('', [Validators.required, UniversalValidators.isNumber]),
      bodyTypeId: new FormControl('', [Validators.required]),
      complexionTypeId: new FormControl('', [Validators.required]),
      manglik: new FormControl('', [Validators.required]),
      smoke: new FormControl('', [Validators.required]),
      alcohol: new FormControl('', [Validators.required]),      
      tobacco: new FormControl('', [Validators.required]),
      disability: new FormControl('', [Validators.required]),
      vegetarian: new FormControl('', [Validators.required]),      
      ownHome: new FormControl('', [Validators.required]),      
      monthlyIncome: new FormControl('', [Validators.required, UniversalValidators.isNumber]),
      language: new FormControl('', [Validators.required]),
      profileText: new FormControl('', [Validators.required])      
    })
  }

  initializeComponent(){
    console.log(this.MARITAL_STATUS_DATA_LOCAL);
    this.model = new MatrimonyModel();

    if (this.matrimonyId > 0)
      this.loadMatrimony();

    if (!this.matrimonyId){
      this.addMode = true;
      this.model.memberId = this.memberId;
    }
  }

  loadMatrimony(){
    return this.dataService.getMatrimony(this.memberId).subscribe(
      (res) => {
        this.model = res.result;        
      },
      (err) => {
        if (err.errors)
          this.alertService.error('', err.errors[0]);
        else
          this.alertService.error('', err);
      }
    );
  }

  save(){
    this.dataService.saveMatrimony(this.model).subscribe(
      (res) => {
        this.alertService.success("Matrimony profile has been updated.");
        this.matrimonyForm.markAsPristine();
        this.cancelEdit();
      },
      (err) => {
        if (err.errors)
          this.alertService.error('', err.errors[0]);
        else
          this.alertService.error('', err);
      }
    );
  }

  edit(){
    this.editMode = true;
  }

  cancelEdit(){
    this.editMode = false;    

    if (this.addMode)
      this.back();
  }

  back(){
    this.location.back();
  }
}
