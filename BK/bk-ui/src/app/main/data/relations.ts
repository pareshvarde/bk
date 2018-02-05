import { Injectable } from '@angular/core';
import { RelationTypeLookupModel } from '../models/relationTypeLookupModel';

@Injectable()
export class RelationTypeData
{
    public data: RelationTypeLookupModel[] = [
        {relationTypeId:1, relationType:'Son Of', male: true},
        {relationTypeId:2, relationType:'Grandson Of', male: true},
        {relationTypeId:3, relationType:'Great Grandson Of', male: true},
        {relationTypeId:4, relationType:'Daughter Of', male: false},
        {relationTypeId:5, relationType:'Granddaughter Of', male: false},
        {relationTypeId:6, relationType:'Great Granddaughter Of', male: false},
        {relationTypeId:7, relationType:'Wife Of', male: false}
    ];    
}
