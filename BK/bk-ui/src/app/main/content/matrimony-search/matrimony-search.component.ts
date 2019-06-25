import { Component, OnInit, OnDestroy } from '@angular/core';
import { bkDataService } from '../../services/bk-data.service';
import { MatrimonySearchParameter } from '../../models/matrimonySearchParameter';
import { ReplaySubject } from 'rxjs';
import { BkImageViewerComponent } from '../../../core/components/bk-image-viewer/bk-image-viewer.component';
import { MatDialog } from '@angular/material';
import { OCCUPATIONS_DATA } from '../../data/occupations';
import { GlobalService } from '../../services/global-service';
import { ConfirmationService } from '@jaspero/ng-confirmations';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-matrimony-search',
  templateUrl: './matrimony-search.component.html',
  styleUrls: ['./matrimony-search.component.scss']
})
export class MatrimonySearchComponent implements OnInit, OnDestroy {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  results: any[] = [];
  totalCount: number = 0;
  searchParameter: MatrimonySearchParameter;
  pageNumber: number = 0;
  hasResult: boolean;
  readonly PAGE_SIZE: number = 25;
  readonly OCCUPATION_DATA_LOCAL = OCCUPATIONS_DATA;

  constructor(private dataService: bkDataService, public dialog: MatDialog,
    private confirmationService: ConfirmationService, private globalService: GlobalService) {
    this.searchParameter = new MatrimonySearchParameter();
  }

  ngOnInit() {
    this.fetchFilters();
    this.search();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  search() {
    this.storeFilters();
    this.results = [];
    this.hasResult = true;
    this.pageNumber = 0;    
    this.searchParameter.pageSize = this.PAGE_SIZE;
    this.performSearch();
  }

  getOccupation(occupationId: number): string {
    var filteredResult = this.OCCUPATION_DATA_LOCAL.filter(x => x.id == occupationId);
    if (filteredResult && filteredResult.length > 0)
      return filteredResult[0].occupation;
    else
      return "";
  }

  performSearch() {

    if (!this.hasResult)
      return;

    this.pageNumber = this.pageNumber + 1;
    this.searchParameter.currentPage = this.pageNumber;

    this.dataService.searchMatrimony(this.searchParameter).pipe(takeUntil(this.destroyed$)).subscribe(
      (res) => {

        if (res.result.results.length < this.searchParameter.pageSize)
          this.hasResult = false;
        else
          this.hasResult = true;

        res.result.results.forEach(element => {
          element.occupation = this.getOccupation(element.occupationId);
          this.results.push(element);
        });

        this.totalCount = res.result.totalRecords;

        if (!this.hasScroll())
          this.performSearch();
      },
      (err) => {
        if (err.errors)
          this.confirmationService.create("Error", err.errors[0], this.globalService.alertOptions);
        else
          this.confirmationService.create("Error", err, this.globalService.alertOptions);
      }
    );
  }

  clear() {
    this.results = [];
    this.searchParameter = new MatrimonySearchParameter();
    this.searchParameter.pageSize = this.PAGE_SIZE;
    this.search();
  }

  hasScroll(): boolean {

    var container = document.getElementsByClassName("mainContent")[0];

    if (container.scrollHeight - container.clientHeight > 0)
      return true;
    else
      return false;
  }

  showPhoto(model: any) {
    var pictures: any[] = new Array();
    
    if (model.photoUrl && model.photoUrl.indexOf('male') === -1)
      pictures.push(model.photoUrl);

    if (model.photo1Url && model.photo1Url.indexOf('male') === -1)
      pictures.push(model.photo1Url);

    if (model.photo2Url && model.photo2Url.indexOf('male') === -1)
      pictures.push(model.photo2Url);

    if (model.photo3Url && model.photo3Url.indexOf('male') === -1)
      pictures.push(model.photo3Url);

    if (pictures.length == 0)
      pictures.push(model.photoUrl);

    let dialogRef = this.dialog.open(BkImageViewerComponent, {
      data: { images: pictures }
    });
  }

  storeFilters(){
    var filterString = JSON.stringify(this.searchParameter);
    sessionStorage.setItem('mfilter', filterString);
  }

  firstPhoto(model: any){
    
    if (model.photoUrl && model.photoUrl.indexOf('male') === -1)
      return model.photoUrl;
    else if (model.photo1Url && model.photo1Url.indexOf('male') === -1)
      return model.photo1Url;
    else if (model.photo2Url && model.photo2Url.indexOf('male') === -1)
      return model.photo2Url;
    else if (model.photo3Url && model.photo3Url.indexOf('male') === -1)
      return model.photo3Url;
    else
      return model.photoUrl;    
  }

  fetchFilters(){
    var filterString = sessionStorage.getItem('mfilter');
    if (!filterString)
      return;
    
    this.searchParameter = JSON.parse(filterString);
  }
}
