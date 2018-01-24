import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { bkDataService } from '../../services/bk-data.service';
import { NotificationsService } from 'angular2-notifications';
import { ProfileModel } from '../../models/profileModel';
import { EmailValidators, UniversalValidators } from 'ng2-validators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [bkDataService]
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  model: ProfileModel;
  editMode: boolean;

  constructor(private dataService: bkDataService, private alertService: NotificationsService) { 
    
  }

  ngOnInit() {
    this.editMode = false;    
    this.model = new ProfileModel();    

    this.profileForm =  new FormGroup({      
      firstName: new FormControl('', [UniversalValidators.noWhitespace,Validators.required]),
      lastName: new FormControl('', [UniversalValidators.noWhitespace,Validators.required]),
      nickName: new FormControl('', [UniversalValidators.noWhitespace]),
      email: new FormControl('', [EmailValidators.normal,Validators.required]),
      phoneNumber: new FormControl('', [UniversalValidators.noWhitespace, UniversalValidators.isNumber, Validators.required]),
      aadhaarNumber: new FormControl('', [UniversalValidators.isNumber]),      
      gender: new FormControl('M', null),
      alive: new FormControl('A', null),
      dob: new FormControl('', [Validators.required]),
      dod: new FormControl('', null),
      birthPlace: new FormControl('', null),
      deathPlace: new FormControl('', null),
      educationLevel: new FormControl('', null),
      educationField: new FormControl('', null),
      companyName: new FormControl('', null),
      jobTitle: new FormControl('', null),
      facebookHandle: new FormControl('', [UniversalValidators.noWhitespace]),
      instagramHandle: new FormControl('', [UniversalValidators.noWhitespace]),
      twitterHandle: new FormControl('', [UniversalValidators.noWhitespace])
    }); 
        
    this.profileForm.disable();
    this.loadProfile();
  }

  loadProfile()
  {
    return this.dataService.getProfile().subscribe(
      (res) => {        
        this.model = res.result;        
      },
      (err) => {        
        if (err.errors)
          this.alertService.error(err.errors[0]);
        else
          this.alertService.error(err);        
      }
    );    
  }

  saveProfile(){
    
    if (this.model.dob && this.profileForm.controls['dob'].dirty)
      this.model.dob.setMinutes(this.model.dob.getMinutes() - this.model.dob.getTimezoneOffset());

    if (this.model.dod && this.profileForm.controls['dod'].dirty)
      this.model.dod.setMinutes(this.model.dod.getMinutes() - this.model.dod.getTimezoneOffset());

    this.dataService.saveProfile(this.model).subscribe(
      (res) => {      
        this.alertService.success("Profile has been updated successfully.");        
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

  cancelEdit(){
    this.editMode = false;
    this.profileForm.disable();
  }

  edit(){
    this.editMode = true;
    this.profileForm.enable();
  }
}
