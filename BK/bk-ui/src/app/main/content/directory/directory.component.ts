import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Input} from "@angular/core";
import { SearchParameter } from '../../models/searchParameter';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {

  constructor() { 
    this.searchParameter = new SearchParameter();
  }

  searchParameter: SearchParameter;
  meals: any[];
  page: number = 1;

  ngOnInit() {

    this.meals = new Array<any>();

    this.meals.push(135);
    this.meals.push(154);
    this.meals.push(134657);
    this.meals.push(156634);
    this.meals.push(107807);
    this.meals.push(1906756);
    this.meals.push(1565464);
    this.meals.push(134747);
    this.meals.push(186856);
    this.meals.push(1354367);
    this.meals.push(1784563);
    this.meals.push(147547);
    this.meals.push(1363);
    this.meals.push(17547);
    this.meals.push(157474);
    this.meals.push(136346);
    this.meals.push(13634);
    this.meals.push(13636);
    this.meals.push(14575);
    this.meals.push(16856);
    this.meals.push(1658);
    this.meals.push(1868);
    this.meals.push(156856);
    this.meals.push(185686);
    this.meals.push(1856);
    this.meals.push(158568);
    this.meals.push(1558);
    this.meals.push(13463);
    this.meals.push(1848);
    this.meals.push(18686);
    this.meals.push(16858);
    this.meals.push(165956);
    this.meals.push(19595);
    this.meals.push(1956895);
    this.meals.push(158956);
    this.meals.push(1595);
  }
}
