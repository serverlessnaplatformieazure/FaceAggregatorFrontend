import { Injectable } from '@angular/core';
import * as urljoin from 'url-join';


@Injectable()
export class UrlJoiner {
    joinUrl(firstParam: string, secondParam: string): string {
        return urljoin(firstParam, secondParam);
    }
}
