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
import { MemberSearchOptionsComponent } from '../core/components/member-search-options/member-search-options.component';
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
import { ScrollToModule } from 'ng2-scroll-to';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { MatrimonySearchComponent } from './content/matrimony-search/matrimony-search.component';
import { MatrimonySearchOptionsComponent } from '../core/components/matrimony-search-options/matrimony-search-options.component';
import { BkImageCropperComponent } from '../core/components/bk-image-cropper/bk-image-cropper.component';
import { BkImageViewerComponent } from '../core/components/bk-image-viewer/bk-image-viewer.component';

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
        MemberSearchOptionsComponent, 
        MatrimonySearchOptionsComponent,       
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
        DirectoryComponent,
        MatrimonySearchComponent,
        BkImageCropperComponent,
        BkImageViewerComponent
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
        MomentModule,
        ScrollToModule.forRoot(),  
        InfiniteScrollModule,      
        JwtModule.forRoot({
            config: {
              tokenGetter: tokenGetter,
              whitelistedDomains: ['pareshvarde-001-site1.etempurl.com']              
            }
        })     
    ],
    exports     : [
        FuseMainComponent
    ],
    entryComponents:[
        BkImageCropperComponent,
        BkImageViewerComponent
    ]

})

export class FuseMainModule
{
}
