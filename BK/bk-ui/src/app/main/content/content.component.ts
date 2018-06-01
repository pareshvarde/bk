
import {map, filter} from 'rxjs/operators';
import { Component, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { fuseAnimations } from '../../core/animations';
import { FuseConfigService } from '../../core/services/config.service';
import { Subscription } from 'rxjs';
import { Platform } from '@angular/cdk/platform';

@Component({
    selector: 'fuse-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
    animations: fuseAnimations
})
export class FuseContentComponent implements OnInit, OnDestroy {
    onSettingsChanged: Subscription;
    fuseSettings: any;    

    public alertOptions  = {
        position: ["bottom", "right"],
        timeOut: 5000,
        lastOnBottom: true     
    }

    public confirmationOptions ={
        overlay: true,
        overlayClickToClose: false,
        showCloseButton: false,
        confirmText: 'Yes',
        declineText: 'No'
    }
    
    @HostBinding('@routerTransitionUp') routeAnimationUp = false;
    @HostBinding('@routerTransitionDown') routeAnimationDown = false;
    @HostBinding('@routerTransitionRight') routeAnimationRight = false;
    @HostBinding('@routerTransitionLeft') routeAnimationLeft = false;
    @HostBinding('@routerTransitionFade') routeAnimationFade = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private fuseConfig: FuseConfigService,
        private platform: Platform
    ) {
        this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
            map(() => this.activatedRoute),)
            .subscribe((event) => {
                switch (this.fuseSettings.routerAnimation) {
                    case 'fadeIn':
                        this.routeAnimationFade = !this.routeAnimationFade;
                        break;
                    case 'slideUp':
                        this.routeAnimationUp = !this.routeAnimationUp;
                        break;
                    case 'slideDown':
                        this.routeAnimationDown = !this.routeAnimationDown;
                        break;
                    case 'slideRight':
                        this.routeAnimationRight = !this.routeAnimationRight;
                        break;
                    case 'slideLeft':
                        this.routeAnimationLeft = !this.routeAnimationLeft;
                        break;
                }
            });

        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                const contentContainer = document.querySelector('.mainContent');
                contentContainer.scrollTo(0, 0);
            });

        this.onSettingsChanged =
            this.fuseConfig.onSettingsChanged
                .subscribe(
                (newSettings) => {
                    this.fuseSettings = newSettings;
                }
                );
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        this.onSettingsChanged.unsubscribe();
    }

    isMobile(): boolean {
        return this.platform.ANDROID || this.platform.IOS;
    }   
}
