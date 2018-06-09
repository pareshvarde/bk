import { Component, OnInit, OnDestroy } from '@angular/core';
import { FamilyModel, FamilyMemberModel } from '../../models/familyModel';
import { bkDataService } from '../../services/bk-data.service';
import { NotificationsService } from 'angular2-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { bkAuthService } from '../../services/auth-service';
import { ConfirmationService, ResolveEmit } from '@jaspero/ng-confirmations';
import { CATEGORIES_DATA } from '../../data/categories';
import { NUKHS_LOOKUP_DATA } from '../../data/nukhsLookup';
import { Location } from '@angular/common';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss']  
})
export class FamilyComponent implements OnInit, OnDestroy {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  model: FamilyModel;
  familyForm: FormGroup;
  familyId: number;
  familyLookup: any[];
  editMode: boolean;
  dataSource: any;
  matrimonyDatasource: any;
  readonly NUKHS_LOOKUP_DATA_LOCAL = NUKHS_LOOKUP_DATA;
  readonly CATEGORIES_DATA_LOCAL = CATEGORIES_DATA;

  constructor(private route: ActivatedRoute, private router: Router, private dataService: bkDataService,
    private alertService: NotificationsService, public authService: bkAuthService,
    private _confirmation: ConfirmationService,  private location: Location) {

    this.route.params.subscribe(params => {
      if (params.familyId > 0)
        this.familyId = params.familyId;
      else
        this.familyId = null;

      this.initializeComponent();
    });
  }

  displayedColumns = ['memberId', 'name', 'age', 'married', 'relation', 'actions'];
  matriDisplayedColumns = ['name'];

  ngOnInit() {
    this.familyForm = new FormGroup({
      categoryId: new FormControl('', [Validators.required]),
      nukhId: new FormControl('', [Validators.required]),
      address1: new FormControl('', [Validators.maxLength(50)]),
      address2: new FormControl('', [Validators.maxLength(50)]),
      city: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      postalCode: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      state: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      country: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      hof: new FormControl('', [Validators.required])
    });

    this.familyForm.disable();
  }

  ngOnDestroy(){
    this.destroyed$.next(true);
    this.destroyed$.complete(); 
  }

  initializeComponent() {
    this.model = new FamilyModel();
    this.familyLookup = new Array<any>();
    this.dataSource = null;
    this.matrimonyDatasource = null;

    this.loadFamilyLookup();
  }

  loadFamilyLookup() {
    var mId = this.authService.memberId();

    this.dataService.getFamilyLookup(mId).takeUntil(this.destroyed$).subscribe(
      (res) => {
        this.familyLookup = res.result;
        if (this.familyLookup && this.familyLookup.length > 0 && !this.familyId)
        {          
          var defaultFamily = this.familyLookup.find(x => x.defaultFamily == true);
          
          if (defaultFamily)
            this.familyId = defaultFamily.familyId;
          else
            this.familyId = this.familyLookup[0].familyId;
        }
        else
        {
          this.familyId = this.familyId * 1; //TRICK TO BIND IT BACK TO UI
        }

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
    this.dataService.getFamilyDetail(this.familyId).takeUntil(this.destroyed$).subscribe(
      (res) => {
        this.model = res.result;
        this.dataSource = new MatTableDataSource<FamilyMemberModel>(this.model.members);
        this.matrimonyDatasource = new MatTableDataSource<FamilyMemberModel>(this.model.members.filter(x => {
          if (x.matrimonialExists)
            return true;

          if (!x.married && x.gender == 'F' && x.alive && x.age > 17)
            return true;

          if (!x.married && x.gender == 'M' && x.alive && x.age > 20)
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
    if (this.familyForm.invalid)
    {      
      var el = <HTMLElement> document.querySelector("input.ng-invalid");
      if (el)      
        el.focus();      
      return;
    }
      
    this.dataService.saveFamily(this.model).takeUntil(this.destroyed$).subscribe(
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

        this.dataService.deleteFamily(tModel).takeUntil(this.destroyed$).subscribe(
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

        this.dataService.deleteMember(this.familyId, memberId).takeUntil(this.destroyed$).subscribe(
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
    this.dataService.approveMember(memberId, familyId).takeUntil(this.destroyed$).subscribe(
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
    this.dataService.declineMember(memberId, familyId).takeUntil(this.destroyed$).subscribe(
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

  
  deleteMatrimony(memberId: number, name: string)
  {    
    this._confirmation.create('', "Are you sure you want to remove matrimony profile of '" + name + "'?").subscribe(
      (ans: ResolveEmit) => {

        if (!ans.resolved)
          return;

        this.dataService.deleteMatrimony(memberId).takeUntil(this.destroyed$).subscribe(
          (res) => {
            this.alertService.success("Matrimony profile has been removed");            
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

  back(){
    this.location.back();
  }
}
