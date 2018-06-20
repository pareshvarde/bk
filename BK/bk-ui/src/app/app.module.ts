import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes, UrlSerializer } from '@angular/router';
import 'hammerjs';
import { SharedModule } from './core/modules/shared.module';
import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { FuseSplashScreenService } from './core/services/splash-screen.service';
import { FuseConfigService } from './core/services/config.service';
import { FuseNavigationService } from './core/components/navigation/navigation.service';
import { TranslateModule } from '@ngx-translate/core';
import { bkRoutes } from './app.routes'
import { BlockUIModule } from 'ng-block-ui';
import { LowerCaseUrlSerializer } from './lowerCaseUrlSerializer';
import { MAT_DATE_LOCALE } from '@angular/material';
import { bkAuthService } from './main/services/auth-service';
import { AuthGuard, LoggedInGuard } from './main/guards/auth-guard';

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
        FuseMainModule,
        BlockUIModule.forRoot()
    ],
    providers   : [
        FuseSplashScreenService,
        FuseConfigService,
        FuseNavigationService,
        {
            provide: UrlSerializer,
            useClass: LowerCaseUrlSerializer
        },
        {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
        bkAuthService,
        AuthGuard,
        LoggedInGuard
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
