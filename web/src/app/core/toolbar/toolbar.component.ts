import * as screenfull from 'screenfull';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToolBarUserModel, ActionModel } from './models/user';

@Component({
  selector: 'ms-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input('quickpanel') quickpanel: any;
  @Input('sidenav') sidenav: any;
  @Input('userPanel') userPanel: ToolBarUserModel;
  
  isFullscreen: boolean = false;

  showBreadcrumbs: boolean = false;

  constructor() { }

  ngOnInit() { }

  toggleFullscreen() {
    if (screenfull.enabled) {
      screenfull.toggle();
      this.isFullscreen = !this.isFullscreen;
    }
  }
}
