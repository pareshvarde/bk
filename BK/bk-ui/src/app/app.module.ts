import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes, UrlSerializer } from '@angular/router';
import 'hammerjs';
import { SharedModule } from './core/modules/shared.module';
import { AppComponent } from './app.component';
import { bkMainModule } from './main/main.module';
import { bkSplashScreenService } from './core/services/splash-screen.service';
import { bkConfigService } from './core/services/config.service';
import { bkNavigationService } from './core/components/navigation/navigation.service';
import { TranslateModule } from '@ngx-translate/core';
import { bkRoutes } from './app.routes'
import { LowerCaseUrlSerializer } from './lowerCaseUrlSerializer';
import { MAT_DATE_LOCALE } from '@angular/material';
import { bkAuthService } from './main/services/auth-service';
import { AuthGuard, LoggedInGuard } from './main/guards/auth-guard';
import { GlobalService } from './main/services/global-service';
import { ConfirmationService } from '@jaspero/ng-confirmations';
import { bkDataService } from './main/services/bk-data.service';
import { NgxUiLoaderModule } from  'ngx-ui-loader';

@NgModule({
    declarations: [
        AppComponent        
    ],
    imports     : [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(bkRoutes),
        SharedModule,
        TranslateModule.forRoot(),
        bkMainModule,        
        NgxUiLoaderModule
    ],
    providers   : [
        bkSplashScreenService,
        bkConfigService,
        bkNavigationService,
        {
            provide: UrlSerializer,
            useClass: LowerCaseUrlSerializer
        },
        {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
        bkAuthService,
        bkDataService,
        AuthGuard,
        GlobalService,
        LoggedInGuard,
        ConfirmationService
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
