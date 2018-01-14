import { Injectable } from '@angular/core';

@Injectable()
export class bkSharedService {

  constructor() { }

  authenticated() : boolean{

    let localStorage = window.localStorage;

    if (localStorage.getItem("token"))
      return true;
    else
      return false;    
  }
}
