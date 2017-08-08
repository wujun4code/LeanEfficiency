import {
  Component, OnInit, ViewChild, ViewEncapsulation, AfterViewInit, ViewChildren, QueryList,
  ElementRef, OnDestroy
} from '@angular/core';
import { Subscription } from "rxjs";
import { MediaChange } from "@angular/flex-layout";
import { Router, NavigationEnd } from "@angular/router";
import { MediaReplayService } from "../../core/sidenav/mediareplay/media-replay.service";
import { MdDialogRef, MdDialog } from "@angular/material";


// user panle model
import { ToolBarUserModel, ActionModel } from '../../core/toolbar/models/user';
import { DefaultSignUpService } from '../auth/signup/signup.service';
import { DefaultAuthService } from '../auth/auth.service';

@Component({
  selector: 'pb-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit, OnDestroy {

  @ViewChild('sidenav') sidenav;

  private _mediaSubscription: Subscription;
  private _routerEventsSubscription: Subscription;

  quickpanelOpen: boolean = false;
  sidenavOpen: boolean = true;
  sidenavMode: string = 'side';
  isMobile: boolean = false;

  userPanel: ToolBarUserModel;

  constructor(private router: Router,
    public dialog: MdDialog,
    public userService: DefaultSignUpService,
    private mediaReplayService: MediaReplayService) {

    this.userService.currentUser().subscribe(pbUser => {
      this.userPanel = new ToolBarUserModel();
      this.userPanel.id = pbUser.metaUser.objectId;
      this.userPanel.nameText = pbUser.nameText;
      this.userPanel.actions = [];
      let logoutAction = new ActionModel();
      logoutAction.actionText = 'logOut';
      logoutAction.icon = 'exit_to_app';
      logoutAction.action = () => {
        this.openDialog();
      };

      this.userPanel.actions.push(logoutAction);
    });
  }

  ngOnInit() {
    this._mediaSubscription = this.mediaReplayService.media$.subscribe((change: MediaChange) => {
      let isMobile = (change.mqAlias == 'xs') || (change.mqAlias == 'sm');

      this.isMobile = isMobile;
      this.sidenavMode = (isMobile) ? 'over' : 'side';
      this.sidenavOpen = !isMobile;
    });

    this._routerEventsSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && this.isMobile) {
        this.sidenav.close();
      }
    });
  }

  ngOnDestroy() {
    this._mediaSubscription.unsubscribe();
  }

  onActivate(e, scrollContainer) {
    scrollContainer.scrollTop = 0;
  }
  dialogRef: MdDialogRef<DemoDialog>;
  result: string;

  openDialog() {
    this.dialogRef = this.dialog.open(DemoDialog, {
      disableClose: false
    });

    this.dialogRef.afterClosed().subscribe(result => {
      this.result = result;
      this.dialogRef = null;
    });
  }

}

@Component({
  selector: 'pb-logout-dialog',
  template: `
  <h1>{{ 'logout-dialog-title' | translate }}</h1>

  <md-dialog-actions align="end">
    <button md-button (click)="dialogRef.close('No!')">{{ 'btnCancel' | translate }}</button>
    <button md-button color="warn" (click)="logout()">{{ 'btnConfirm' | translate }}</button>
  </md-dialog-actions>
  `
})
export class DemoDialog {
  constructor(public dialogRef: MdDialogRef<DemoDialog>,
    private router: Router,
    public authService: DefaultAuthService) {

  }

  logout() {
    this.authService.logout().subscribe(logedOut => {
      this.dialogRef.close('Yes');
      this.router.navigate(['/login']);
    });
  }
}

