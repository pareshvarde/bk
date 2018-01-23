import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../core/modules/shared.module';
import { ScrollToModule } from 'ng2-scroll-to';
import { SimpleNotificationsModule } from 'angular2-notifications';
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
import { ProfileComponent } from './content/profile/profile.component';

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
        ProfileComponent
    ],
    imports     : [
        SharedModule,
        RouterModule,
        ScrollToModule.forRoot(),
        SimpleNotificationsModule.forRoot(),
        FuseNavigationModule,
        FuseShortcutsModule,
        FuseSearchBarModule
    ],
    exports     : [
        FuseMainComponent
    ]
})

export class FuseMainModule
{
}
