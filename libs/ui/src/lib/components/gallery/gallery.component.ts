/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
})
export class GalleryComponent implements OnInit {
  @Input() images!: string[];
  @Input() image?: string;
  selectedImage!:string;
  constructor() { }

  ngOnInit(): void {
  }



}

