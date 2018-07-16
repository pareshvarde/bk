import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '../../../../../node_modules/@angular/forms';
import { UniversalValidators } from '../../../../../node_modules/ng2-validators';
import { Router } from '../../../../../node_modules/@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {

  contactusForm: FormGroup;
  
  constructor(private router: Router, private location: Location) { }

  ngOnInit() {
    this.contactusForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, UniversalValidators.isNumber]),
      subject: new FormControl('', [Validators.required]),
      attachment: new FormControl('', null),
      content: new FormControl('', [Validators.required, Validators.maxLength(255)])
    });  
  }

  save(){

  }

  cancel(){
    if (window.history.length > 1)
      this.location.back();
    else
      this.router.navigate(['home']);
  }
}
