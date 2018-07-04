import { Component, OnInit, OnDestroy, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { FamilyModel } from '../../models/familyModel';
import { Router, ActivatedRoute } from '@angular/router';
import { bkDataService } from '../../services/bk-data.service';
import { NotificationsService } from 'angular2-notifications';
import { MemberModel } from '../../models/memberModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UniversalValidators, EmailValidators } from 'ng2-validators';
import { Location } from '@angular/common';
import { bkAuthService } from '../../services/auth-service';
import { MemberSearchBasicModel } from '../../models/memberSearchBasicModel';
import { RELATION_TYPES_DATA } from '../../data/relations';
import { OCCUPATIONS_DATA } from '../../data/occupations';
import { ConfirmationService, ResolveEmit } from '@jaspero/ng-confirmations';
import { ReplaySubject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { BkImageCropperComponent } from '../../../core/components/bk-image-cropper/bk-image-cropper.component';
import { BkImageViewerComponent } from '../../../core/components/bk-image-viewer/bk-image-viewer.component';
import { GlobalService } from '../../services/global-service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})

export class MemberComponent implements OnInit, AfterViewChecked, OnDestroy {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  familyModel: FamilyModel;
  memberModel: MemberModel;
  searchMemberModel: MemberModel;
  searchModel: MemberSearchBasicModel;
  familyId: number;
  memberId: number;
  familyLookup: any[];
  memberForm: FormGroup;
  searchForm: FormGroup;
  editMode: boolean;
  addMode: boolean;
  existingAdd: boolean;

  readonly OCCUPATION_DATA_LOCAL = OCCUPATIONS_DATA;

  constructor(private route: ActivatedRoute, private router: Router, private dataService: bkDataService,
    private alertService: NotificationsService, public authService: bkAuthService, private location: Location,
    private _confirmation: ConfirmationService, public globalService: GlobalService, public dialog: MatDialog, private cdr: ChangeDetectorRef) {

    this.route.params.takeUntil(this.destroyed$).subscribe(params => {
      if (params.familyId > 0)
        this.familyId = params.familyId;
      else
        this.familyId = null;

      if (params.memberId > 0)
        this.memberId = params.memberId;
      else
        this.memberId = null;

      this.existingAdd = null;

      this.initializeComponent();
    });
  }

  ngAfterViewChecked(){
    this.cdr.detectChanges();
  }
  
  ngOnInit() {
    this.memberForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      lastName: new FormControl('', [UniversalValidators.noWhitespace, Validators.required, , Validators.maxLength(50)]),
      nickName: new FormControl('', [UniversalValidators.noWhitespace, , Validators.maxLength(50)]),
      email: new FormControl('', [Validators.email, , Validators.maxLength(100)]),
      phoneNumber: new FormControl('', [UniversalValidators.noWhitespace, UniversalValidators.isNumber, , Validators.maxLength(15)]),
      aadhaarNumber: new FormControl('', [UniversalValidators.isNumber, , Validators.maxLength(16)]),
      gender: new FormControl('', [Validators.required]),
      alive: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      dod: new FormControl('', null),
      birthPlace: new FormControl('', [Validators.maxLength(50)]),
      deathPlace: new FormControl('', [Validators.maxLength(50)]),
      married: new FormControl('', [Validators.required]),
      anniversary: new FormControl('', null),
      educationLevel: new FormControl('', [Validators.maxLength(50)]),
      educationField: new FormControl('', [Validators.maxLength(50)]),
      occupationId: new FormControl('', null),
      companyName: new FormControl('', [Validators.maxLength(50)]),
      jobTitle: new FormControl('', [Validators.maxLength(50)]),
      facebookHandle: new FormControl('', [UniversalValidators.noWhitespace, Validators.maxLength(50)]),
      instagramHandle: new FormControl('', [UniversalValidators.noWhitespace, Validators.maxLength(50)]),
      twitterHandle: new FormControl('', [UniversalValidators.noWhitespace, Validators.maxLength(50)]),
      relationTypeId: new FormControl('', null),
      relatedMemberId: new FormControl('', null)
    });

    this.searchForm = new FormGroup({
      memberId: new FormControl('', [UniversalValidators.isNumber]),
      phoneNumber: new FormControl('', [UniversalValidators.isNumber, , Validators.maxLength(15)]),
      aadhaarNumber: new FormControl('', [UniversalValidators.isNumber, , Validators.maxLength(16)]),
      emailAddress: new FormControl('', [Validators.email, Validators.maxLength(100)])
    });

    if (!this.addMode)
      this.memberForm.disable();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  initializeComponent() {
    this.familyModel = new FamilyModel();
    this.searchModel = new MemberSearchBasicModel();
    this.memberModel = new MemberModel();
    
    this.memberModel.alive = true;
    this.memberModel.familyId = this.familyId;
    this.memberModel.canEdit = true;

    this.addMode = this.memberId == null;

    this.loadFamilyLookup();
  }

  loadFamilyLookup() {

    var mId = this.memberId;
    if (!mId)
      mId = this.authService.memberId();

    this.dataService.getFamilyLookup(mId).takeUntil(this.destroyed$).subscribe(
      (res) => {
        this.familyLookup = res.result;

        if (this.familyLookup && this.familyLookup.length > 0 && !this.familyId) {
          var defaultFamily = this.familyLookup.find(x => x.defaultFamily == true);

          if (defaultFamily)
            this.familyId = defaultFamily.familyId;
          else
            this.familyId = this.familyLookup[0].familyId;
        }
        else {
          this.familyId = this.familyId * 1; //TRICK TO BIND IT BACK TO UI
        }

        this.loadFamily();
      },
      (err) => {
        if (err.errors)
          this.alertService.error('', err.errors[0]);
        else
          this.alertService.error('', err);
      }
    );
  }

  loadMember() {
    return this.dataService.getMember(this.memberId, this.familyId).takeUntil(this.destroyed$).subscribe(
      (res) => {
        this.memberModel = res.result;
      },
      (err) => {
        if (err.errors)
          this.alertService.error('', err.errors[0]);
        else
          this.alertService.error('', err);
      }
    );
  }

  changeRoute() {
    //it was not updating model immediately
    setTimeout(() => {      
      this.router.navigate(['member', this.familyId, this.memberId]);
    }, 0);
  }


  loadFamily() {
    this.dataService.getFamilyDetail(this.familyId).takeUntil(this.destroyed$).subscribe(
      (res) => {
        this.familyModel = res.result;

        if (this.memberId > 0)
          this.loadMember();
      },
      (err) => {
        if (err.errors)
          this.alertService.error('', err.errors[0]);
        else
          this.alertService.error('', err);
      }
    );
  }

  getRelations(): any[] {
    if (this.memberModel.gender === true)
      return RELATION_TYPES_DATA.filter(x => x.male || x.relationTypeId == null);
    else if (this.memberModel.gender === false && !this.memberModel.married)
      return RELATION_TYPES_DATA.filter(x => (!x.male && !x.married) || x.relationTypeId == null);
    else if (this.memberModel.gender === false)
      return RELATION_TYPES_DATA.filter(x => !x.male || x.relationTypeId == null);
    else
      return RELATION_TYPES_DATA;
  }

  getRelatedMember(): any[]{
    return this.familyModel.members.filter(x => x.married && x.memberId != this.memberId);
  }

  saveMember() {
    if (this.memberForm.invalid) {
      var el = <HTMLElement>document.querySelector("input.ng-invalid");
      if (el)
        el.focus();
      return;
    }

    if (this.memberModel.dob && this.memberForm.controls['dob'].dirty)
      this.memberModel.dob.setMinutes(this.memberModel.dob.getMinutes() - this.memberModel.dob.getTimezoneOffset());

    if (this.memberModel.dod && this.memberForm.controls['dod'].dirty)
      this.memberModel.dod.setMinutes(this.memberModel.dod.getMinutes() - this.memberModel.dod.getTimezoneOffset());

    if (this.memberModel.anniversary && this.memberForm.controls['anniversary'].dirty)
      this.memberModel.anniversary.setMinutes(this.memberModel.anniversary.getMinutes() - this.memberModel.anniversary.getTimezoneOffset());

    if (this.memberModel.alive === true && this.memberModel.dod)
      this.memberModel.dod = null;

    if (!this.memberModel.married && this.memberModel.anniversary)
      this.memberModel.anniversary = null;

    this.memberModel.familyId = this.familyId;

    this.dataService.saveMember(this.memberModel).takeUntil(this.destroyed$).subscribe(
      (res) => {
        this.alertService.success("Member details has been updated.");
        this.memberForm.markAsPristine();
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

  searchMember() {
    if (this.searchForm.invalid) {
      var el = <HTMLElement>document.querySelector("input.ng-invalid");
      if (el)
        el.focus();
      return;
    }

    return this.dataService.basicSearchMember(this.searchModel).takeUntil(this.destroyed$).subscribe(
      (res) => {

        if (res.result == null) {
          this.alertService.error('', "No member found with provided search criteria. Please try again");
          this.searchMemberModel = null;
          return;
        }

        this.searchMemberModel = res.result;
        this.memberModel.gender = this.searchMemberModel.gender;
      },
      (err) => {
        if (err.errors)
          this.alertService.error('', err.errors[0]);
        else
          this.alertService.error('', err);
      }
    );
  }

  addToFamily() {
    if (!this.memberModel.relatedMemberId || !this.memberModel.relationTypeId) {
      this.alertService.error('', 'Please select relation type');
      return;
    }

    return this.dataService.addMemberToFamily(this.familyId, this.searchMemberModel.memberId, this.memberModel.relatedMemberId, this.memberModel.relationTypeId).takeUntil(this.destroyed$).subscribe(
      (res) => {
        this.alertService.success("Member is added to your family");
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

  markDefaultFamily() {
    this._confirmation.create('', 'Are you sure you want to mark current family as default family for this member?').subscribe(
      (ans: ResolveEmit) => {
        if (!ans.resolved)
          return;

        this.dataService.markDefaultFamily(this.familyId, this.memberId).takeUntil(this.destroyed$).subscribe(
          (res) => {
            this.memberModel.defaultFamily = true;
            this.alertService.success("Member marked as default to this family");
          },
          (err) => {
            if (err.errors)
              this.alertService.error('', err.errors[0]);
            else
              this.alertService.error('', err);
          }
        );
      }
    );
  }

  cancelEdit() {
    this.editMode = false;
    this.memberForm.disable();

    if (!this.memberModel.memberId)
      this.back();
    else
      this.loadFamily();
  }

  back() {
    
    if (window.history.length > 1)
      this.location.back();
    else
      this.router.navigate(['home']);
  }

  edit() {
    this.editMode = true;
    this.memberForm.enable();
  }

  fileChangeEvent(event: any): void {

    if (event.srcElement.files.length === 0)
      return;

    if (!event.srcElement.files[0].type.startsWith("image/"))
    {
      this.alertService.error("", "Only file of type image is supported");
      return;
    }

    let dialogRef = this.dialog.open(BkImageCropperComponent, {
      width: '350px',
      data: { imgEvent: event }
    });

    dialogRef.afterClosed().takeUntil(this.destroyed$).subscribe(result => {
      if (result) {
        this.savePhoto(result);
      }
    });
  }

  openFile() {
    if (this.memberModel.canEdit){
      document.getElementById('fileBrowser').click();
      return;
    }

    var pictures: any[] = new Array();
    pictures.push(this.memberModel.photoUrl);    

    let dialogRef = this.dialog.open(BkImageViewerComponent, {      
      data: { images:  pictures}
    });
  }

  savePhoto(content: string) {
    this.dataService.uploadProfilePhoto({ memberId: this.memberId, image: content }).takeUntil(this.destroyed$).subscribe(
      (res) => {
        this.memberModel.photoUrl = content;
        this.globalService.avatarUrl = content;
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
