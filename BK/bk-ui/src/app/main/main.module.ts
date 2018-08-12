import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'angular2-moment';
import { SharedModule } from '../core/modules/shared.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { JasperoConfirmationsModule } from '@jaspero/ng-confirmations'
import { bkMainComponent } from './main.component';
import { bkContentComponent } from './content/content.component';
import { bkFooterComponent } from './footer/footer.component';
import { bkNavbarVerticalComponent } from './navbar/vertical/navbar-vertical.component';
import { bkToolbarComponent } from './toolbar/toolbar.component';
import { bkNavigationModule } from '../core/components/navigation/navigation.module';
import { bkNavbarVerticalToggleDirective } from './navbar/vertical/navbar-vertical-toggle.directive';
import { bkNavbarHorizontalComponent } from './navbar/horizontal/navbar-horizontal.component';
import { bkQuickPanelComponent } from './quick-panel/quick-panel.component';
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
import { ForkComponent } from './content/fork/fork.component';
import { CallbackPipe } from './pipes/callback.pipe';
import { MatrimonyComponent } from './content/matrimony/matrimony.component';
import { MatrimonyViewComponent } from './content/matrimony-view/matrimony-view.component';
import { DirectoryComponent } from './content/directory/directory.component';
import { JwtModule } from '@auth0/angular-jwt';
import { ScrollToModule } from 'ng2-scroll-to';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { MatrimonySearchComponent } from './content/matrimony-search/matrimony-search.component';
import { MatrimonySearchOptionsComponent } from '../core/components/matrimony-search-options/matrimony-search-options.component';
import { BkImageCropperComponent } from '../core/components/bk-image-cropper/bk-image-cropper.component';
import { BkImageViewerComponent } from '../core/components/bk-image-viewer/bk-image-viewer.component';
import { ReCaptchaModule } from 'angular2-recaptcha';
import { AboutusComponent } from './content/aboutus/aboutus.component';
import { ContactusComponent } from './content/contactus/contactus.component';
import { TermsComponent } from './content/terms/terms.component';
import { ExistingMemberAddComponent } from './content/member/existing-member-add.component';

export function tokenGetter() {
    var token = null;
    token = localStorage.getItem('token');

    if (!token)
        token = sessionStorage.getItem('token');

    return token;
}

@NgModule({
    declarations: [
        bkContentComponent,
        bkFooterComponent,
        bkMainComponent,
        bkNavbarVerticalComponent,
        bkNavbarHorizontalComponent,
        bkToolbarComponent,
        bkNavbarVerticalToggleDirective,
        MemberSearchOptionsComponent, 
        MatrimonySearchOptionsComponent,       
        bkQuickPanelComponent,        
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
        BkImageViewerComponent,
        AboutusComponent,
        ContactusComponent,
        TermsComponent,
        ExistingMemberAddComponent
    ],
    providers:[
     
    ],
    imports     : [
        SharedModule,
        RouterModule,        
        SimpleNotificationsModule.forRoot(),
        JasperoConfirmationsModule,
        bkNavigationModule,             
        MomentModule,
        ScrollToModule.forRoot(),  
        InfiniteScrollModule,   
        ReCaptchaModule,   
        JwtModule.forRoot({
            config: {
              tokenGetter: tokenGetter,
              whitelistedDomains: ['pareshvarde-001-site1.etempurl.com']              
            }
        })     
    ],
    exports     : [
        bkMainComponent
    ],
    entryComponents:[
        BkImageCropperComponent,
        BkImageViewerComponent
    ]

})

export class bkMainModule
{
}
