import { Component, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { bkNavigationService } from './navigation.service';
import { Subscription } from 'rxjs';

@Component({
    selector     : 'bk-navigation',
    templateUrl  : './navigation.component.html',
    styleUrls    : ['./navigation.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class bkNavigationComponent implements OnDestroy
{
    navigationModel: any[];
    navigationModelChangeSubscription: Subscription;

    @Input('layout') layout = 'vertical';

    constructor(private bkNavigationService: bkNavigationService)
    {
        this.navigationModelChangeSubscription =
            this.bkNavigationService.onNavigationModelChange
                .subscribe((navigationModel) => {
                    this.navigationModel = navigationModel;
                });
    }

    ngOnDestroy()
    {
        this.navigationModelChangeSubscription.unsubscribe();
    }

}
