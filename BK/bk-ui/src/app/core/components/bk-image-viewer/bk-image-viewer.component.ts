import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-bk-image-viewer',
  templateUrl: './bk-image-viewer.component.html',
  styleUrls: ['./bk-image-viewer.component.scss']
})
export class BkImageViewerComponent implements OnInit {

  config: any;
  images: any[];
  constructor(public dialogRef: MatDialogRef<BkImageViewerComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.images = data.images;
  }

  ngOnInit() {
    this.config = {
      btnClass: 'default', // The CSS class(es) that will apply to the buttons
      zoomFactor: 0.1, // The amount that the scale will be increased by
      containerBackgroundColor: '#ccc', // The color to use for the background. This can provided in hex, or rgb(a).
      wheelZoom: true, // If true, the mouse wheel can be used to zoom in
      allowFullscreen: false, // If true, the fullscreen button will be shown, allowing the user to entr fullscreen mode
      allowKeyboardNavigation: true, // If true, the left / right arrow keys can be used for navigation
      btnIcons: { // The icon classes that will apply to the buttons. By default, font-awesome is used.
        zoomIn: 'fa fa-plus',
        zoomOut: 'fa fa-minus',
        rotateClockwise: 'fa fa-repeat',
        rotateCounterClockwise: 'fa fa-undo',
        next: 'fa fa-arrow-right',
        prev: 'fa fa-arrow-left',
        fullscreen: 'fa fa-arrows-alt',
      },
      btnShow: {
        zoomIn: true,
        zoomOut: true,
        rotateClockwise: false,
        rotateCounterClockwise: false,
        next: true,
        prev: true
      }
    };
  }

}
