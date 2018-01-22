import { Injectable } from '@angular/core';

export class CategoryModel {
    id: number;
    category: string;

    constructor() { }
}

@Injectable()
export class CategoryData
{
    data: CategoryModel[] = [
        {id:1, category: 'Gujarati'},
        {id:2, category: 'Marwari'},
        {id:3, category: 'Punjabi'},
        {id:4, category: 'Sindhi'},             
    ];
    
}
