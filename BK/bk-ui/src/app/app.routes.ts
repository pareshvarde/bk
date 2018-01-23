import { Routes } from '@angular/router';
import { HomeComponent } from './main/content/home/home.component';
import { OriginComponent } from './main/content/origin/origin.component';
import { NukhComponent } from './main/content/nukh/nukh.component';
import { GotraComponent } from './main/content/gotra/gotra.component';
import { HostelComponent } from './main/content/hostel/hostel.component';
import { OrganizationComponent } from './main/content/organization/organization.component';
import { TempleComponent } from './main/content/temple/temple.component';
import { LoginComponent } from './main/content/login/login.component';
import { ForgotPasswordComponent } from './main/content/forgotPassword/forgotPassword.component';
import { ResetPasswordComponent } from './main/content/reset-password/reset-password.component';
import { ChangePasswordComponent } from './main/content/change-password/change-password.component';
import { RegisterComponent } from './main/content/register/register.component';
import { ProfileComponent } from './main/content/profile/profile.component';

export const bkRoutes: Routes = [
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
        path: "forgotPassword",
        component: ForgotPasswordComponent
    },
    {
        path: "resetPassword/:token",
        component: ResetPasswordComponent
    },
    {
        path: "changePassword",
        component: ChangePasswordComponent
    },
    {
        path: "register",
        component: RegisterComponent
    },
    {
        path: "profile",
        component: ProfileComponent
    },
    {
        path      : '**',
        redirectTo : "home"              
    }    
];