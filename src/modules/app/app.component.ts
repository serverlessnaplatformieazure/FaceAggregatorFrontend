import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterModule, Routes, Router, Route } from '@angular/router';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    languages = [];
    currentLanguageCode: string;
    navRoutes: Route[];

    constructor(private _router: Router) {
        this.navRoutes = this._router.config;    
    };
}
