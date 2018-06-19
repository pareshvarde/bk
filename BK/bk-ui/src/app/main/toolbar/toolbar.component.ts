import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { bkAuthService } from '../services/auth-service';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector   : 'fuse-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls  : ['./toolbar.component.scss'],
    providers: [bkAuthService]    
})

export class FuseToolbarComponent
{    
    languages: any;    
    showLoadingBar: boolean;    

    constructor(
        private router: Router,                
        private alertService: NotificationsService,
        public authService: bkAuthService
    )
    {       
        router.events.subscribe(
            (event) => {
                if ( event instanceof NavigationStart )
                {
                    this.showLoadingBar = true;
                }
                if ( event instanceof NavigationEnd )
                {
                    this.showLoadingBar = false;
                }
            });      
    }
  
    logout()
    {
        this.authService.logout();
        this.alertService.success("You have been logged out from secure portal");      
    }
}
