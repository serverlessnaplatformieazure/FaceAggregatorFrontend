import { Component, Input, Output, EventEmitter, OnChanges, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgClass } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { TreeModule, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions, TreeModel, TreeComponent, TreeNode, ITreeState } from 'angular-tree-component';
import { TreeElement } from './../../../imagemanagement/components/shared/TreeElement';
import { Subject } from 'rxjs/Subject';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { NgxGalleryImage } from 'ngx-gallery';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { FileUploader } from 'ng2-file-upload';
import { UrlJoiner } from '../../../shared/urljoiner';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'path-selector-popup',
    styleUrls: ['./pathselectorpopup.component.less'],
    templateUrl: 'pathselectorpopup.component.html'
})
export class PathSelectorPopup {

    _storageElements: Array<TreeElement> = [];
    _multiselectActionMapping: IActionMapping = {
        mouse: {
            click: TREE_ACTIONS.TOGGLE_ACTIVE_MULTI
        }
    };
    _treeOptions: ITreeOptions = {
        childrenField: 'Children',
        displayField: 'Name',
        idField: 'RelativePath'
    };
    _treeState: ITreeState = {
    };
    _selectedTreeElements: Array<TreeElement> = [];
    _selectionObjectName: string;
    _selectedIndices: boolean[] = [];
    _viewHeader: string;

    constructor(private dialogRef: MatDialogRef<PathSelectorPopup>,
        @Inject(MAT_DIALOG_DATA) data) {
        this._storageElements = data.Elements;
        this.ifNeededEnableMultiSelect(data);
        this._selectionObjectName = "source";
        this._viewHeader = data.ViewHeader;
    }

    private ifNeededEnableMultiSelect(data: any) {
        if (data.IsMultiSelect !== undefined && data.IsMultiSelect) {
            this._treeOptions.actionMapping = this._multiselectActionMapping;
        }
    }

    onTreeElementDeselect(event) {
        let indexOfDeselected = this._selectedTreeElements.indexOf(event.node.data);
        if (indexOfDeselected > -1) {
            this._selectedTreeElements.splice(indexOfDeselected, 1);
        }
    }

    onTreeElementSelect(event) {
        this._selectedTreeElements.push(event.node.data);
    }

    onCancelOperation(event) {
        this.dialogRef.close();
    }

    onPathSelect(event) {
        this.dialogRef.close(this._selectedTreeElements);
    }

    isPathSelected(): boolean {
        return this._selectedTreeElements.length !== 0;
    }
}
