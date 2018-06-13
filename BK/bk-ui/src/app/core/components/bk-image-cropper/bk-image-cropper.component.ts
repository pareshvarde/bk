import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-bk-image-cropper',
  templateUrl: './bk-image-cropper.component.html',
  styleUrls: ['./bk-image-cropper.component.scss']
})
export class BkImageCropperComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  @BlockUI() blockUI: NgBlockUI;
  
  constructor(
    public dialogRef: MatDialogRef<BkImageCropperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
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
    this.blockUI.stop();
  }

  loadImageFailed(){
    this.blockUI.stop();
  }

  ngOnInit() {
    this.blockUI.start("Please wait...");
  }
}
