import { Component } from '@angular/core';
import { bkSplashScreenService } from './core/services/splash-screen.service';
import { TranslateService } from '@ngx-translate/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
    selector   : 'bk-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.css']
})
export class AppComponent
{
    @BlockUI() blockUI: NgBlockUI;    

    constructor(
        private bkSplashScreen: bkSplashScreenService,
        private translate: TranslateService
    )
    {
        // Add languages
        this.translate.addLangs(['en', 'tr']);

        // Set the default language
        this.translate.setDefaultLang('en');

        // Use a language
        this.translate.use('en');
    }
}
