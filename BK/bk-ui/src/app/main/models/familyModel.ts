import { MemberModel } from "./memberModel";

export class FamilyModel{
    headOfFamily: string;
    familyId: number;
    nukhId: number;
    categoryId: number;
    address1: string;
    address2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;    
    members: MemberModel[];
}