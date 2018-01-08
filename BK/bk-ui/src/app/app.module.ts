import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule} from './modules/material-module.module';
import { SidebarComponent } from './components/layout/sidebar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/layout/header.component'

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LayoutComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule    
  ],  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
