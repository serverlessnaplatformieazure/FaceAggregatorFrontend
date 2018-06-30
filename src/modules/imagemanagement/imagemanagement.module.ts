import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ImageManagementViewComponent } from './components/imagemanagementview/imagemanagementview.component';
import { ImageManagementService } from './imagemanagement.service';
import { TreeModule } from 'angular-tree-component';
import { AngularSplitModule } from 'angular-split';
import { ApiService } from '../shared/api.service';
import { HttpClientModule } from '@angular/common/http';
import { UrlJoiner } from '../shared/urljoiner';
import { ImagesGalleryComponent } from './components/imagesgallery/imagesgallery.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { ImageToolbarComponent } from './components/imagetoolbar/imagetoolbar.component';
import { ModalComponent } from '../shared/components/modal/modal.component';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
    imports: [BrowserModule,
        RouterModule,
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        TreeModule,
        AngularSplitModule,
        HttpClientModule,
        NgxGalleryModule,
        FileUploadModule
    ],
    declarations: [
        ImageManagementViewComponent,
        ImagesGalleryComponent,
        ImageToolbarComponent,
        ModalComponent
    ],
    exports: [ImageManagementViewComponent, ],
    providers: [ImageManagementService, ApiService, UrlJoiner]
})
export class ImageManagementModule { }
