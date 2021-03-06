import { Component, OnInit, OnDestroy, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { FamilyModel, FamilyMemberModel } from '../../models/familyModel';
import { bkDataService } from '../../services/bk-data.service';
import { NotificationsService } from 'angular2-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { bkAuthService } from '../../services/auth-service';
import { ConfirmationService, ResolveEmit } from '@jaspero/ng-confirmations';
import { Location } from '@angular/common';
import { RELATION_TYPES_DATA } from '../../data/relations';
import { CATEGORIES_DATA } from '../../data/categories';
import { NUKHS_LOOKUP_DATA } from '../../data/nukhsLookup';
import { ReplaySubject } from 'rxjs';
import { GlobalService } from '../../services/global-service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-fork',
  templateUrl: './fork.component.html',
  styleUrls: ['./fork.component.scss']
})
export class ForkComponent implements OnInit, AfterViewChecked, OnDestroy {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  model: FamilyModel;
  forkForm: FormGroup;
  familyId: number;
  dataSource: any;
  readonly NUKHS_LOOKUP_DATA_LOCAL = NUKHS_LOOKUP_DATA;
  readonly CATEGORIES_DATA_LOCAL = CATEGORIES_DATA;

  constructor(private route: ActivatedRoute, private router: Router, private dataService: bkDataService,
    private notificationService: NotificationsService, public authService: bkAuthService,
    private confirmationService: ConfirmationService, private location: Location,
    private cdr: ChangeDetectorRef, private globalService: GlobalService) {

    this.route.params.pipe(takeUntil(this.destroyed$)).subscribe(params => {
      if (params.familyId > 0)
        this.familyId = params.familyId;
      else
        this.familyId = null;

      this.initializeComponent();
    });
  }

  displayedColumns = ['selected', 'name', 'relationTypeId', 'relatedToId'];

  ngOnInit() {
    this.forkForm = new FormGroup({
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
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  initializeComponent() {
    this.model = new FamilyModel();
    this.dataSource = null;
    this.loadFamily();
  }

  loadFamily() {
    this.dataService.getFamilyDetail(this.familyId).pipe(takeUntil(this.destroyed$)).subscribe(
      (res) => {
        this.model = res.result;
        this.model.hofId = null;
        this.dataSource = new MatTableDataSource<FamilyMemberModel>(this.model.members);
      },
      (err) => {
        if (err.errors)
          this.confirmationService.create("Error", err.errors[0], this.globalService.alertOptions);
        else
          this.confirmationService.create("Error", err, this.globalService.alertOptions);
      }
    );
  }

  filterMember(member: FamilyMemberModel) {
    return member.selected === true && member.maritalStatusId > 1;
  }

  hofFilter(member: FamilyMemberModel) {
    return member.selected === true;
  }

  getRelations(member: FamilyMemberModel): any[] {
    if (member.gender === true)
      return RELATION_TYPES_DATA.filter(x => x.male || x.relationTypeId == null);
    else if (member.gender === false && member.maritalStatusId === 1)
      return RELATION_TYPES_DATA.filter(x => (!x.male && !x.married) || x.relationTypeId == null);
    else if (member.gender === false)
      return RELATION_TYPES_DATA.filter(x => !x.male || x.relationTypeId == null);
    else
      return RELATION_TYPES_DATA;    
  }

  forkFamily() {
    if (this.forkForm.invalid) {
      var el = <HTMLElement>document.querySelector("input.ng-invalid");
      if (el)
        el.focus();
      return;
    }

    if (this.model.members.filter(x => x.selected).length === 0) {
      this.confirmationService.create("Error", "Please select at least one family member to be part of new family", this.globalService.alertOptions);      
      return;
    }

    this.dataService.forkFamily(this.model).pipe(takeUntil(this.destroyed$)).subscribe(
      (res) => {
        this.notificationService.success("New family created successfully");
        this.router.navigate(['family', res.result]);
      },
      (err) => {
        if (err.errors)
          this.confirmationService.create("Error", err.errors[0], this.globalService.alertOptions);                
        else
          this.confirmationService.create("Error", err, this.globalService.alertOptions);                
      }
    );
  }

  cancel() {
    if (window.history.length > 1)
      this.location.back();
    else  
      this.router.navigate(['home']);
  }
}
