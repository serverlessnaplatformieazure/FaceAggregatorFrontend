import { Subject } from 'rxjs/Subject';
import { Component, OnInit, ViewEncapsulation, OnDestroy, ViewChild } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { FormGroup, FormBuilder } from '@angular/forms';
import { TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions, TreeModel, TreeComponent, TreeNode, ITreeState } from 'angular-tree-component';
import { TreeElement } from './../shared/TreeElement';
import { ImageManagementService } from '../../imagemanagement.service';
import { NgxGalleryImage } from 'ngx-gallery';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { FileUploader } from 'ng2-file-upload';
import { UrlJoiner} from '../../../shared/urljoiner';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-imagemanagementview',
    templateUrl: 'imagemanagementview.component.html',
    styleUrls: ['imagemanagementview.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class ImageManagementViewComponent  {   
    _storageElements: Array<TreeElement>;
    _selectedTreeElement: TreeElement; 
    _selectedFolderName: string;  
    _selectedFolderRelativePath: string;  
    _uploadModalTitle: string = "";
    _uploadModalIsFolder: boolean = false;
    uploadFolderName: string = "";
    galleryImages: NgxGalleryImage[];
    uploader:FileUploader = new FileUploader({disableMultipart: true});

    @ViewChild('renameModal') renameModal: ModalComponent;
    @ViewChild('fileUploadModal') fileUploadModal: ModalComponent;
    
    treeOptions: ITreeOptions = {
      childrenField: 'Children',
      displayField: 'Name'
    };
    
    constructor(private _service: ImageManagementService, public urlJoiner: UrlJoiner) {
        this.refreshTreeState();
        this.galleryImages = new Array<NgxGalleryImage>(); 
       
        this.uploader.onBeforeUploadItem = (item) => {   
            var apiUrl = this.urlJoiner.joinUrl(environment.apiHost, this.urlJoiner.joinUrl('UploadImage', environment.userName));
            var destPath = "";
            if(this._selectedFolderRelativePath !== undefined && this._selectedFolderRelativePath !== ""){
                destPath = this._selectedFolderName + "-";
            };
            if(this._selectedFolderRelativePath !== undefined && this.uploadFolderName !== ""){
                destPath = destPath + this.uploadFolderName + "-";
            }            
            destPath = destPath + item.file.name;
            item.url = this.urlJoiner.joinUrl(apiUrl, destPath);
            item.withCredentials = false;
        }  

        this.uploader.onCompleteAll = () => {
            this.refreshTreeState();
        }
    }

    get galleryVisible(): boolean {
        return this._selectedTreeElement !== undefined && this.galleryImages.length !== 0;
    }

    get elementSelected(): boolean {
        return this._selectedTreeElement !== undefined && this._selectedTreeElement.AbsolutePath !== null && 
               this._selectedTreeElement.Children.length === 0;
    }

    get folderSelected(): boolean {
        return this._selectedTreeElement !== undefined && 
            (this._selectedTreeElement.Children.length !== 0 || this._selectedTreeElement.Name == environment.userName);
    }

    get elementOrFolderSelected(): boolean {
        return this._selectedTreeElement !== undefined && this._selectedTreeElement.AbsolutePath !== null;
    }

    get selectedFolderName(): string {
        if(this._selectedTreeElement !== undefined && this._selectedTreeElement.Children.length !== 0)
        {
            this._selectedFolderName = this._selectedTreeElement.Name;
            this._selectedFolderRelativePath = this.getDirectoryRelativePath(this._selectedTreeElement.AbsolutePath);
        }       
        return this._selectedFolderName; 
    }    

    get uploadModalIsFolder(): boolean {
        return this._uploadModalIsFolder;
    }

    get uploadModalTitle(): string {
        return this._uploadModalTitle;
    }

    refreshTreeState(){
        this._service.GetAllContainerElements().map(response => response.json())
        .subscribe(
            result => {
                this._storageElements = [result];          
            },
            error  => {
                console.log(error);        
            }
        );     
    }

    onTreeElementDeselect(event) {
        this._selectedTreeElement = undefined;
    }
    
    onTreeElementSelect(event) {
        this._selectedTreeElement = event.node.data;
        if(this._selectedTreeElement.Children.length > 0)
        {
            var photoChildren = this._selectedTreeElement.Children.filter(x => x.Children.length === 0);
            this.galleryImages = this._service.GetFolderImages(photoChildren.map(x => x.AbsolutePath));
        }        
    }

    uploadFileClicked(event){
        this.uploadFolderName = "";
        this._uploadModalIsFolder = false;
        this._uploadModalTitle = "Upload file";
        this.fileUploadModal.show();
    }

    uploadFolderClicked(event){
        this._uploadModalIsFolder = true;
        this._uploadModalTitle = "Upload folder";
        this.fileUploadModal.show();
    }

    renameElement(newName: string) {
        this._service.RenameElement(this._selectedTreeElement.AbsolutePath, newName)
        .subscribe(
            result => {
                this.refreshTreeState();
                console.log(result);        
            },
            error  => {
                console.log(error);        
            }
        );
        this.renameModal.hide();
    }

    deleteElement(event) {
        if(this._selectedTreeElement.Children.length !== 0)
        {
            this._selectedTreeElement.Children.forEach(element => {
                this._service.DeleteElement(element.AbsolutePath)
                .subscribe(
                    result => {
                        this.refreshTreeState();
                        console.log(result);        
                    },
                    error  => {
                        console.log(error);        
                    }
                );  
            });
        }
        else
        {
            this._service.DeleteElement(this._selectedTreeElement.AbsolutePath)
            .subscribe(
                result => {
                    this.refreshTreeState();
                    console.log(result);        
                },
                error  => {
                    console.log(error);        
                }
            );  
        }              
    }

    private getDirectoryRelativePath(absolutePath: string){
        var result = absolutePath !== null ?
            absolutePath.substring(absolutePath.lastIndexOf(environment.userName) + environment.userName.length + 1) : "";
        return result.replace(/\//g, '-');;
    }
}
