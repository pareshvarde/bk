import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector     : 'bk-quick-panel',
    templateUrl  : './quick-panel.component.html',
    styleUrls    : ['./quick-panel.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class bkQuickPanelComponent implements OnInit
{
    date: Date;
    settings: any;
    notes = [];
    events = [];

    constructor()
    {
        this.date = new Date();
        this.settings = {
            notify: true,
            cloud : false,
            retro : true
        };

    }

    ngOnInit()
    {

    }

}
