import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../shared/api.service';
import { NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery';
import { environment } from '../../environments/environment';


@Injectable()
export class ImageManagementService {

    constructor(private _apiService: ApiService) { }
   
    public GetAllContainerElements(): Observable<Response> {
        return this._apiService.get('GetAllContainerElements', {});
    }

    public GetFolderElementPaths(folderName: string): Observable<Response> {
        return this._apiService.get('GetFolderElementPaths/', {
            folderName: folderName
          });
    }     

    public GetFolderImages(paths: string[]): NgxGalleryImage[]  {
        var galleryImages = new Array<NgxGalleryImage>();       
        paths.forEach((path, index) => {
            let obj = {};
              
            obj = {
                small: `${environment.apiHost}GetImageThumbnail?path=${path}`,
                medium: `${environment.apiHost}GetImage?path=${path}`,
                big: `${environment.apiHost}GetImage?path=${path}`
            };              
            galleryImages.push(obj);
        });
        galleryImages.push();
        return galleryImages;
    };  
    
    public RenameElement(path: string, newName: string): Observable<Response> {
        return this._apiService.patch('RenameElement', {path: path, newFileName: newName});
    }

    public DeleteElement(path: string): Observable<Response> {
        return this._apiService.delete('DeleteElement', {path: path});
    }
}
