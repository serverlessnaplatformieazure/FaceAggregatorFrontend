import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NavigationModule } from '../navigation/navigation.module';
import { AppRoutingModule } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from '../shared/api.service';
import { FaceRecognitionModule } from '../facerecognition/facerecognition.module';
import { ImageManagementModule } from '../imagemanagement/imagemanagement.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material';
import { PathSelectorPopup } from '../facerecognition/components/pathselectorpopup/pathselectorpopup.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NavigationModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FaceRecognitionModule,
    ImageManagementModule,
    NgbModule.forRoot(),
    MatDialogModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
