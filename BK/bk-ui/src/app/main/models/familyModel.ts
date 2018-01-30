import { MemberModel } from "./memberModel";

export class FamilyModel{    

    constructor(){
        this.members = new Array<FamilyMemberModel>();
    }

    familyId: number;
    nukhId: number;
    categoryId: number;
    address1: string;
    address2: string;
    city: string;
    state: string;
    postalcode: string;
    country: string; 
    hofId: number;   
    canEdit: boolean;
    hofFirstName: string;
    hofLastName: string;
    members: FamilyMemberModel[];
}

export class FamilyMemberModel{
    memberId: number;
    name: string;    
    dob: Date;
    married: boolean;    
    relation: string;
    canEdit: boolean;
}