import { MemberModel } from "./memberModel";

export class FamilyModel{    
    familyId: number;
    nukhId: number;
    categoryId: number;
    address1: string;
    address2: string;
    city: string;
    state: string;
    postalcode: string;
    country: string;    
    members: FamilyMemberModel[];
}

export class FamilyMemberModel{
    memberId: number;
    name: string;    
    dob: Date;
    married: boolean;
    hof: boolean;
    relation: string;
}