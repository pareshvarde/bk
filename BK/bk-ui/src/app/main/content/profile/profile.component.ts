import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { bkDataService } from '../../services/bk-data.service';
import { NotificationsService } from 'angular2-notifications';
import { ProfileModel } from '../../models/profileModel';

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

  constructor(private dataService: bkDataService, private alertService: NotificationsService) { }

  ngOnInit() {
    this.editMode = true;

    this.profileForm = new FormGroup({
      currentPassword: new FormControl('', Validators.required)      
    });
    
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
}
