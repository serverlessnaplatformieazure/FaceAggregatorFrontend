import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../shared/api.service';
import { RecognitionOrder } from './recognitionorder';
import { environment } from '../../environments/environment';


@Injectable()
export class FaceRecognitionService {

    constructor(private _apiService: ApiService) { }

    public OrderRecognition(recognitionOrder: RecognitionOrder): Observable<Response> {
        return this._apiService.post('RecognitionStart', recognitionOrder);
    }

    public GetAllContainerElements(): Observable<Response> {
        return this._apiService.get('GetAllContainerElements/' + environment.userName, {});
    }

    public GetAllContainerDirectories(): Observable<Response> {
        return this._apiService.get('GetAllContainerDirectories/' + environment.userName, {});
    }
   
}
