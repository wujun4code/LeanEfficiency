import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToolBarUserModel, ActionModel } from '../models/user';

@Component({
  selector: 'ms-toolbar-user-button',
  templateUrl: './toolbar-user-button.component.html',
  styleUrls: ['./toolbar-user-button.component.scss']
})
export class ToolbarUserButtonComponent implements OnInit {

  isOpen: boolean;

  @Input('userPanel') userPanel: ToolBarUserModel;

  constructor() { }

  ngOnInit() {
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickOutside() {
    this.isOpen = false;
  }

}
