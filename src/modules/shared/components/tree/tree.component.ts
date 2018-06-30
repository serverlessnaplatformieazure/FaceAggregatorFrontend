import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-tree-component',
    styleUrls: ['./tree.component.less', './icons/style.css'],
    templateUrl: 'tree.component.html'
})
export class TreeComponent implements OnChanges {
    _showChildren: boolean[];

    @Input() data: any;
    @Input() textField: string;
    @Input() valueField: string;
    @Input() childField: string;
    @Output() onSelect = new EventEmitter<any>();

    constructor() {
    }
    ngOnChanges() {
        if (this.data) {
            this._showChildren = new Array(this.data.length);
            this._showChildren.fill(false, 0, this.data.length - 1);
        }
    }

    onItemClick(targetId: number) {
        this.onSelect.emit(targetId);
    }

    toggleChildren(index: number) {
        this._showChildren[index] = !this._showChildren[index];
    }
}
