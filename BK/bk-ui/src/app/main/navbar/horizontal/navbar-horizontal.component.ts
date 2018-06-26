import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { bkMainComponent } from '../../main.component';

@Component({
    selector     : 'bk-navbar-horizontal',
    templateUrl  : './navbar-horizontal.component.html',
    styleUrls    : ['./navbar-horizontal.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class bkNavbarHorizontalComponent implements OnInit, OnDestroy
{
    constructor(private bkMainComponent: bkMainComponent)
    {
    }

    ngOnInit()
    {
        this.bkMainComponent.addClass('bk-nav-bar-horizontal');
    }

    ngOnDestroy()
    {
        this.bkMainComponent.removeClass('bk-nav-bar-horizontal');
    }
}
