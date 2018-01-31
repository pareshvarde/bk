import { Component, OnInit } from '@angular/core';
import { FamilyModel } from '../../models/familyModel';
import { Router, ActivatedRoute } from '@angular/router';
import { bkDataService } from '../../services/bk-data.service';
import { NotificationsService } from 'angular2-notifications';
import { MemberModel } from '../../models/memberModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UniversalValidators, EmailValidators } from 'ng2-validators';
import { RelationTypeData, RelationTypeModel } from '../../data/relations';
import { Location } from '@angular/common';
import { FamilyLookupModel } from '../../models/familyLookupModel';
import { bkAuthService } from '../../services/auth-service';
import { MemberSearchBasicModel } from '../../models/memberSearchBasicModel';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
  providers: [bkDataService, RelationTypeData, bkAuthService]
})

export class MemberComponent implements OnInit {

  familyModel: FamilyModel;
  memberModel: MemberModel;
  searchMemberModel: MemberModel;
  searchModel: MemberSearchBasicModel;
  familyId: number;
  memberId: number;
  familyLookup: FamilyLookupModel[];
  memberForm: FormGroup;
  searchForm: FormGroup;
  editMode: boolean;
  addMode: boolean;
  existingAdd: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private dataService: bkDataService,
    private alertService: NotificationsService, public relationTypes: RelationTypeData, 
    public authService: bkAuthService, private location: Location) {

    this.route.params.subscribe(params => {
      if (params.familyId > 0)
        this.familyId = params.familyId;
    });

    this.route.params.subscribe(params => {
      if (params.memberId > 0)
        this.memberId = params.memberId;
    });

    this.memberModel = new MemberModel();
    this.memberModel.gender = 'M';
    this.memberModel.alive = 'A';
    this.memberModel.familyId = this.familyId;
    this.memberModel.canEdit = true;

    this.familyModel = new FamilyModel();      
    this.searchModel = new MemberSearchBasicModel();
  }

  ngOnInit() {
    this.memberForm = new FormGroup({
      firstName: new FormControl('', [UniversalValidators.noWhitespace, Validators.required]),
      lastName: new FormControl('', [UniversalValidators.noWhitespace, Validators.required]),
      nickName: new FormControl('', [UniversalValidators.noWhitespace]),
      email: new FormControl('', [EmailValidators.normal]),
      phoneNumber: new FormControl('', [UniversalValidators.noWhitespace, UniversalValidators.isNumber]),
      aadhaarNumber: new FormControl('', [UniversalValidators.isNumber]),
      gender: new FormControl('M', [Validators.required]),
      alive: new FormControl('A', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      dod: new FormControl('', null),
      birthPlace: new FormControl('', null),
      deathPlace: new FormControl('', null),
      married: new FormControl('', null),
      educationLevel: new FormControl('', null),
      educationField: new FormControl('', null),
      companyName: new FormControl('', null),
      jobTitle: new FormControl('', null),
      facebookHandle: new FormControl('', [UniversalValidators.noWhitespace]),
      instagramHandle: new FormControl('', [UniversalValidators.noWhitespace]),
      twitterHandle: new FormControl('', [UniversalValidators.noWhitespace]),
      relationTypeId: new FormControl('', null),
      relatedMemberId: new FormControl('', null)
    });

    this.searchForm = new FormGroup({
      memberId: new FormControl('', [UniversalValidators.isNumber]),
      phoneNumber: new FormControl('', [UniversalValidators.isNumber]),
      aadhaarNumber: new FormControl('', [UniversalValidators.isNumber]),
      emailAddress: new FormControl('', [EmailValidators.normal])
    });

    this.loadFamilyLookup();
  
    this.addMode = this.memberId == null;
    if (!this.addMode)
      this.memberForm.disable();    
  }

  loadFamilyLookup() {    
    var mId = this.memberId;
    if (!mId)
      mId = this.authService.memberId();

    this.dataService.getFamilyLookup(mId).subscribe(
      (res) => {
        this.familyLookup = res.result;

        if (this.familyLookup && this.familyLookup.length > 0) {
          if (!this.familyId)
            this.familyId = this.familyLookup[0].familyId;   
          else
            this.familyId = this.familyId * 1; //TRICK TO BIND IT BACK TO UI
        }

        this.loadFamily();

        if (this.memberId > 0)
          this.loadMember();
      },
      (err) => {
        if (err.errors)
          this.alertService.error(err.errors[0]);
        else
          this.alertService.error(err);
      }
    );
  }

  loadMember() {
    return this.dataService.getMember(this.memberId, this.familyId).subscribe(
      (res) => {
        this.memberModel = res.result;
      },
      (err) => {
        if (err.errors)
          this.alertService.error(err.errors[0]);
        else
          this.alertService.error(err);
      }
    );
  }

  loadFamily() {
    this.dataService.getFamilyDetail(this.familyId).subscribe(
      (res) => {
        this.familyModel = res.result;        
      },
      (err) => {
        if (err.errors)
          this.alertService.error(err.errors[0]);
        else
          this.alertService.error(err);
      }
    );
  }

  getRelations(): RelationTypeModel[] {
    if (this.memberModel.gender === 'M')
      return this.relationTypes.data.filter(x => x.male);
    else if (this.memberModel.gender === 'F')
      return this.relationTypes.data.filter(x => !x.male);
    else
      return this.relationTypes.data;
  }

  saveMember() {
    if (this.memberModel.dob && this.memberForm.controls['dob'].dirty)
      this.memberModel.dob.setMinutes(this.memberModel.dob.getMinutes() - this.memberModel.dob.getTimezoneOffset());

    if (this.memberModel.dod && this.memberForm.controls['dod'].dirty)
      this.memberModel.dod.setMinutes(this.memberModel.dod.getMinutes() - this.memberModel.dod.getTimezoneOffset());

    if (this.memberModel.alive === 'A' && this.memberModel.dod)
      this.memberModel.dod = null;

    this.memberModel.familyId = this.familyId;

    this.dataService.saveMember(this.memberModel).subscribe(
      (res) => {
        this.alertService.success("Member details has been updated.");
        this.memberForm.markAsPristine();
        this.cancelEdit();
      },
      (err) => {
        if (err.errors)
          this.alertService.error(err.errors[0]);
        else
          this.alertService.error(err);
      }
    );
  }

  searchMember(){

    return this.dataService.basicSearchMember(this.searchModel).subscribe(
      (res) => {
        
        if (res.result == null)
        {
          this.alertService.error("No member found with provided search criteria. Please try again");
          this.searchMemberModel = null;
          return;
        }

        this.searchMemberModel = res.result;
      },
      (err) => {
        if (err.errors)
          this.alertService.error(err.errors[0]);
        else
          this.alertService.error(err);
      }
    );
  }

  addToFamily(){
    return this.dataService.addMemberToFamily(this.familyId, this.searchMemberModel.memberId).subscribe(
      (res) => {        
        this.alertService.success("Member is added to your family");
        this.cancelEdit();
      },
      (err) => {
        if (err.errors)
          this.alertService.error(err.errors[0]);
        else
          this.alertService.error(err);
      }
    );
  }

  cancelEdit() {
    this.editMode = false;
    this.location.back();
  }

  edit(){
    this.editMode = true;
    this.memberForm.enable();
  }

  loadFamilyInfo(){
    this.router.navigate(['family/' + this.familyId]);    
  }
}
