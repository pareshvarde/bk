import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '../../../../../node_modules/@angular/material';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

  constructor(private dialogRef:MatDialogRef<TermsComponent>) { }

  ngOnInit() {
  }

  close(){
    this.dialogRef.close();
  }
}
