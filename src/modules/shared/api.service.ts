import { Injectable } from '@angular/core';
import { Http, Response, Request } from '@angular/http';
import { HttpRequest, HttpEvent, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';
import { UrlJoiner} from './urljoiner';


@Injectable()
export class ApiService {
    constructor(private _http: Http, private _handler: HttpHandler, public urlJoiner: UrlJoiner) { }

    get(url: string, data: any): any {
        const completeUrl = this.urlJoiner.joinUrl(environment.apiHost, url);
        return this._http.get(completeUrl, { search: data }).catch(e => {
            return Observable.throw(e);
        });
    }

    post(url: string, data: any): any {
        const completeUrl = this.urlJoiner.joinUrl(environment.apiHost, url);
        return this._http.post(completeUrl, data).catch(e => {
            return Observable.throw(e);
        });
    }

    delete(url: string, data: any): any {
        const completeUrl = this.urlJoiner.joinUrl(environment.apiHost, url);
        return this._http.delete(completeUrl, {search: data}).catch(e => {
            return Observable.throw(e);
        });
    }

    patch(url: string, data: any): any {
        const completeUrl = this.urlJoiner.joinUrl(environment.apiHost, url);
        return this._http.patch(completeUrl, data).catch(e => {
            return Observable.throw(e);
        });;
    }
}
