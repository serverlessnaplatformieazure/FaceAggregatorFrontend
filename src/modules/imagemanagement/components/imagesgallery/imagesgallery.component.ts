import { NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Location, DatePipe } from '@angular/common';

import 'rxjs/add/operator/switchMap';

@Component({
  styleUrls: ['./imagesgallery.component.less'],
  selector: 'app-images-gallery',
  templateUrl: 'imagesgallery.component.html'
})
export class ImagesGalleryComponent implements OnInit {
  @Input() galleryVisible = false;
  @Input() selectedFolderName = "";
  @Input() galleryImages: NgxGalleryImage[] = new Array<NgxGalleryImage>();

  galleryOptions: NgxGalleryOptions[];

  constructor(
    private http: Http,
    private _router: Router,
    private _route: ActivatedRoute    
  ) {

    this.galleryOptions = [
        { 'image': false, 'height': '450px', 'width': '100%', 'thumbnailsColumns': 6, 'thumbnailsRows': 3 },
        { 'breakpoint': 500, 'width': '100%' }
    ];

     
  }

  ngOnInit() {
    
  }  
}
