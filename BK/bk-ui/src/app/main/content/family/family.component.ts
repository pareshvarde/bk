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
import { ConfirmationService, ResolveEmit } from '@jaspero/ng-confirmations';

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
  matrimonyDatasource: any;

  constructor(private route: ActivatedRoute, private router: Router, private dataService: bkDataService,
    private alertService: NotificationsService, public nukhs: NukhData, public authService: bkAuthService,
    private _confirmation: ConfirmationService, public categories: CategoryData) {

    this.route.params.subscribe(params => {
      if (params.familyId > 0)
        this.familyId = params.familyId;
      else
        this.familyId = null;

      this.initializeComponent();
    });
  }

  displayedColumns = ['memberId', 'name', 'age', 'married', 'relation', 'actions'];
  matriDisplayedColumns = ['name', 'age', 'relation', 'actions'];

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
  }

  initializeComponent() {
    this.model = new FamilyModel();
    this.familyLookup = new Array<FamilyLookupModel>();
    this.dataSource = null;
    this.matrimonyDatasource = null;

    this.loadFamilyLookup();
  }

  loadFamilyLookup() {
    var mId = this.authService.memberId();

    this.dataService.getFamilyLookup(mId).subscribe(
      (res) => {
        this.familyLookup = res.result;
        if (this.familyLookup && this.familyLookup.length > 0 && !this.familyId)
          this.familyId = this.familyLookup[0].familyId;
        else
          this.familyId = this.familyId * 1; //TRICK TO BIND IT BACK TO UI

        this.loadFamily();
      },
      (err) => {
        if (err.errors)
          this.alertService.error('', err.errors[0]);
        else
          this.alertService.error('', err);
      }
    );
  }

  loadFamily() {
    this.dataService.getFamilyDetail(this.familyId).subscribe(
      (res) => {
        this.model = res.result;
        this.dataSource = new MatTableDataSource<FamilyMemberModel>(this.model.members);
        this.matrimonyDatasource = new MatTableDataSource<FamilyMemberModel>(this.model.members.filter(x => {
          if (x.matrimonialId > 0)
            return true;

          if (!x.married && x.gender == 'F' && x.age > 17)
            return true;

          if (!x.married && x.gender == 'M' && x.age > 20)
            return true;
        }));
      },
      (err) => {
        if (err.errors)
          this.alertService.error('', err.errors[0]);
        else
          this.alertService.error('', err);
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
          this.alertService.error('', err.errors[0]);
        else
          this.alertService.error('', err);
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

  delete() {
    let tModel = new FamilyModel();
    tModel.familyId = this.model.familyId;

    this._confirmation.create('', 'Are you sure you want to delete this family?').subscribe(
      (ans: ResolveEmit) => {
        if (!ans.resolved)
          return;

        this.dataService.deleteFamily(tModel).subscribe(
          (res) => {
            this.alertService.success("Family has been deleted");
          },
          (err) => {
            if (err.errors)
              this.alertService.error('', err.errors[0]);
            else
              this.alertService.error('', err);
          }
        );
      }
    );
  }

  deleteMember(memberId: number, name: string) {

    if (this.model.hofId == memberId) {
      this.alertService.error('', 'Head Of Family cannot be deleted');
      return;
    }

    this._confirmation.create('', "Are you sure you want to remove '" + name + "' from this family?").subscribe(
      (ans: ResolveEmit) => {

        if (!ans.resolved)
          return;

        this.dataService.deleteMember(this.familyId, memberId).subscribe(
          (res) => {
            this.alertService.success("Member has been removed from the family");
            this.loadFamily();
          },
          (err) => {
            if (err.errors)
              this.alertService.error('', err.errors[0]);
            else
              this.alertService.error('', err);
          }
        );
      })
  }

  approveMember(memberId: number, familyId: number) {
    this.dataService.approveMember(memberId, familyId).subscribe(
      (res) => {
        this.alertService.success("Member family association approved");
        this.loadFamily();
      },
      (err) => {
        if (err.errors)
          this.alertService.error('', err.errors[0]);
        else
          this.alertService.error('', err);
      }
    );
  }

  declineMember(memberId: number, familyId: number) {
    this.dataService.declineMember(memberId, familyId).subscribe(
      (res) => {
        this.alertService.success("Member family association removed");
        this.loadFamily();
      },
      (err) => {
        if (err.errors)
          this.alertService.error('', err.errors[0]);
        else
          this.alertService.error('', err);
      }
    );
  }

  deleteMatrimony(memberId: number, name: string) {

  }
}
