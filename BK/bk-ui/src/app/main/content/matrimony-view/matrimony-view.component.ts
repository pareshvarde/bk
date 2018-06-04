import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { bkAuthService } from '../../services/auth-service';
import { bkDataService } from '../../services/bk-data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { OCCUPATIONS_DATA } from '../../data/occupations';
import { NUKHS_LOOKUP_DATA } from '../../data/nukhsLookup';
import { MARITAL_STATUS_DATA } from '../../data/maritalstatuses';
import { HEIGHT_DATA } from '../../data/height';
import { BODY_TYPE_DATA } from '../../data/bodyType';
import { COMPLEXION_TYPE_DATA } from '../../data/complexionType';

@Component({
  selector: 'app-matrimony-view',
  templateUrl: './matrimony-view.component.html',
  styleUrls: ['./matrimony-view.component.scss']
})
export class MatrimonyViewComponent implements OnInit {

  memberId: number;
  model: any;
  matrimonyViewForm: FormGroup
  readonly OCCUPATION_DATA_LOCAL = OCCUPATIONS_DATA;
  readonly NUKHS_LOOKUP_DATA_LOCAL = NUKHS_LOOKUP_DATA;
  readonly MARITAL_STATUS_DATA_LOCAL = MARITAL_STATUS_DATA;
  readonly HEIGHT_DATA_LOCAL = HEIGHT_DATA;
  readonly BODYTYPE_DATA_LOCAL = BODY_TYPE_DATA;
  readonly COMPLEXION_DATA_LOCAL = COMPLEXION_TYPE_DATA;  
  
  constructor(private route: ActivatedRoute, private router: Router, private dataService: bkDataService,
    private alertService: NotificationsService, public authService: bkAuthService) {
      this.route.params.subscribe(params => {
        
        if (params.memberId > 0)
          this.memberId = params.memberId;
        else
          this.memberId = null;          
                
        if (this.memberId > 0)
          this.loadMatrimony();
      });    
  }

  ngOnInit() {
    this.matrimonyViewForm = new FormGroup({
      firstName: new FormControl('', null),
      lastName: new FormControl('', null),
      nickName: new FormControl('', null),
      email: new FormControl('', null),
      phoneNumber: new FormControl('', null),
      aadhaarNumber: new FormControl('', null),
      gender: new FormControl('', null),
      alive: new FormControl('', null),
      dob: new FormControl('', null),      
      birthPlace: new FormControl('', null),            
      educationLevel: new FormControl('', null),
      educationField: new FormControl('', null),
      occupationId: new FormControl('', null),
      companyName: new FormControl('', null),      
      jobTitle: new FormControl('', null),
      facebookHandle: new FormControl('', null),
      instagramHandle: new FormControl('', null),
      twitterHandle: new FormControl('', null),
      relationTypeId: new FormControl('', null),
      relatedMemberId: new FormControl('', null),
      maternalNukhId: new FormControl('', null),
      birthTime: new FormControl('', null),
      maritalStatusId: new FormControl('', null),
      height: new FormControl('', null),
      weight: new FormControl('', null),
      bodyTypeId: new FormControl('', null),
      complexionTypeId: new FormControl('', null),
      manglik: new FormControl('', null),
      smoke: new FormControl('', null),
      alcohol: new FormControl('', null),
      tobacco: new FormControl('', null),
      disability: new FormControl('', null),
      vegetarian: new FormControl('', null),
      ownHome: new FormControl('', null),
      monthlyIncome: new FormControl('', null),
      language: new FormControl('', null),
      profileText: new FormControl('', null)
    });

    this.matrimonyViewForm.disable();
  }

  loadMatrimony(){
    return this.dataService.getViewOnlyMatrimony(this.memberId).subscribe(
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
}
