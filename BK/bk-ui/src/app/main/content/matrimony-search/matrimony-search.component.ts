import { Component, OnInit, OnDestroy } from '@angular/core';
import { bkDataService } from '../../services/bk-data.service';
import { MatrimonySearchParameter } from '../../models/matrimonySearchParameter';
import { ReplaySubject } from 'rxjs';
import { BkImageViewerComponent } from '../../../core/components/bk-image-viewer/bk-image-viewer.component';
import { MatDialog } from '@angular/material';
import { OCCUPATIONS_DATA } from '../../data/occupations';
import { GlobalService } from '../../services/global-service';
import { ConfirmationService } from '@jaspero/ng-confirmations';

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
    this.search(this.searchParameter);
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  search(searchParameter: MatrimonySearchParameter) {

    this.results = [];
    this.hasResult = true;
    this.pageNumber = 0;
    this.searchParameter = searchParameter;
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

    this.dataService.searchMatrimony(this.searchParameter).takeUntil(this.destroyed$).subscribe(
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

  clear(searchParameter: MatrimonySearchParameter) {
    this.results = [];
    searchParameter.pageSize = this.PAGE_SIZE;
    this.search(searchParameter);
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
    pictures.push(model.photoUrl);

    if (model.photo1Url && model.photo1Url.indexOf('male') === -1)
      pictures.push(model.photo1Url);

    if (model.photo1Url && model.photo2Url.indexOf('male') === -1)
      pictures.push(model.photo2Url);

    if (model.photo1Url && model.photo3Url.indexOf('male') === -1)
      pictures.push(model.photo3Url);

    let dialogRef = this.dialog.open(BkImageViewerComponent, {
      data: { images: pictures }
    });
  }
}
