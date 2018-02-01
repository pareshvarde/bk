import { Injectable } from '@angular/core';
import { Http, Response, Headers  } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { error } from 'selenium-webdriver';
import { changePasswordViewModel } from '../content/change-password/change-password.component';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { RegisterModel } from '../models/registerModel';
import { MemberModel } from '../models/memberModel';
import { FamilyModel } from '../models/familyModel';
import { AuthHttp } from 'angular2-jwt';
import { MemberSearchBasicModel } from '../models/memberSearchBasicModel';

@Injectable()
export class bkDataService {
  private API_URL = "http://localhost:60067/api/";
  @BlockUI() blockUI: NgBlockUI;

  constructor(private http: Http, public authHttp: AuthHttp) { }

  login(userName: string, password: string): Observable<any> {
    
    this.blockUI.start("Please wait...");

    return this.http.post(this.API_URL + "login", "username=" + userName + "&password=" + password + "&grant_type=password").map(response => {    
      this.blockUI.stop();
      return response;
    }).catch((error: any) => this.handleAPIError(error));      
  };

  sendResetPasswordEmail(emailAddress: string) {

    this.blockUI.start("Please wait...");

    return this.http.get(this.API_URL + "sendResetPasswordEmail?emailAddress=" + emailAddress).map((res) => {
      return this.handleAPIResponse(res);
    }).catch((error: any) => this.handleAPIError(error));
  };

  resetPassword(password: string, token: string)
  {
    this.blockUI.start("Please wait...");

    return this.http.get(this.API_URL + "resetPassword?password=" + password + "&token=" + token).map((res)=>{
      return this.handleAPIResponse(res);
    }).catch((error : any) => this.handleAPIError(error));
  }

  changePassword(model: changePasswordViewModel)
  { 
    this.blockUI.start("Please wait...");
           
    return this.authHttp.post(this.API_URL + "/member/changePassword", model).map((res) =>{
      return this.handleAPIResponse(res);
    }).catch((error : any) => this.handleAPIError(error));
  }

  register(model: RegisterModel)
  {
    this.blockUI.start("Please wait...");
           
    return this.http.post(this.API_URL + "register", model,{headers: this.getPublicHeader()}).map((res) =>{
      return this.handleAPIResponse(res);
    }).catch((error : any) => this.handleAPIError(error));
  }

  basicSearchMember(model: MemberSearchBasicModel){
    this.blockUI.start("Please wait...");
           
    return this.authHttp.post(this.API_URL + "member/basicsearch", model).map((res) =>{
      return this.handleAPIResponse(res);
    }).catch((error : any) => this.handleAPIError(error));
  }

  addMemberToFamily(familyId: number, memberId:number, relatedId: number, relationTypeId: number)
  {
    this.blockUI.start("Please wait...");

    var url = this.API_URL + "/member/addtofamily?familyId=" + familyId + "&memberId=" + memberId + "&relatedId=" + relatedId + "&relationTypeId=" + relationTypeId;
    
    return this.authHttp.get(url).map((res)=>{
      return this.handleAPIResponse(res);
    }).catch((error : any) => this.handleAPIError(error));
  }

  getMember(memberId: number, familyId: number){
    this.blockUI.start("Please wait...");

    return this.authHttp.get(this.API_URL + "/member?memberId=" + memberId + "&familyId=" + familyId).map((res)=>{
      return this.handleAPIResponse(res);
    }).catch((error : any) => this.handleAPIError(error));
  }

  saveMember(model: MemberModel){
    this.blockUI.start("Please wait...");
           
    return this.authHttp.post(this.API_URL + "member/save", model).map((res) =>{
      return this.handleAPIResponse(res);
    }).catch((error : any) => this.handleAPIError(error));
  }

  deleteMember(familyId: number, memberId: number)
  {
    this.blockUI.start("Please wait...");

    return this.authHttp.get(this.API_URL + "/member/delete?familyId=" + familyId + "&memberId=" + memberId).map((res)=>{
      return this.handleAPIResponse(res);
    }).catch((error : any) => this.handleAPIError(error));
  }

  saveFamily(model: FamilyModel){
    this.blockUI.start("Please wait...");
           
    return this.authHttp.post(this.API_URL + "family/save", model).map((res) =>{
      return this.handleAPIResponse(res);
    }).catch((error : any) => this.handleAPIError(error));
  }

  deleteFamily(model: FamilyModel){
    this.blockUI.start("Please wait...");
           
    return this.authHttp.post(this.API_URL + "family/delete", model).map((res) =>{
      return this.handleAPIResponse(res);
    }).catch((error : any) => this.handleAPIError(error));
  }

  getFamilyLookup(memberId: number)
  {
    this.blockUI.start("Please wait...");
               
    return this.authHttp.get(this.API_URL + "family/lookup?memberId=" + memberId).map((res) =>{
      return this.handleAPIResponse(res);
    }).catch((error : any) => this.handleAPIError(error));
  }

  getFamilyDetail(familyId: number)
  {
    this.blockUI.start("Please wait...");
               
    return this.authHttp.get(this.API_URL + "family?familyId=" + familyId).map((res) =>{
      return this.handleAPIResponse(res);
    }).catch((error : any) => this.handleAPIError(error));
  }

  approveMember(memberId: number, familyId: number){
    this.blockUI.start("Please wait...");
               
    return this.authHttp.get(this.API_URL + "member/approve?memberId=" + memberId + "&familyId=" + familyId).map((res) =>{
      return this.handleAPIResponse(res);
    }).catch((error : any) => this.handleAPIError(error));
  }

  declineMember(memberId: number, familyId: number){
    this.blockUI.start("Please wait...");
               
    return this.authHttp.get(this.API_URL + "member/decline?memberId=" + memberId + "&familyId=" + familyId).map((res) =>{
      return this.handleAPIResponse(res);
    }).catch((error : any) => this.handleAPIError(error));
  }

  private getPublicHeader(): Headers{    
    const headers = new Headers(
      {
        'Content-Type': 'application/json'        
      }
    );

    return headers;
  }

  private handleAPIResponse(response: any) {    
    this.blockUI.stop();
    return JSON.parse(response._body);
  }

  private handleAPIError(error: any): any {         
    this.blockUI.stop();

    if (error.message)    
      return Observable.throw(error.message);
    else
      return Observable.throw(JSON.parse(error._body));
  };
}
