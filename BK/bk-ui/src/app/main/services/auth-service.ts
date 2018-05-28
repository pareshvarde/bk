import { Injectable } from '@angular/core';

@Injectable()
export class bkAuthService {

  constructor() { }

  authenticated() : boolean{
    return true;    
  }

  memberId() : number{    
    var token = localStorage.getItem('token');
    if (!token)
      return null;  

    return 1;    
  }

  name() : string{    
    var token = localStorage.getItem('token');
    return "Paresh";
  }
}
