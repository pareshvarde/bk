import { Component, OnInit } from '@angular/core';
import { FamilyModel } from '../../models/familyModel';
import { Router, ActivatedRoute } from '@angular/router';
import { bkDataService } from '../../services/bk-data.service';
import { NotificationsService } from 'angular2-notifications';
import { MemberModel } from '../../models/memberModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UniversalValidators, EmailValidators } from 'ng2-validators';
import { RelationTypeData } from '../../data/relations';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss'],
  providers: [bkDataService, RelationTypeData]
})

export class AddMemberComponent implements OnInit {

  currentFamily: FamilyModel;
  memberModel: MemberModel;
  familyId: number;
  addExisting: boolean;
  memberForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private dataService: bkDataService, 
    private alertService: NotificationsService,public relationTypes: RelationTypeData) { 
      this.route.params.subscribe(params => this.familyId = params.familyId);
      this.addExisting = true;
      this.memberModel = new MemberModel();    
      this.memberModel.gender = 'M';
      this.memberModel.alive = 'A';
      this.currentFamily = new FamilyModel();
    }

  ngOnInit() {
    this.memberForm =  new FormGroup({      
      firstName: new FormControl('', [UniversalValidators.noWhitespace,Validators.required]),
      lastName: new FormControl('', [UniversalValidators.noWhitespace,Validators.required]),
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
    
    this.loadFamily();
  }

  loadFamily(){
    this.dataService.getFamilyDetail(this.familyId).subscribe(
      (res) => {            
        this.currentFamily = res.result;        
        debugger;                        
      },
      (err) => {        
        if (err.errors)
          this.alertService.error(err.errors[0]);
        else
          this.alertService.error(err);
      }
    );
  }

  saveMember(){

  }

  cancelAdd(){

  }
}
