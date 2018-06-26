import { Directive, HostListener, Input } from '@angular/core';
import { bkNavbarVerticalService } from './navbar-vertical.service';
import { bkNavbarVerticalComponent } from './navbar-vertical.component';

@Directive({
    selector: '[bkNavbarVertical]'
})
export class bkNavbarVerticalToggleDirective
{
    @Input() bkNavbarVertical: string;
    navbar: bkNavbarVerticalComponent;

    constructor(private navbarService: bkNavbarVerticalService)
    {
    }

    @HostListener('click')
    onClick()
    {
        this.navbar = this.navbarService.getNavBar();

        if ( !this.navbar[this.bkNavbarVertical] )
        {
            return;
        }

        this.navbar[this.bkNavbarVertical]();
    }
}
