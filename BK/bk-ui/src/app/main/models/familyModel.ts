import { MemberModel } from "./memberModel";
import { PendingApproval } from "./pendingApproval";

export class FamilyModel{    

    constructor(){
        this.members = new Array<FamilyMemberModel>();
        this.approvals = new Array<PendingApproval>();
    }

    familyId: number;
    nukhId: number;
    categoryId: number;
    familyNative: string;
    address1: string;
    address2: string;
    city: string;
    district: string;
    state: string;
    postalcode: string;
    country: string; 
    hofId: number;   
    canEdit: boolean;
    hofFirstName: string;
    hofLastName: string;
    members: FamilyMemberModel[];
    approvals: PendingApproval[]
}

export class FamilyMemberModel{
    selected: boolean;
    memberId: number;
    name: string;    
    dob: Date;
    married: boolean;    
    relation: string;
    canEdit: boolean;
    gender: boolean;
    alive: boolean;
    relatedToId: number;
    relationTypeId: number;
    paternalFamilyId: number;
    paternalFamilyName: string;    
    matrimonialExists: boolean;
    age: number;
}