import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy
  } from '@angular/core';
  
  @Component({
    selector: 'app-image-toolbar',
    templateUrl: 'imagetoolbar.component.html',
    styleUrls: ['imagetoolbar.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class ImageToolbarComponent {
    @Input() activateUploadFile = false;
    @Input() activateUploadFolder = false;
    @Input() activateRename = false;
    @Input() activateDelete = false;
        
    @Output() uploadFileClick = new EventEmitter<any>();
    @Output() uploadFolderClick = new EventEmitter<any>();
    @Output() renameClick = new EventEmitter<any>();
    @Output() deleteClick = new EventEmitter<any>();

    constructor() {}
  
    onUploadFileClick() {
      this.uploadFileClick.emit();
    }
  
    onUploadFolderClick() {
      this.uploadFolderClick.emit();
    }
  
    onRenameClick() {
      this.renameClick.emit();
    }

    onDeleteClick() {
        this.deleteClick.emit();
      }
    
  }
  