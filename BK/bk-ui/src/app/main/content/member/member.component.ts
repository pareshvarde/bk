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

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
  providers: [bkDataService, RelationTypeData]
})

export class MemberComponent implements OnInit {

  currentFamily: FamilyModel;
  memberModel: MemberModel;
  familyId: number;
  memberId: number;
  familyLookup: FamilyLookupModel[];
  memberForm: FormGroup;
  editMode: boolean;
  addMode: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private dataService: bkDataService,
    private alertService: NotificationsService, public relationTypes: RelationTypeData, private location: Location) {
    this.route.params.subscribe(params => this.familyId = params.familyId);
    this.route.params.subscribe(params => this.memberId = params.memberId);
    this.memberModel = new MemberModel();
    this.memberModel.gender = 'M';
    this.memberModel.alive = 'A';
    this.memberModel.familyId = this.familyId;
    this.currentFamily = new FamilyModel();
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
      relationTypeId: new FormControl('', [Validators.required]),
      relatedMemberId: new FormControl('', [Validators.required])
    });

    this.loadFamilyLookup();

    if (this.familyId){
      this.loadFamily();
      this.addMode = true;
    }

    if (this.memberId){
      this.loadMember();
      this.memberForm.disable();
      this.addMode = false;      
    }

    if (!this.familyId && !this.memberId){
      this.addMode = false;
      this.memberForm.disable();
      this.loadMember();
    }
  }

  loadFamilyLookup() {
    this.dataService.getFamilyLookup().subscribe(
      (res) => {
        this.familyLookup = res.result;

        if (this.familyLookup && this.familyLookup.length > 0) {
          if (!this.familyId) {
            this.familyId = this.familyLookup[0].familyId;
            this.loadFamily();
          }
        }
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
    return this.dataService.getMember().subscribe(
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
        this.currentFamily = res.result;        
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

  cancelEdit() {
    this.editMode = false;
    this.location.back();
  }

  edit(){
    this.editMode = true;
    this.memberForm.enable();
  }
}
