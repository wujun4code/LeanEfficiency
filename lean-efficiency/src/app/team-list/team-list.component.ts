import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService, TeamService } from '../services';
import { UserModel, TeamModel } from '../models';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LogOutComponent } from '../log-out/log-out.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TeamListComponent implements OnInit {

  user: UserModel;
  mockTeams: TeamModel[];
  teams: TeamModel[];
  constructor(public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    public route: Router,
    public userService: UserService,
    public teamService: TeamService) {

    this.userService.current().flatMap(user => {
      if (user) {
        this.user = user;
        return this.teamService.teams(user);
      }
      else this.route.navigateByUrl('');
    }).map(teams => {
      this.teams = teams;
    }).subscribe(() => {

    });
  }

  ngOnInit() {
    this.initMockData();
  }

  initMockData() {
    this.mockTeams = [];
    let leancloud = new TeamModel();
    leancloud.name = 'LeanCloud';
    leancloud.hexName = 'leancloud';

    let google = new TeamModel();
    google.hexName = 'google';
    google.name = 'Google';
    this.mockTeams.push(leancloud, google);
  }
  openLogOutDialog(): void {
    let dialogRef = this.dialog.open(LogOutComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  doSelect(team: TeamModel) {
    this.teamService._current = team;
  }

}
