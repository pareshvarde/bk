import { Injectable } from '@angular/core';
import { CategoryLookupModel } from '../models/categoryLookupModel';

@Injectable()
export class CategoryData
{
    public data: CategoryLookupModel[] = [
        {id:1, category: 'Gujarati'},
        {id:2, category: 'Halai'},       
        {id:3, category: 'Kachchhi'},    
        {id:4, category: 'Maharashtrian'},       
        {id:5, category: 'Marwari'},
        {id:6, category: 'Punjabi'},
        {id:7, category: 'Sindhi'},                                        
        {id:8, category: 'Sorathia'},       
    ];    
}
