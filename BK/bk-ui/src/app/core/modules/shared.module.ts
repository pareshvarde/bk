import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { bkMatSidenavHelperDirective, bkMatSidenavTogglerDirective } from '../directives/bk-mat-sidenav-helper/bk-mat-sidenav-helper.directive';
import { bkMatSidenavHelperService } from '../directives/bk-mat-sidenav-helper/bk-mat-sidenav-helper.service';
import { bkPipesModule } from '../pipes/pipes.module';
import { bkMatchMedia } from '../services/match-media.service';
import { bkNavbarVerticalService } from '../../main/navbar/vertical/navbar-vertical.service';
import { bkPerfectScrollbarDirective } from '../directives/bk-perfect-scrollbar/bk-perfect-scrollbar.directive';
import { CookieService } from 'ngx-cookie-service';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageViewerModule} from 'ngx-image-viewer';

@NgModule({
    declarations   : [
        bkMatSidenavHelperDirective,
        bkMatSidenavTogglerDirective,                
        bkPerfectScrollbarDirective        
    ],
    imports        : [
        FlexLayoutModule,
        MaterialModule,
        CommonModule,
        FormsModule,
        bkPipesModule,
        ReactiveFormsModule,
        ImageCropperModule,
        ImageViewerModule.forRoot()
    ],
    exports        : [
        FlexLayoutModule,
        MaterialModule,
        CommonModule,
        FormsModule,
        bkMatSidenavHelperDirective,
        bkMatSidenavTogglerDirective,
        bkPipesModule,                
        bkPerfectScrollbarDirective,
        ReactiveFormsModule,                
        ImageCropperModule,
        ImageViewerModule
    ],
    entryComponents: [
        
    ],
    providers      : [
        CookieService,
        bkMatchMedia,
        bkNavbarVerticalService,
        bkMatSidenavHelperService        
    ]
})

export class SharedModule
{

}
