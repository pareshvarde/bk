import { Component, OnInit } from '@angular/core';
import { bkDataService } from '../../services/bk-data.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-matrimony-search',
  templateUrl: './matrimony-search.component.html',
  styleUrls: ['./matrimony-search.component.scss']
})
export class MatrimonySearchComponent implements OnInit {

  results: any[] = [];
  totalCount: number = 0;
  searchParameter: any;
  pageNumber: number = 0;
  hasResult: boolean;
  readonly PAGE_SIZE: number = 5;

  constructor(private dataService: bkDataService, private alertService: NotificationsService) {

  }

  ngOnInit() {
    this.search(this.searchParameter);
  }

  search(searchParameter: any) {

    this.results = [];
    this.hasResult = true;
    this.pageNumber = 0;
    this.searchParameter = searchParameter;
    this.searchParameter.pageSize = this.PAGE_SIZE;
    this.performSearch();
  }

  performSearch() {

    if (!this.hasResult)
      return;

    this.pageNumber = this.pageNumber + 1;
    this.searchParameter.currentPage = this.pageNumber;

    this.dataService.searchMember(this.searchParameter).subscribe(
      (res) => {

        if (res.result.results.length < this.searchParameter.pageSize)
          this.hasResult = false;
        else
          this.hasResult = true;

        res.result.results.forEach(element => {
          this.results.push(element);
        });

        this.totalCount = res.result.totalRecords;

        if (!this.hasScroll())
          this.performSearch();
      },
      (err) => {
        if (err.errors)
          this.alertService.error('', err.errors[0]);
        else
          this.alertService.error('', err);
      }
    );
  }

  clear(searchParameter: any) {
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
}
