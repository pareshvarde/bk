import { Component, HostBinding, HostListener, Input, OnDestroy } from '@angular/core';
import { bkAnimations } from '../../../../animations';
import { bkConfigService } from '../../../../services/config.service';
import { Subscription } from 'rxjs';

@Component({
    selector   : 'bk-nav-horizontal-collapse',
    templateUrl: './nav-horizontal-collapse.component.html',
    styleUrls  : ['./nav-horizontal-collapse.component.scss'],
    animations : bkAnimations
})
export class bkNavHorizontalCollapseComponent implements OnDestroy
{
    onSettingsChanged: Subscription;
    bkSettings: any;
    isOpen = false;

    @HostBinding('class') classes = 'nav-item nav-collapse';
    @Input() item: any;

    @HostListener('mouseenter')
    open()
    {
        this.isOpen = true;
    }

    @HostListener('mouseleave')
    close()
    {
        this.isOpen = false;
    }

    constructor(
        private config: bkConfigService
    )
    {
        this.onSettingsChanged =
            this.config.onSettingsChanged
                .subscribe(
                    (newSettings) => {
                        this.bkSettings = newSettings;
                    }
                );
    }

    ngOnDestroy()
    {
        this.onSettingsChanged.unsubscribe();
    }
}
