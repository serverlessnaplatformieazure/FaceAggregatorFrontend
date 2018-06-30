import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router, Event, NavigationEnd, ActivatedRoute  } from '@angular/router';
import { AppComponent } from './app.component';
import { Title } from '@angular/platform-browser';
import { FaceRecognitionViewComponent } from '../facerecognition/components/facerecognitionview/facerecognitionview.component';
import { ImageManagementViewComponent } from '../imagemanagement/components/imagemanagementview/imagemanagementview.component';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/imagemanagement',
        pathMatch: 'full',
        data: {
            inNavbar: false,
            visible: false
        }
    },
    {
        path: 'imagemanagement',
        component: ImageManagementViewComponent,
        data: {
            inNavbar: true,
            visible: true,
            name: 'Image management'
        },
    },
    {
        path: 'facerecognition',
        component: FaceRecognitionViewComponent,
        data: {
            inNavbar: true,
            visible: true,
            name: 'Face recognition'
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: []
})

export class AppRoutingModule {
    constructor(private router: Router,
        private titleService: Title,
        private activatedRoute: ActivatedRoute) {

        const routes = [];
        this.router.config.forEach(route => {
            routes.push(route);
            if (route.children) {
                routes.concat(route.children);
            }
        });

        this.router.events
            .filter((event) => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .map((route) => {
                while (route.firstChild) {
                    route = route.firstChild;
                }
                return route;
            })
            .filter((route) => route.outlet === 'primary')
            .mergeMap((route) => route.data)
            .subscribe((event) => this.titleService.setTitle('FaceAggregator - ' + event['name']));
    }
}
