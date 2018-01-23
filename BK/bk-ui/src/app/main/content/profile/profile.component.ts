import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.profileForm = new FormGroup({
      currentPassword: new FormControl('', Validators.required)      
    });
  }

}
