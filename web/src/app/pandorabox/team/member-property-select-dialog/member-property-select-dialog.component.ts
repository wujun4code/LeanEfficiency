import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MdDialog } from "@angular/material";
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'pb-member-property-select-dialog',
  templateUrl: './member-property-select-dialog.component.html',
  styleUrls: ['./member-property-select-dialog.component.scss']
})
export class MemberPropertySelectDialogComponent implements OnInit {

  selectableProperties: Array<any> = [];

  constructor( @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<MemberPropertySelectDialogComponent>, ) {
    this.selectableProperties = data;
  }

  ngOnInit() {
  }
  cancel() {
    this.dialogRef.close({
      cancel: true,
      data: this.selectableProperties
    });
  }

  done() {
    this.dialogRef.close({
      cancel: false,
      data: this.selectableProperties
    });
  }
}
