import { Subject } from 'rxjs/Subject';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { RecognitionOrder } from '../../recognitionorder';
import { FaceRecognitionService } from '../../facerecognition.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TreeElement } from '../../../imagemanagement/components/shared/TreeElement';
import { PathSelectorPopup } from '../pathselectorpopup/pathselectorpopup.component';
import { IPathSelectorData } from '../pathselectorpopup/ipathselectordata';

@Component({
    selector: 'app-facerecognitionview',
    templateUrl: 'facerecognitionview.component.html',
    styleUrls: ['facerecognitionview.component.less']
})
export class FaceRecognitionViewComponent {


    private _storageElements: Array<TreeElement>;
    private _storageDirectories: Array<TreeElement>;
    private _form: FormGroup;
    
    constructor(private _facerecognitionService: FaceRecognitionService, public dialog: MatDialog, private _formBuilder: FormBuilder) {
        this.refreshTreeState();
        this.createForm();
    }

    createForm(): void {
        this._form = this._formBuilder.group({
            SourcePath: ['', Validators.required],
            DestinationFolder: ['', Validators.required],
            PatternFaces: this._formBuilder.array([]),
            RecognitionName: ['', Validators.required],
            PhoneNumber: ['', Validators.required],
            EmailAddress: ['', Validators.email]
        });
    }
    
    get destinationFolder(){
        return this._form.value['DestinationFolder'];
    }

    get sourcePath(){
        return this._form.value['SourcePath'];
    }

    get patternFaces(){
        return this._form.value['PatternFaces'];
    }

    private addItemToPatternFaces(faceElement: TreeElement) : void
    {
        let array = this._form.get('PatternFaces') as FormArray;
        array.push(this._formBuilder.group(faceElement));
    }

    openPathChooser(viewHeader: string): Observable<any> {
        let config = new MatDialogConfig();
        config.autoFocus = true;
        config.data = <IPathSelectorData> {Elements: this._storageDirectories, IsMultiSelect: false, ViewHeader: viewHeader};
        config.scrollStrategy
        config.maxHeight = 400;
        config.maxWidth = 600;
        config.width = '600px';
        config.height = '400px';
        let dialogRef = this.dialog.open(PathSelectorPopup, config);
        return dialogRef.afterClosed();
    }

    openFilesChooser(): Observable<any> {
        let config = new MatDialogConfig();
        config.autoFocus = true;
        config.data = <IPathSelectorData> {Elements: this._storageElements, IsMultiSelect: true, ViewHeader: "Select files"};
        config.maxHeight = 400;
        config.maxWidth = 600;
        config.width = '600px';
        config.height = '400px';
        let dialogRef = this.dialog.open(PathSelectorPopup, config);
        return dialogRef.afterClosed();
    }

    openSourcePathChooser() : void {
        this.openPathChooser("Select source path").subscribe(result=>{
            if (result !== undefined)
            {
                this._form.controls["SourcePath"].setValue(result[0].RelativePath);
            }
        }) ;
    }

    openDestinationPathChooser() : void {
        this.openPathChooser("Select destination path").subscribe(result=>{
            if (result !== undefined)
            {
                this._form.controls["DestinationFolder"].setValue(result[0].RelativePath);
            }
        })
    }

    openPhotosPatternChooser() : void {
        this.openFilesChooser().subscribe(result=>{
            if (result !== undefined)
            {
                this._form.setControl('PatternFaces', this._formBuilder.array([]));
                for (let item of result){
                    this.addItemToPatternFaces(item);
                }
            }
        })
    }

    onStartRecognition(event) {
        let array = this._form.get('PatternFaces') as FormArray;
        let faces = array.getRawValue().map(e=> e.RelativePath);
       
        let recognitionorder = this._form.getRawValue();
        recognitionorder.PatternFaces = faces;
        this._facerecognitionService.OrderRecognition(recognitionorder)
            .subscribe(
                result => {
                    alert("Recognition started!");
                    this.createForm();
                }, error => {
                    alert("Something went wrong.");
                }
            );;
    }

    refreshTreeState(){
        this._facerecognitionService.GetAllContainerElements().map(response => response.json())
        .subscribe(
            result => {
                this._storageElements = [result];          
            }
        );         
        this._facerecognitionService.GetAllContainerDirectories().map(response => response.json()).subscribe( result => {
            this._storageDirectories = [result];
        })
    }

    isFormValid() : boolean {
        return this._form.valid;
    }
}
