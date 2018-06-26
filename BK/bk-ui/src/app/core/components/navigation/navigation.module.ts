import { NgModule } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { RouterModule } from '@angular/router';
import { bkNavigationComponent } from './navigation.component';
import { bkNavVerticalItemComponent } from './vertical/nav-item/nav-vertical-item.component';
import { bkNavVerticalCollapseComponent } from './vertical/nav-collapse/nav-vertical-collapse.component';
import { bkNavVerticalGroupComponent } from './vertical/nav-group/nav-vertical-group.component';
import { bkNavHorizontalItemComponent } from './horizontal/nav-item/nav-horizontal-item.component';
import { bkNavHorizontalCollapseComponent } from './horizontal/nav-collapse/nav-horizontal-collapse.component';

@NgModule({
    imports     : [
        SharedModule,
        RouterModule
    ],
    exports     : [
        bkNavigationComponent
    ],
    declarations: [
        bkNavigationComponent,
        bkNavVerticalGroupComponent,
        bkNavVerticalItemComponent,
        bkNavVerticalCollapseComponent,
        bkNavHorizontalItemComponent,
        bkNavHorizontalCollapseComponent
    ]
})
export class bkNavigationModule
{
}
