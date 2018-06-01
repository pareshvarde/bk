import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Input} from "@angular/core";
import { MemberSearchResult } from '../../models/memberSearchResult';
import { MemberSearchParameter } from '../../models/memberSearchParameter';
import { bkDataService } from '../../services/bk-data.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {

  results: MemberSearchResult[]=[];
  searchParameter: MemberSearchParameter;
  page: number = 1;

  constructor(private dataService: bkDataService, private alertService: NotificationsService) { 
    this.searchParameter = new MemberSearchParameter();    
  }
      
  ngOnInit() {
    this.search(this.searchParameter);
  }

  search(searchParameter: MemberSearchParameter){

    this.results = [];
    this.searchParameter = searchParameter;
    this.performSearch();    
  }

  performSearch(){
            
    this.dataService.searchMember(this.searchParameter).subscribe(
      (res) => {        
        res.result.forEach(element => {
          this.results.push(element);
        });         
      },
      (err) => {
        if (err.errors)
          this.alertService.error('', err.errors[0]);
        else
          this.alertService.error('', err);
      }
    );
  }

  clear(searchParameter: MemberSearchParameter){    
      this.results = [];     
      this.search(searchParameter);
  }
}
