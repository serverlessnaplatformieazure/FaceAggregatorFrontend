import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FaceRecognitionViewComponent } from './components/facerecognitionview/facerecognitionview.component';
import { FaceRecognitionService } from './facerecognition.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material';
import { TreeModule } from 'angular-tree-component';
import { PathSelectorPopup } from './components/pathselectorpopup/pathselectorpopup.component';

@NgModule({
    imports: [BrowserModule,
        RouterModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        NgbModule,
        TreeModule
        
    ],
    declarations: [
        FaceRecognitionViewComponent,
        PathSelectorPopup
    ],
    exports: [FaceRecognitionViewComponent ],
    providers: [FaceRecognitionService],
    entryComponents: [PathSelectorPopup]
})
export class FaceRecognitionModule { }
