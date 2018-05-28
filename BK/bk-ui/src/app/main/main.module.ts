import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'angular2-moment';
import { SharedModule } from '../core/modules/shared.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { JasperoConfirmationsModule } from '@jaspero/ng-confirmations'
import { FuseMainComponent } from './main.component';
import { FuseContentComponent } from './content/content.component';
import { FuseFooterComponent } from './footer/footer.component';
import { FuseNavbarVerticalComponent } from './navbar/vertical/navbar-vertical.component';
import { FuseToolbarComponent } from './toolbar/toolbar.component';
import { FuseNavigationModule } from '../core/components/navigation/navigation.module';
import { FuseNavbarVerticalToggleDirective } from './navbar/vertical/navbar-vertical-toggle.directive';
import { FuseNavbarHorizontalComponent } from './navbar/horizontal/navbar-horizontal.component';
import { FuseQuickPanelComponent } from './quick-panel/quick-panel.component';
import { FuseThemeOptionsComponent } from '../core/components/theme-options/theme-options.component';
import { FuseShortcutsModule } from '../core/components/shortcuts/shortcuts.module';
import { FuseSearchBarModule } from '../core/components/search-bar/search-bar.module';
import { HomeComponent } from './content/home/home.component';
import { OriginComponent } from './content/origin/origin.component';
import { NukhComponent } from './content/nukh/nukh.component';
import { GotraComponent } from './content/gotra/gotra.component';
import { HostelComponent } from './content/hostel/hostel.component';
import { OrganizationComponent } from './content/organization/organization.component';
import { TempleComponent } from './content/temple/temple.component';
import { LoginComponent } from './content/login/login.component';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { ForgotPasswordComponent } from './content/forgotPassword/forgotPassword.component';
import { ResetPasswordComponent } from './content/reset-password/reset-password.component';
import { ChangePasswordComponent } from './content/change-password/change-password.component';
import { RegisterComponent } from './content/register/register.component';
import { FamilyComponent } from './content/family/family.component';
import { MemberComponent } from './content/member/member.component';
import { ConfirmationService } from '@jaspero/ng-confirmations';
import { ForkComponent } from './content/fork/fork.component';
import { CallbackPipe } from './pipes/callback.pipe';
import { MatrimonyComponent } from './content/matrimony/matrimony.component';
import { bkAuthService } from './services/auth-service';
import { bkDataService } from './services/bk-data.service';
import { MatrimonyViewComponent } from './content/matrimony-view/matrimony-view.component';
import { DirectoryComponent } from './content/directory/directory.component';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
    return localStorage.getItem('token');
}

@NgModule({
    declarations: [
        FuseContentComponent,
        FuseFooterComponent,
        FuseMainComponent,
        FuseNavbarVerticalComponent,
        FuseNavbarHorizontalComponent,
        FuseToolbarComponent,
        FuseNavbarVerticalToggleDirective,
        FuseThemeOptionsComponent,
        FuseQuickPanelComponent,        
        HomeComponent,
        OriginComponent,
        NukhComponent,
        GotraComponent,
        HostelComponent,
        OrganizationComponent,
        TempleComponent,
        LoginComponent,
        ForgotPasswordComponent,
        AutoFocusDirective,
        ResetPasswordComponent,
        ChangePasswordComponent,
        RegisterComponent,        
        FamilyComponent,
        MemberComponent,
        ForkComponent,
        CallbackPipe,
        MatrimonyComponent,
        MatrimonyViewComponent,
        DirectoryComponent 
    ],
    providers:[
        ConfirmationService,
        bkAuthService,
        bkDataService
    ],
    imports     : [
        SharedModule,
        RouterModule,        
        SimpleNotificationsModule.forRoot(),
        JasperoConfirmationsModule,
        FuseNavigationModule,
        FuseShortcutsModule,
        FuseSearchBarModule,
        MomentModule,
        JwtModule.forRoot({
            config: {
              tokenGetter: tokenGetter,
              whitelistedDomains: ['localhost:60067'],
              blacklistedRoutes: ['localhost:60067/auth/']          
            }
        })     
    ],
    exports     : [
        FuseMainComponent
    ]
})

export class FuseMainModule
{
}
