import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';
import { SharedModule } from './core/modules/shared.module';
import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { FuseSplashScreenService } from './core/services/splash-screen.service';
import { FuseConfigService } from './core/services/config.service';
import { FuseNavigationService } from './core/components/navigation/navigation.service';
import { TranslateModule } from '@ngx-translate/core';
import { HomeComponent } from './main/content/home/home.component';
import { OriginComponent } from './main/content/origin/origin.component';
import { NukhComponent } from './main/content/nukh/nukh.component';
import { GotraComponent } from './main/content/gotra/gotra.component';
import { HostelComponent } from './main/content/hostel/hostel.component';
import { OrganizationComponent } from './main/content/organization/organization.component';
import { TempleComponent } from './main/content/temple/temple.component';
import { LoginComponent } from './main/content/login/login.component';
import { ResetPasswordComponent } from './main/content/resetPassword/resetPassword.component';

const appRoutes: Routes = [
    {
        path : "origin",
        component: OriginComponent
    },
    {
        path: "nukhs",
        component: NukhComponent
    },
    {
        path: "gotras",
        component: GotraComponent
    },
    {
        path: "hostels",
        component: HostelComponent
    },
    {
        path: "organizations",
        component: OrganizationComponent
    },
    {
        path: "temples",
        component: TempleComponent
    },
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "resetPassword",
        component: ResetPasswordComponent
    },
    {
        path      : '**',
        component : HomeComponent        
    }    
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, { useHash: true }),
        SharedModule,
        TranslateModule.forRoot(),
        FuseMainModule        
    ],
    providers   : [
        FuseSplashScreenService,
        FuseConfigService,
        FuseNavigationService        
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
