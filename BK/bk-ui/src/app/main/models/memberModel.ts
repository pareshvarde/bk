export class MemberModel {
    memberId: number;
    firstName: string;
    lastName: string;
    nickName: string;
    email: string;
    phoneNumber: number;
    aadhaarNumber: number;        
    gender: string;
    dob: Date;
    birthPlace: string;
    alive: boolean;
    dod:Date;
    deathPlace: string;
    married: boolean;
    educationLevel: string;
    educationField: string;
    companyName: string;
    jobTitle: string;
    instagramHandle: string;
    facebookHandle: string;
    twitterHandle: string;
    relationTypeId:number;
    relatedMemberId: number;
    familyId: number;
    matrimonialId: number;
    canEdit: boolean;

    constructor() { }
}