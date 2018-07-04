import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { bkAuthService } from '../services/auth-service';
import { NotificationsService } from 'angular2-notifications';
import { bkDataService } from '../services/bk-data.service';
import { ReplaySubject } from 'rxjs';
import { GlobalService } from '../services/global-service';

@Component({
    selector: 'bk-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']    
})

export class bkToolbarComponent implements OnDestroy {
    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
    showLoadingBar: boolean;

    constructor(
        private router: Router,
        private alertService: NotificationsService, public globalService: GlobalService,
        public authService: bkAuthService, private dataService: bkDataService
    ) {
        router.events.subscribe(
            (event) => {
                if (event instanceof NavigationStart) {
                    this.showLoadingBar = true;
                }
                if (event instanceof NavigationEnd) {
                    this.showLoadingBar = false;
                }
            });
    }

    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

    loadFamily() {
        this.dataService.getDefaultFamily(this.authService.memberId()).takeUntil(this.destroyed$).subscribe(
            (res) => {
                this.router.navigate(['family', res.result])
            },
            (err) => {
                if (err.errors)
                    this.alertService.error('', err.errors[0]);
                else
                    this.alertService.error('', err);
            }
        );
    }

    loadMember() {
        this.dataService.getDefaultFamily(this.authService.memberId()).takeUntil(this.destroyed$).subscribe(
            (res) => {
                this.router.navigate(['member', res.result, this.authService.memberId()])
            },
            (err) => {
                if (err.errors)
                    this.alertService.error('', err.errors[0]);
                else
                    this.alertService.error('', err);
            }
        );
    }

    logout() {        
        this.authService.logout();
        this.globalService.resetAvatar();
        this.alertService.success("You have been logged out from secure portal");
    }
}
