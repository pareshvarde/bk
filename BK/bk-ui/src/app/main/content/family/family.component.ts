import { Component, OnInit } from '@angular/core';
import { FamilyModel, FamilyMemberModel } from '../../models/familyModel';
import { bkDataService } from '../../services/bk-data.service';
import { NotificationsService } from 'angular2-notifications';
import { NukhData } from '../../data/nukhs';
import { CategoryData } from '../../data/categories';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { FamilyLookupModel } from '../../models/familyLookupModel';
import { bkAuthService } from '../../services/auth-service';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss'],
  providers: [bkDataService, NukhData, CategoryData, bkAuthService]
})
export class FamilyComponent implements OnInit {

  model: FamilyModel;
  familyForm: FormGroup;
  familyId: number;
  familyLookup: FamilyLookupModel[];
  editMode: boolean;
  dataSource: any;

  constructor(private route: ActivatedRoute, private router: Router, private dataService: bkDataService,
    private alertService: NotificationsService, public nukhs: NukhData, public authService: bkAuthService, public categories: CategoryData) {

    this.route.params.subscribe(params => {
      if (params.familyId > 0)
        this.familyId = params.familyId;
    });

    this.model = new FamilyModel();
  }

  displayedColumns = ['memberId', 'name', 'dob', 'married', 'relation', 'actions'];

  ngOnInit() {
    this.familyForm = new FormGroup({
      categoryId: new FormControl('', [Validators.required]),
      nukhId: new FormControl('', [Validators.required]),
      address1: new FormControl('', null),
      address2: new FormControl('', null),
      city: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      hof: new FormControl('', [Validators.required])
    });

    this.familyForm.disable();
    this.loadFamilyLookup();
  }

  loadFamilyLookup() {
    var mId = this.authService.memberId();

    this.dataService.getFamilyLookup(mId).subscribe(
      (res) => {
        this.familyLookup = res.result;
        
        if (this.familyLookup && this.familyLookup.length > 0 && !this.familyId) {
          this.familyId = this.familyLookup[0].familyId;          
        }

        this.loadFamily();
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
        this.model = res.result;
        this.dataSource = new MatTableDataSource<FamilyMemberModel>(this.model.members);
      },
      (err) => {
        if (err.errors)
          this.alertService.error(err.errors[0]);
        else
          this.alertService.error(err);
      }
    );
  }

  saveFamily() {
    this.dataService.saveFamily(this.model).subscribe(
      (res) => {
        this.alertService.success("Family details has been updated.");
        this.familyForm.markAsPristine();
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
    this.familyForm.disable();
  }

  edit() {
    this.editMode = true;
    this.familyForm.enable();
  }

  addMember() {
    this.router.navigate(['member/' + this.familyId + "/0"]);
  }

  deleteMember(memberId: number){
    alert('delete ' + memberId);
  }

  editMember(memberId: number){
    alert('edit ' + memberId);
  }
}
