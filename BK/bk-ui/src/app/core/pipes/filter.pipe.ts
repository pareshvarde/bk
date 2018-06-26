import { Pipe, PipeTransform } from '@angular/core';
import { bkUtils } from '../bkUtils';

@Pipe({name: 'filter'})
export class FilterPipe implements PipeTransform
{
    transform(mainArr: any[], searchText: string, property: string): any
    {
        return bkUtils.filterArrayByString(mainArr, searchText);
    }
}
