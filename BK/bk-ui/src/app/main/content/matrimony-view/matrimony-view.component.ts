import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { bkAuthService } from '../../services/auth-service';
import { bkDataService } from '../../services/bk-data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { OCCUPATIONS_DATA } from '../../data/occupations';
import { NUKHS_LOOKUP_DATA } from '../../data/nukhsLookup';
import { MATRIMONY_MARITAL_STATUS_DATA } from '../../data/maritalstatuses';
import { HEIGHT_DATA } from '../../data/height';
import { BODY_TYPE_DATA } from '../../data/bodyType';
import { COMPLEXION_TYPE_DATA } from '../../data/complexionType';
import { ReplaySubject } from 'rxjs';
import { BkImageViewerComponent } from '../../../core/components/bk-image-viewer/bk-image-viewer.component';
import { MatDialog } from '@angular/material';
import { ConfirmationService } from '@jaspero/ng-confirmations';
import { GlobalService } from '../../services/global-service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-matrimony-view',
  templateUrl: './matrimony-view.component.html',
  styleUrls: ['./matrimony-view.component.scss']
})
export class MatrimonyViewComponent implements OnInit, OnDestroy {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  memberId: number;
  model: any;
  matrimonyViewForm: FormGroup
  readonly OCCUPATION_DATA_LOCAL = OCCUPATIONS_DATA;
  readonly NUKHS_LOOKUP_DATA_LOCAL = NUKHS_LOOKUP_DATA;
  readonly MARITAL_STATUS_DATA_LOCAL = MATRIMONY_MARITAL_STATUS_DATA;
  readonly HEIGHT_DATA_LOCAL = HEIGHT_DATA;
  readonly BODYTYPE_DATA_LOCAL = BODY_TYPE_DATA;
  readonly COMPLEXION_DATA_LOCAL = COMPLEXION_TYPE_DATA;

  constructor(private route: ActivatedRoute, private router: Router, private dataService: bkDataService,
    private confirmationService: ConfirmationService, public authService: bkAuthService,
    private location: Location, public dialog: MatDialog, private globalService: GlobalService) {
    this.route.params.pipe(takeUntil(this.destroyed$)).subscribe(params => {

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

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  loadMatrimony() {
    return this.dataService.getViewOnlyMatrimony(this.memberId).pipe(takeUntil(this.destroyed$)).subscribe(
      (res) => {
        this.model = res.result;
      },
      (err) => {
        if (err.errors)
          this.confirmationService.create("Error", err.errors[0], this.globalService.alertOptions);
        else
          this.confirmationService.create("Error", err, this.globalService.alertOptions);
      }
    );
  }

  firstPhoto(){
    if (this.model.memberModel.photoUrl && this.model.memberModel.photoUrl.indexOf('male') === -1)
      return this.model.memberModel.photoUrl;
    else if (this.model.matrimonyModel.photo1Url && this.model.matrimonyModel.photo1Url.indexOf('male') === -1)
      return this.model.matrimonyModel.photo1Url;
    else if (this.model.matrimonyModel.photo2Url && this.model.matrimonyModel.photo2Url.indexOf('male') === -1)
      return this.model.matrimonyModel.photo2Url;
    else if (this.model.matrimonyModel.photo3Url && this.model.matrimonyModel.photo3Url.indexOf('male') === -1)
      return this.model.matrimonyModel.photo3Url;
    else
      return this.model.memberModel.photoUrl;
  }

  showPhoto() {
    
    var pictures: any[] = new Array();    

    if (this.model.memberModel.photoUrl && this.model.memberModel.photoUrl.indexOf('male') === -1)
      pictures.push(this.model.memberModel.photoUrl);

    if (this.model.matrimonyModel.photo1Url && this.model.matrimonyModel.photo1Url.indexOf('male') === -1)
      pictures.push(this.model.matrimonyModel.photo1Url);

    if (this.model.matrimonyModel.photo2Url && this.model.matrimonyModel.photo2Url.indexOf('male') === -1)
      pictures.push(this.model.matrimonyModel.photo2Url);

    if (this.model.matrimonyModel.photo3Url && this.model.matrimonyModel.photo3Url.indexOf('male') === -1)
      pictures.push(this.model.matrimonyModel.photo3Url);

    if (pictures.length == 0)
      pictures.push(this.model.memberModel.photoUrl);

    let dialogRef = this.dialog.open(BkImageViewerComponent, {
      data: { images: pictures }
    });
  }

  back() {
    if (window.history.length > 1)
      this.location.back();
    else
      this.router.navigate(['home']);
  }
}
