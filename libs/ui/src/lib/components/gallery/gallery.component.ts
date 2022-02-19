/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
})
export class GalleryComponent implements OnInit {
  @Input() images?: string[];
  @Input() image?: string;
  selectedImage?:string;
  constructor() { }

  ngOnInit(): void {
    if(this.images && this.hasImages){
      this.selectedImage = this.images[0];
    }
    this.selectedImage = this.image;
   }

   onChangeSelected(image:string){
      this.selectedImage = image;
   }

   get hasImages(){
     if(this.images){
     return this.images?.length > 0;
     }else{
       return false;
     }
   }


}

