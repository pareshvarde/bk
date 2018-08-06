import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../../../node_modules/@angular/forms';
import { MemberModel } from '../../models/memberModel';
import { UniversalValidators } from '../../../../../node_modules/ng2-validators';
import { bkDataService } from '../../services/bk-data.service';
import { ConfirmationService } from '../../../../../node_modules/@jaspero/ng-confirmations';
import { GlobalService } from '../../services/global-service';
import { ReplaySubject } from '../../../../../node_modules/rxjs';
import { FamilyModel } from '../../models/familyModel';
import { NotificationsService } from '../../../../../node_modules/angular2-notifications';
import { RELATION_TYPES_DATA } from '../../data/relations';
import { Router } from '../../../../../node_modules/@angular/router';
import { MemberSearchParameter } from '../../models/memberSearchParameter';
import { Location } from '@angular/common';

@Component({
  selector: 'app-existing-member-add',
  templateUrl: './existing-member-add.component.html',
  styleUrls: ['./existing-member-add.component.scss']
})
export class ExistingMemberAddComponent implements OnInit, OnDestroy {

  searchForm: FormGroup;  
  searchResults: any[]=[];
  searchModel: MemberSearchParameter;  
  readonly MAX_RESULT_COUNT: number = 25;
  @Input() familyModel: FamilyModel;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  
  constructor(private dataService: bkDataService, private confirmationService: ConfirmationService, 
    public globalService: GlobalService, private notificationService: NotificationsService, 
    private router: Router, private location: Location) {     
      this.searchModel = new MemberSearchParameter();
      this.searchModel.pageSize = this.MAX_RESULT_COUNT;
      this.searchModel.currentPage = 0;
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      memberId: new FormControl('', [UniversalValidators.isNumber]),
      phoneNumber: new FormControl('', [UniversalValidators.isNumber, , Validators.maxLength(15)]),
      aadhaarNumber: new FormControl('', [UniversalValidators.isNumber, , Validators.maxLength(16)]),
      emailAddress: new FormControl('', [Validators.email, Validators.maxLength(100)]),
      city: new FormControl('', [Validators.maxLength(50)]),
      firstName: new FormControl('', [Validators.maxLength(50)])
    });    
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
  

  searchMember() {
    if (this.searchForm.invalid) {
      var el = <HTMLElement>document.querySelector("input.ng-invalid");
      if (el)
        el.focus();
      return;
    }

    if (!this.searchModel.memberId && !this.searchModel.phoneNumber && !this.searchModel.aadhaarNumber
          && !this.searchModel.email && !this.searchModel.city && !this.searchModel.firstName)
    {
        this.confirmationService.create("Error", 'Please provide at least one search parameter', this.globalService.alertOptions);
        return;
    }

    return this.dataService.searchMember(this.searchModel).takeUntil(this.destroyed$).subscribe(
      (res) => {

        this.searchModel.pageSize = this.MAX_RESULT_COUNT;

        if (res.result.totalRecords === 0) {
          this.confirmationService.create("Error", "No member found with provided search criteria. Please try again", this.globalService.alertOptions);          
          this.searchResults = [];
          return;
        }

        res.result.results.forEach(element => {
          this.searchResults.push(element);
        });   
      },
      (err) => {
        if (err.errors)
          this.confirmationService.create("Error", err.errors[0], this.globalService.alertOptions);
        else
          this.confirmationService.create("Error", err, this.globalService.alertOptions);
      }
    );
  }

  addToFamily(memberModel: MemberModel) {
    
    if (!memberModel.relatedMemberId || !memberModel.relationTypeId) {
      this.confirmationService.create("Error", "Please provide relation", this.globalService.alertOptions);      
      return;
    }

    return this.dataService.addMemberToFamily(this.familyModel.familyId, memberModel.memberId,memberModel.relatedMemberId, memberModel.relationTypeId).takeUntil(this.destroyed$).subscribe(
      (res) => {
        this.notificationService.success("Member is added to your family");        
        this.router.navigate(['family', this.familyModel.familyId]);
      },
      (err) => {
        if (err.errors)
          this.confirmationService.create("Error", err.errors[0], this.globalService.alertOptions);
        else
          this.confirmationService.create("Error", err, this.globalService.alertOptions);
      }
    );
  }

  back() {

    if (window.history.length > 1)
      this.location.back();
    else
      this.router.navigate(['home']);
  }

  getRelations(member: MemberModel): any[] {    

    if (member.gender === true)
      return RELATION_TYPES_DATA.filter(x => x.male || x.relationTypeId == null);
    else if (member.gender === false && member.maritalStatusId === 1)
      return RELATION_TYPES_DATA.filter(x => (!x.male && !x.married) || x.relationTypeId == null);
    else if (member.gender === false)
      return RELATION_TYPES_DATA.filter(x => !x.male || x.relationTypeId == null);
    else
      return RELATION_TYPES_DATA;
  }

  getRelatedMember(member: MemberModel): any[] {
    return this.familyModel.members.filter(x => x.maritalStatusId > 1 && x.memberId != member.memberId);
  }
}
