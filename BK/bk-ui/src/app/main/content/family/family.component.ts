import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
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
import { GlobalService } from '../../services/global-service';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss']
})
export class FamilyComponent implements OnInit, AfterViewChecked, OnDestroy {

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
    private notificationService: NotificationsService, public authService: bkAuthService,
    private confirmationService: ConfirmationService, private location: Location, private globalService: GlobalService,
    private cdr: ChangeDetectorRef) {

    this.route.params.takeUntil(this.destroyed$).subscribe(params => {
      this.familyId = params.familyId;

      this.initializeComponent();
    });
  }

  displayedColumns = ['memberId', 'name', 'age', 'married', 'relation', 'maternal', 'paternal', 'actions'];
  matriDisplayedColumns = ['name'];


  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.familyForm = new FormGroup({
      categoryId: new FormControl('', [Validators.required]),
      nukhId: new FormControl('', [Validators.required]),
      familyNative: new FormControl('', [Validators.maxLength(50)]),
      address1: new FormControl('', [Validators.maxLength(50)]),
      address2: new FormControl('', [Validators.maxLength(50)]),
      city: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      district: new FormControl('', [Validators.maxLength(50)]),
      postalCode: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      state: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      country: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      hof: new FormControl('', [Validators.required])
    });

    this.familyForm.disable();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  initializeComponent() {
    this.model = new FamilyModel();
    this.familyLookup = new Array<any>();
    this.dataSource = null;
    this.matrimonyDatasource = null;

    this.loadFamily();
  }

  loadFamily() {

    this.dataService.getFamilyDetail(this.familyId).takeUntil(this.destroyed$).subscribe(
      (res) => {
        this.model = res.result;
        this.dataSource = new MatTableDataSource<FamilyMemberModel>(this.model.members);
        this.matrimonyDatasource = new MatTableDataSource<FamilyMemberModel>(this.model.members.filter(x => {
          if (x.matrimonialExists)
            return true;

          if (!x.married && x.gender == false && x.alive && x.age > 17)
            return true;

          if (!x.married && x.gender == true && x.alive && x.age > 20)
            return true;
        }));

      },
      (err) => {
        if (err.errors)
          this.confirmationService.create("Error", err.errors[0], this.globalService.alertOptions);
        else
          this.confirmationService.create("Error", err, this.globalService.alertOptions);
      }
    );
  }

  saveFamily() {
    if (this.familyForm.invalid) {
      var el = <HTMLElement>document.querySelector("input.ng-invalid");
      if (el)
        el.focus();
      return;
    }

    this.dataService.saveFamily(this.model).takeUntil(this.destroyed$).subscribe(
      (res) => {
        this.notificationService.success("Family details has been updated.");
        this.familyForm.markAsPristine();
        this.cancelEdit();
      },
      (err) => {
        if (err.errors)
          this.confirmationService.create("Error", err.errors[0], this.globalService.alertOptions);
        else
          this.confirmationService.create("Error", err, this.globalService.alertOptions);
      }
    );
  }

  cancelEdit() {
    this.editMode = false;
    this.familyForm.disable();
    this.loadFamily();
  }

  edit() {
    this.editMode = true;
    this.familyForm.enable();
  }

  delete() {
    let tModel = new FamilyModel();
    tModel.familyId = this.model.familyId;

    this.confirmationService.create('', 'Are you sure you want to delete this family?').subscribe(
      (ans: ResolveEmit) => {
        if (!ans.resolved)
          return;

        this.dataService.deleteFamily(tModel).takeUntil(this.destroyed$).subscribe(
          (res) => {
            if (res.result) {
              this.authService.logout();
            }

            this.notificationService.success("Family has been deleted");
            this.back();
          },
          (err) => {
            if (err.errors)
              this.confirmationService.create("Error", err.errors[0], this.globalService.alertOptions);
            else
              this.confirmationService.create("Error", err, this.globalService.alertOptions);
          }
        );
      }
    );
  }

  deleteMember(memberId: number, name: string) {

    if (this.model.hofId == memberId) {
      this.confirmationService.create("Error", "Head Of Family cannot be deleted", this.globalService.alertOptions);
      return;
    }

    this.confirmationService.create('', "Are you sure you want to remove '" + name + "' from this family?").subscribe(
      (ans: ResolveEmit) => {

        if (!ans.resolved)
          return;

        this.dataService.deleteMember(this.familyId, memberId).takeUntil(this.destroyed$).subscribe(
          (res) => {
            if (res.result) {
              this.authService.logout();
              this.notificationService.success("Member has been removed from the family");
              return;
            }

            this.notificationService.success("Member has been removed from the family");
            this.loadFamily();
          },
          (err) => {
            if (err.errors)
              this.confirmationService.create("Error", err.errors[0], this.globalService.alertOptions);
            else
              this.confirmationService.create("Error", err, this.globalService.alertOptions);
          }
        );
      })
  }

  approveMember(memberId: number, familyId: number) {
    this.dataService.approveMember(memberId, familyId).takeUntil(this.destroyed$).subscribe(
      (res) => {
        this.notificationService.success("Member family association approved");
        this.loadFamily();
      },
      (err) => {
        if (err.errors)
          this.confirmationService.create("Error", err.errors[0], this.globalService.alertOptions);
        else
          this.confirmationService.create("Error", err, this.globalService.alertOptions);
      }
    );
  }

  declineMember(memberId: number, familyId: number) {
    this.dataService.declineMember(memberId, familyId).takeUntil(this.destroyed$).subscribe(
      (res) => {
        this.notificationService.success("Member family association removed");
        this.loadFamily();
      },
      (err) => {
        if (err.errors)
          this.confirmationService.create("Error", err.errors[0], this.globalService.alertOptions);
        else
          this.confirmationService.create("Error", err, this.globalService.alertOptions);
      }
    );
  }


  deleteMatrimony(memberId: number, name: string) {
    this.confirmationService.create('', "Are you sure you want to remove matrimony profile of '" + name + "'?").subscribe(
      (ans: ResolveEmit) => {

        if (!ans.resolved)
          return;

        this.dataService.deleteMatrimony(memberId).takeUntil(this.destroyed$).subscribe(
          (res) => {
            this.notificationService.success("Matrimony profile has been removed");
            this.loadFamily();
          },
          (err) => {
            if (err.errors)
              this.confirmationService.create("Error", err.errors[0], this.globalService.alertOptions);
            else
              this.confirmationService.create("Error", err, this.globalService.alertOptions);
          }
        );
      })
  }

  back() {
    if (window.history.length > 1)
      this.location.back();
    else
      this.router.navigate(['home']);
  }
}
