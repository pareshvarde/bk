import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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

  ngOnInit() {
  }
}
