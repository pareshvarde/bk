import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-bk-image-cropper',
  templateUrl: './bk-image-cropper.component.html',
  styleUrls: ['./bk-image-cropper.component.scss']
})
export class BkImageCropperComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  
  constructor(
    public dialogRef: MatDialogRef<BkImageCropperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,  private ngxService: NgxUiLoaderService) {
    this.imageChangedEvent = data.imgEvent;
  }

  save(): void {
    this.dialogRef.close(this.croppedImage);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  imageCropped(image: string) {    
    this.croppedImage = image;
  }

  imageLoaded(){
    this.ngxService.stop(); 
  }

  loadImageFailed(){
    this.ngxService.stop(); 
  }

  ngOnInit() {
    this.ngxService.start();
  }
}
