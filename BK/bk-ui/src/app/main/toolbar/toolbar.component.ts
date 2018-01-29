import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { FuseConfigService } from '../../core/services/config.service';
import { TranslateService } from '@ngx-translate/core';
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
    userStatusOptions: any[];
    languages: any;
    selectedLanguage: any;
    showLoadingBar: boolean;
    horizontalNav: boolean;

    constructor(
        private router: Router,
        private fuseConfig: FuseConfigService,
        private translate: TranslateService,
        private alertService: NotificationsService,
        public authService: bkAuthService        
    )
    {
        this.languages = [
            {
                'id'   : 'en',
                'title': 'English',
                'flag' : 'us'
            }            
        ];

        this.selectedLanguage = this.languages[0];

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

        this.fuseConfig.onSettingsChanged.subscribe((settings) => {
            this.horizontalNav = settings.layout.navigation === 'top';
        });

    }

    search(value)
    {
        // Do your search here...
        console.log(value);
    }

    setLanguage(lang)
    {
        // Set the selected language for toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this.translate.use(lang.id);
    }

    logout()
    {
        let localStorage = window.localStorage;
        localStorage.removeItem('token');
        this.router.navigate(['home']);  
        this.alertService.success("You have been logged out from secure portal");      
    }

    loadFamily(){
        this.router.navigate(['family/0']);    
    }

    loadProfile(){
        this.router.navigate(['member/0/' + this.authService.memberId()]);    
    }
}
