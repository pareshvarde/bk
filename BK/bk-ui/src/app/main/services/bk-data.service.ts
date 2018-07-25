import { throwError as observableThrowError,  Observable } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, Headers  } from '@angular/http';
import { HttpClient } from '@angular/common/http'
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { error } from 'selenium-webdriver';
import { changePasswordViewModel } from '../content/change-password/change-password.component';
import { RegisterModel } from '../models/registerModel';
import { MemberModel } from '../models/memberModel';
import { FamilyModel } from '../models/familyModel';
import { MemberSearchBasicModel } from '../models/memberSearchBasicModel';
import { MatrimonyModel } from '../models/matrimonyModel';
import { MemberSearchParameter } from '../models/memberSearchParameter';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { MatrimonySearchParameter } from '../models/matrimonySearchParameter';

@Injectable()
export class bkDataService {
  private API_URL = "/api/";
  @BlockUI() blockUI: NgBlockUI;
  
  constructor(private http: Http, public authHttp: HttpClient) { }

  login(userName: string, password: string): Observable<any> {
    
    this.blockUI.start("Please wait...");

    return this.http.post(this.API_URL + "login", "username=" + userName + "&password=" + password + "&grant_type=password").pipe(map(response => {    
      this.blockUI.stop();
      return response;
    }),catchError((error: any) => this.handleAPIError(error)),);      
  };

  sendResetPasswordEmail(emailAddress: string) {

    this.blockUI.start("Please wait...");

    return this.http.get(this.API_URL + "sendResetPasswordEmail?emailAddress=" + emailAddress).pipe(map((res) => {
      return this.handleAPIResponse(res);
    }),catchError((error: any) => this.handleAPIError(error)),);
  };

  resetPassword(password: string, token: string)
  {
    this.blockUI.start("Please wait...");

    return this.http.get(this.API_URL + "resetPassword?password=" + password + "&token=" + token).pipe(map((res)=>{
      return this.handleAPIResponse(res);
    }),catchError((error : any) => this.handleAPIError(error)),);
  }

  changePassword(model: changePasswordViewModel)
  { 
    this.blockUI.start("Please wait...");    
           
    return this.authHttp.post(this.API_URL + "/member/changePassword", model).pipe(map((res) =>{
      return this.handleAPIResponse(res);
    }),catchError((error : any) => this.handleAPIError(error)),);
  }

  register(model: RegisterModel)
  {
    this.blockUI.start("Please wait...");
           
    return this.http.post(this.API_URL + "register", model,{headers: this.getPublicHeader()}).pipe(map((res) =>{
      return this.handleAPIResponse(res);
    }),catchError((error : any) => this.handleAPIError(error)),);
  }

  basicSearchMember(model: MemberSearchBasicModel){
    this.blockUI.start("Please wait...");
           
    return this.authHttp.post(this.API_URL + "member/basicsearch", model).pipe(map((res) =>{
      return this.handleAPIResponse(res);
    }),catchError((error : any) => this.handleAPIError(error)),);
  }

  addMemberToFamily(familyId: number, memberId:number, relatedId: number, relationTypeId: number)
  {
    this.blockUI.start("Please wait...");

    var url = this.API_URL + "/member/addtofamily?familyId=" + familyId + "&memberId=" + memberId + "&relatedId=" + relatedId + "&relationTypeId=" + relationTypeId;
    
    return this.authHttp.get(url).pipe(map((res) =>{
      return this.handleAPIResponse(res);
    }),catchError((error : any) => this.handleAPIError(error)),);
  }

  getMember(memberId: number, familyId: number){
    this.blockUI.start("Please wait...");

    return this.authHttp.get(this.API_URL + "/member?memberId=" + memberId + "&familyId=" + familyId).pipe(map((res) =>{
      return this.handleAPIResponse(res);
    }),catchError((error : any) => this.handleAPIError(error)),);
  }

  saveMember(model: MemberModel){
    this.blockUI.start("Please wait...");
           
    return this.authHttp.post(this.API_URL + "member/save", model).pipe(map((res) =>{
      return this.handleAPIResponse(res);
    }),catchError((error : any) => this.handleAPIError(error)),);
  }

  uploadProfilePhoto(model: any) {
    this.blockUI.start("Please wait...");
           
    return this.authHttp.post(this.API_URL + "member/uploadPhoto", model).pipe(map((res) =>{
      return this.handleAPIResponse(res);
    }),catchError((error : any) => this.handleAPIError(error)),);
  }

  uploadMatrimonyPhoto(model: any) {
    this.blockUI.start("Please wait...");
           
    return this.authHttp.post(this.API_URL + "matrimony/uploadPhoto", model).pipe(map((res) =>{
      return this.handleAPIResponse(res);
    }),catchError((error : any) => this.handleAPIError(error)),);
  }

  profilePhoto() {
    this.blockUI.start("Please wait...");
           
    return this.authHttp.get(this.API_URL + "member/profilePhoto").pipe(map((res) =>{
      return this.handleAPIResponse(res);
    }),catchError((error : any) => this.handleAPIError(error)),);
  }

  searchMember(model: MemberSearchParameter){
    this.blockUI.start("Please wait...");

    return this.authHttp.post(this.API_URL + "member/search", model).pipe(map((res) =>{
      return this.handleAPIResponse(res);
    }),catchError((error : any) => this.handleAPIError(error)),);
  }

  deleteMember(familyId: number, memberId: number)
  {
    this.blockUI.start("Please wait...");

    return this.authHttp.get(this.API_URL + "/member/delete?familyId=" + familyId + "&memberId=" + memberId).pipe(map((res) =>{
      return this.handleAPIResponse(res);
    }),catchError((error : any) => this.handleAPIError(error)),);
  }

  saveFamily(model: FamilyModel){
    this.blockUI.start("Please wait...");
           
    return this.authHttp.post(this.API_URL + "family/save", model).pipe(map((res) =>{
      return this.handleAPIResponse(res);
    }),catchError((error : any) => this.handleAPIError(error)),);
  }

  forkFamily(model: FamilyModel){
    this.blockUI.start("Please wait...");
           
    return this.authHttp.post(this.API_URL + "family/fork", model).pipe(map((res) =>{
      return this.handleAPIResponse(res);
    }),catchError((error : any) => this.handleAPIError(error)),);
  }  

  deleteFamily(model: FamilyModel){
    this.blockUI.start("Please wait...");
           
    return this.authHttp.post(this.API_URL + "family/delete", model).pipe(map((res) =>{
      return this.handleAPIResponse(res);
    }),catchError((error : any) => this.handleAPIError(error)),);
  }
 
  getFamilyLookup(memberId: number)
  {
    this.blockUI.start("Please wait...");
               
    return this.authHttp.get(this.API_URL + "family/lookup?memberId=" + memberId).pipe(map((res) =>{
      return this.handleAPIResponse(res);
    }),catchError((error : any) => this.handleAPIError(error)),);
  }

  getDefaultFamily(memberId: number){
    this.blockUI.start("Please wait...");
               
    return this.authHttp.get(this.API_URL + "member/defaultfamily?memberId=" + memberId).pipe(map((res) =>{
      return this.handleAPIResponse(res);
    }),catchError((error : any) => this.handleAPIError(error)),);
  }

  getFamilyDetail(familyId: number)
  {
    this.blockUI.start("Please wait...");
               
    return this.authHttp.get(this.API_URL + "family?familyId=" + familyId).pipe(map((res) =>{
      return this.handleAPIResponse(res);
    }),catchError((error : any) => this.handleAPIError(error)),);
  }
  
  approveMember(memberId: number, familyId: number){
    this.blockUI.start("Please wait...");
               
    return this.authHttp.get(this.API_URL + "member/approve?memberId=" + memberId + "&familyId=" + familyId).pipe(map((res) =>{
      return this.handleAPIResponse(res);
    }),catchError((error : any) => this.handleAPIError(error)),);
  }

  declineMember(memberId: number, familyId: number){
    this.blockUI.start("Please wait...");
               
    return this.authHttp.get(this.API_URL + "member/decline?memberId=" + memberId + "&familyId=" + familyId).pipe(map((res) =>{
      return this.handleAPIResponse(res);
    }),catchError((error : any) => this.handleAPIError(error)),);
  }

  markDefaultFamily(familyId: number, memberId: number){
    this.blockUI.start("Please wait...");
               
    return this.authHttp.get(this.API_URL + "member/markDefaultFamily?familyId=" + familyId + "&memberId=" + memberId).pipe(map((res) =>{
      return this.handleAPIResponse(res);
    }),catchError((error : any) => this.handleAPIError(error)),);
  }

  getMatrimony(memberId:number){
    this.blockUI.start("Please wait...");
               
    return this.authHttp.get(this.API_URL + "matrimony?memberId=" + memberId).pipe(map((res) =>{
      return this.handleAPIResponse(res);
    }),catchError((error : any) => this.handleAPIError(error)),);
  }

  getViewOnlyMatrimony(memberId:number){
    this.blockUI.start("Please wait...");
               
    return this.authHttp.get(this.API_URL + "matrimony-view?memberId=" + memberId).pipe(map((res) =>{
      return this.handleAPIResponse(res);
    }),catchError((error : any) => this.handleAPIError(error)),);
  }

  saveMatrimony(model: MatrimonyModel){
    this.blockUI.start("Please wait...");
           
    return this.authHttp.post(this.API_URL + "matrimony/save", model).pipe(map((res) =>{
      return this.handleAPIResponse(res);
    }),catchError((error : any) => this.handleAPIError(error)),);
  }

  searchMatrimony(model: MatrimonySearchParameter){
    this.blockUI.start("Please wait...");

    return this.authHttp.post(this.API_URL + "matrimony/search", model).pipe(map((res) =>{
      return this.handleAPIResponse(res);
    }),catchError((error : any) => this.handleAPIError(error)),);
  }
  
  deleteMatrimony(memberId: number)
  {
    this.blockUI.start("Please wait...");

    return this.authHttp.get(this.API_URL + "/matrimony/delete?memberId=" + memberId).pipe(map((res) =>{
      return this.handleAPIResponse(res);
    }),catchError((error : any) => this.handleAPIError(error)),);
  }

  submitFeedback(model: any){
    this.blockUI.start("Please wait...");

    return this.http.post(this.API_URL + "feedback", model).pipe(map((res) =>{
      return this.handleAPIResponse(res);
    }),catchError((error : any) => this.handleAPIError(error)),);
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
    return response;    
  }

  private handleAPIError(error: any): any {         
   this.blockUI.stop();
    if (error.error && error.error.errors && error.error.errors.length > 0)
      return observableThrowError(error.error.errors[0]);
    if (error.message)    
      return observableThrowError(error.message);
    else
      return observableThrowError(JSON.parse(error._body));
  };
}
