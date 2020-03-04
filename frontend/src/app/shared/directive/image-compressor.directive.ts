import { Directive, Input, Output, EventEmitter, ViewContainerRef, OnInit, HostListener } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';
import { MatSnackBar } from '@angular/material/snack-bar';

@Directive({
  selector: '[imageCompressor]'
})
export class ImageCompressorDirective implements OnInit {

  @HostListener('click', ['$event']) onClick($event) {
      this.compressImage();
  }
  @Input() slice = 512;
  @Input() max = 1 * 1024 * 1024;
  @Input() ratio = 100;
  @Input() quality = 100;
  @Output() compressed = new EventEmitter<File>();

  constructor(
    private _snackBar: MatSnackBar,
    private imageCompress: NgxImageCompressService
  ) { }

  ngOnInit(): void {
  }

  async compressImage() {

    const { image, orientation } = await this.imageCompress.uploadFile();

    if(!(/image\/([a-zA-Z]*)/).test(image)) {
      this._snackBar.open('사진파일만 가능합니다.', '닫기', {
        duration: 5000,
        verticalPosition: 'top'
      });
      return;
    }
    
    const [mimeType] = image.match(/image\/([a-zA-Z]*)/);
    const [ext] = mimeType.match(/[-\w.]+$/);
    const size = this.imageCompress.byteCount(image);

    if(size >= this.max) {
      this.ratio = 75;
      this.quality = 50;
    }

    const compressed = await this.imageCompress.compressFile(
      image, orientation, this.ratio, this.quality
    );
    const byteArrays = [];

    for (let offset = 0; offset < compressed.length; offset += this.slice) {
        const slice = compressed.slice(offset, offset + this.slice);
        const byteNumbers = [];
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    } 
    const file = new File(byteArrays, Date.now() + '.' + ext, {
      type: mimeType,
    });
    this.compressed.emit(file);
  }

}
