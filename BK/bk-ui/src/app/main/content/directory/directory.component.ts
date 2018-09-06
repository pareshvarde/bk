import { Component, OnInit, OnDestroy } from '@angular/core';
import { MemberSearchParameter } from '../../models/memberSearchParameter';
import { bkDataService } from '../../services/bk-data.service';
import { ReplaySubject } from 'rxjs';
import { BkImageViewerComponent } from '../../../core/components/bk-image-viewer/bk-image-viewer.component';
import { MatDialog } from '@angular/material';
import { ConfirmationService } from '@jaspero/ng-confirmations';
import { GlobalService } from '../../services/global-service';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit, OnDestroy {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  results: any[]=[];
  totalCount: number = 0;
  searchParameter: MemberSearchParameter;
  pageNumber: number = 0;
  hasResult: boolean;
  readonly PAGE_SIZE: number = 25;

  constructor(private dataService: bkDataService, private confirmationService: ConfirmationService, 
    public dialog: MatDialog, private globalService: GlobalService) { 
    this.searchParameter = new MemberSearchParameter();       
  }
      
  ngOnInit() {    
    this.loadSearchParameter();
    this.search();
  }

  ngOnDestroy(){
    this.destroyed$.next(true);
    this.destroyed$.complete(); 
  }

  search(){

    this.storeSearchParameter();    
    this.results = [];
    this.hasResult = true;
    this.pageNumber = 0;    
    this.searchParameter.pageSize = this.PAGE_SIZE;
    this.performSearch();    
  }

  performSearch(){
  
    if (!this.hasResult)
      return;

    this.pageNumber = this.pageNumber + 1;
    this.searchParameter.currentPage = this.pageNumber;

    this.dataService.searchMember(this.searchParameter).pipe(takeUntil(this.destroyed$)).subscribe(
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
          this.confirmationService.create("Error", err.errors[0], this.globalService.alertOptions);                    
        else
          this.confirmationService.create("Error", err, this.globalService.alertOptions);          
      }
    );
  }

  clear(){    
      this.results = [];           
      this.searchParameter = new MemberSearchParameter();      
      this.search();
  }

  hasScroll(): boolean{
    
    var container = document.getElementsByClassName("mainContent")[0];

    if (container.scrollHeight - container.clientHeight > 0)
      return true;
    else
      return false;
  }

  showPhoto(url: string){
    var pictures: any[] = new Array();
    pictures.push(url);    

    let dialogRef = this.dialog.open(BkImageViewerComponent, {
      data: { images:  pictures}
    });
  }

  loadSearchParameter(){
    var localSearchParameter = window.sessionStorage.getItem('directorysearch');
    if (!localSearchParameter)
      return;

    this.searchParameter = JSON.parse(localSearchParameter);
  }

  storeSearchParameter(){
    var localSearchParameter = JSON.stringify(this.searchParameter);
    window.sessionStorage.setItem('directorysearch', localSearchParameter);
  }

  // loadQueryString(){
  //   var pairs = location.search.slice(1).split('&');
    
  //   for (let i = 0; i < pairs.length ; i++)
  //   {
  //     var pair = pairs[i].split('=');
  //     if (pair && pair.length === 2)
  //       this.searchParameter[pair[0]] = decodeURIComponent(pair[1] || '');
  //   }  
  // }

  // generateQueryString(){    
  //   let params = new URLSearchParams();
  //   for(let key in this.searchParameter){
  //       params.set(key, encodeURIComponent(this.searchParameter[key])) 
  //   }
    
  //   location.search = '';
  //   this.location.go(this.location.path() + '?' +params.toString());
  //   console.log(params.toString());
  // }
}
