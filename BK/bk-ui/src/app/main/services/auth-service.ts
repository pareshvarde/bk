import { tokenNotExpired } from 'angular2-jwt';
import { Injectable } from '@angular/core';

@Injectable()
export class bkAuthService {

  constructor() { }

  authenticated() : boolean{
    return tokenNotExpired();
  }
}
