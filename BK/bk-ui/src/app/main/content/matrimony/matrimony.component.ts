import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { ConfirmationService } from '@jaspero/ng-confirmations';
import { ResolveEmit } from '@jaspero/ng-confirmations';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-matrimony',
  templateUrl: './matrimony.component.html',
  styleUrls: ['./matrimony.component.scss']
})
export class MatrimonyComponent implements OnInit, OnDestroy {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  memberId: number;  
  addMode: boolean;
  model: MatrimonyModel;
  matrimonyForm: FormGroup;
  readonly NUKHS_LOOKUP_DATA_LOCAL = NUKHS_LOOKUP_DATA;
  readonly MARITAL_STATUS_DATA_LOCAL = MARITAL_STATUS_DATA;
  readonly HEIGHT_DATA_LOCAL = HEIGHT_DATA;
  readonly BODYTYPE_DATA_LOCAL = BODY_TYPE_DATA;
  readonly COMPLEXION_DATA_LOCAL = COMPLEXION_TYPE_DATA;  

  constructor(private route: ActivatedRoute, private router: Router, private dataService: bkDataService,
    private alertService: NotificationsService, public authService: bkAuthService, 
    private _confirmation: ConfirmationService, private location: Location) {

    this.route.params.subscribe(params => {
      if (params.memberId > 0)
        this.memberId = params.memberId;
      else
        this.memberId = null;      

      this.addMode = params.action === 'add'
      
      this.initializeComponent();
    });
  }

  ngOnInit() {
    this.matrimonyForm = new FormGroup({
      maternalNukhId: new FormControl('', [Validators.required]),
      birthTime: new FormControl('', [Validators.required]),
      maritalStatusId: new FormControl('', [Validators.required]),
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
      language: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      profileText: new FormControl('', [Validators.required, Validators.maxLength(250)])
    })
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  initializeComponent() {
    console.log(this.MARITAL_STATUS_DATA_LOCAL);
    this.model = new MatrimonyModel();

    if (!this.addMode)
      this.loadMatrimony();   
    else
      this.model.memberId = this.memberId; 
  }

  loadMatrimony() {
    return this.dataService.getMatrimony(this.memberId).takeUntil(this.destroyed$).subscribe(
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

  save() {
    if (this.matrimonyForm.invalid)
    {      
      var el = <HTMLElement> document.querySelector("input.ng-invalid");
      if (el)      
        el.focus();      
      return;
    }

    this.dataService.saveMatrimony(this.model).takeUntil(this.destroyed$).subscribe(
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

  cancelEdit() {
    this.location.back();
  }
}
