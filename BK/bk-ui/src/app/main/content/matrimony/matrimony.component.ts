import { Component, OnInit, OnDestroy, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { MatrimonyModel } from '../../models/matrimonyModel';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationsService } from 'angular2-notifications';
import { bkAuthService } from '../../services/auth-service';
import { bkDataService } from '../../services/bk-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UniversalValidators } from 'ng2-validators';
import { NUKHS_LOOKUP_DATA } from '../../data/nukhsLookup';
import { MATRIMONY_MARITAL_STATUS_DATA } from '../../data/maritalstatuses';
import { HEIGHT_DATA } from '../../data/height'
import { BODY_TYPE_DATA } from '../../data/bodyType';
import { COMPLEXION_TYPE_DATA } from '../../data/complexionType';
import { ConfirmationService, ResolveEmit } from '@jaspero/ng-confirmations';
import { ReplaySubject } from 'rxjs';
import { GlobalService } from '../../services/global-service';
import { BkImageCropperComponent } from '../../../core/components/bk-image-cropper/bk-image-cropper.component';
import { MatDialog } from '@angular/material';
import { ResizeOptions, ImageResult } from '../../../../../node_modules/ng2-imageupload';
import { MemberModel } from '../../models/memberModel';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-matrimony',
  templateUrl: './matrimony.component.html',
  styleUrls: ['./matrimony.component.scss']
})
export class MatrimonyComponent implements OnInit, AfterViewChecked, OnDestroy {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  memberId: number;  
  addMode: boolean;
  model: MatrimonyModel;
  memberModel: MemberModel;
  matrimonyForm: FormGroup;
  photoNumber: number;
  readonly NUKHS_LOOKUP_DATA_LOCAL = NUKHS_LOOKUP_DATA;
  readonly MARITAL_STATUS_DATA_LOCAL = MATRIMONY_MARITAL_STATUS_DATA;
  readonly HEIGHT_DATA_LOCAL = HEIGHT_DATA;
  readonly BODYTYPE_DATA_LOCAL = BODY_TYPE_DATA;
  readonly COMPLEXION_DATA_LOCAL = COMPLEXION_TYPE_DATA;

  resizeOptions: ResizeOptions = {
    resizeMaxHeight: 500,
    resizeMaxWidth: 700
  };

  constructor(private route: ActivatedRoute, private router: Router, private dataService: bkDataService,
    private notificationService: NotificationsService, public authService: bkAuthService,
    private confirmationService: ConfirmationService, private location: Location,
    private globalService: GlobalService, private cdr: ChangeDetectorRef) {

    this.route.params.pipe(takeUntil(this.destroyed$)).subscribe(params => {
      if (params.memberId > 0)
        this.memberId = params.memberId;
      else
        this.memberId = null;      

      this.addMode = params.action === 'add'
      this.memberModel = new MemberModel();

      this.initializeComponent();
    });
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
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

    this.model = new MatrimonyModel();

    if (!this.addMode)
      this.loadMatrimony();
    else
      this.model.memberId = this.memberId;
    
    this.loadMember();
  }


  loadMember() {
    return this.dataService.getMemberLookup(this.memberId).pipe(takeUntil(this.destroyed$)).subscribe(
      (res) => {
        this.memberModel = res.result;

        if (this.addMode){
          if (this.memberModel.gender)
            this.model.photo1Url = this.model.photo2Url = this.model.photo3Url = 'images/profiles/male.png';        
          else
            this.model.photo1Url = this.model.photo2Url = this.model.photo3Url = 'images/profiles/female.png';        
        }
      },
      (err) => {
        if (err.errors)
          this.confirmationService.create("Error", err.errors[0], this.globalService.alertOptions);
        else
          this.confirmationService.create("Error", err, this.globalService.alertOptions);
      }
    );
  }

  loadMatrimony() {
    return this.dataService.getMatrimony(this.memberId).pipe(takeUntil(this.destroyed$)).subscribe(
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

  save() {
    if (this.matrimonyForm.invalid) {
      var el = <HTMLElement>document.querySelector("input.ng-invalid");
      if (el)
        el.focus();
      return;
    }

    this.dataService.saveMatrimony(this.model).pipe(takeUntil(this.destroyed$)).subscribe(
      (res) => {
        this.notificationService.success("Matrimony profile has been updated.");
        this.matrimonyForm.markAsPristine();
        this.cancelEdit();
      },
      (err) => {
        if (err.errors)
          this.confirmationService.create("Error", err.errors[0], this.globalService.alertOptions);
        else
          this.confirmationService.create("Error", err, this.globalService.alertOptions);
      }
    );
  }

  openFile(fileNumber: number) {
    this.photoNumber = fileNumber;
    document.getElementById('fileBrowser').click();
  }

  imageSelected(imageResult: ImageResult) {

    if (!imageResult.file.type.startsWith("image/")) {
      this.confirmationService.create("Error", "Only file of type image is supported", this.globalService.alertOptions);
      return;
    }

    var src = imageResult.resized && imageResult.resized.dataURL || imageResult.dataURL;

    this.savePhoto(src);
  }

  savePhoto(content: string) {
    this.dataService.uploadMatrimonyPhoto({ memberId: this.memberId, image: content, photoNumber: this.photoNumber }).pipe(takeUntil(this.destroyed$)).subscribe(
      (res) => {
        this.notificationService.success("Your photo has been uploaded.");

        if (this.photoNumber === 1) {
          document.getElementById('img1').setAttribute('src', content);
          this.model.photo1Url = content;
        }
        else if (this.photoNumber === 2) {
          document.getElementById('img2').setAttribute('src', content);
          this.model.photo2Url = content;
        }
        else if (this.photoNumber === 3) {
          document.getElementById('img3').setAttribute('src', content);
          this.model.photo3Url = content;
        }
      },
      (err) => {
        if (err.errors)
          this.confirmationService.create("Error", err.errors[0], this.globalService.alertOptions);
        else
          this.confirmationService.create("Error", err, this.globalService.alertOptions);
      }
    );
  }

  deletePhoto(photoNumber: number) {
    this.confirmationService.create('', 'Are you sure you want to delete this photo?').subscribe(
      (ans: ResolveEmit) => {
        if (!ans.resolved)
          return;

        this.dataService.deleteMarimonyPhoto(this.memberId, photoNumber).pipe(takeUntil(this.destroyed$)).subscribe(
          (res) => {
            this.notificationService.success("Photo has been deleted");
            if (photoNumber === 1) {
              document.getElementById('img1').setAttribute('src', res.result);
              this.model.photo1Url = res.result;
            }
            else if (photoNumber === 2) {
              document.getElementById('img2').setAttribute('src', res.result);
              this.model.photo2Url = res.result;
            }
            else if (photoNumber === 3) {
              document.getElementById('img3').setAttribute('src', res.result);
              this.model.photo3Url = res.result;
            }
          },
          (err) => {
            if (err.errors)
              this.confirmationService.create("Error", err.errors[0], this.globalService.alertOptions);
            else
              this.confirmationService.create("Error", err, this.globalService.alertOptions);
          }
        );
      }
    );
  }

  cancelEdit() {
    if (window.history.length > 1)
      this.location.back();
    else
      this.router.navigate(['home']);
  }
}
