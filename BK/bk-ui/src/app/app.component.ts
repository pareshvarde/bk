import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-checkbox>Check me!</mat-checkbox>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'app';
}
