import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCheckboxModule, MatSidenavModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule
  ],
  exports:[
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule
  ],
  declarations: []
})
export class MaterialModule { }
