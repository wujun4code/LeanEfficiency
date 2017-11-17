import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService, TeamService, RoleService } from '../services';
import { UserModel } from '../models/user-model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LogOutComponent } from '../log-out/log-out.component';
import { Observable } from 'rxjs';
import { TeamModel } from '../models/team-model';

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TeamCreateComponent implements OnInit {
  isLinear = true;
  loggedIn = false;
  hadTeam: Observable<boolean>;
  tooltipPosition = 'right';
  userBasicFormGroup: FormGroup;
  securityFormGroup: FormGroup;
  teamFormGroup: FormGroup;
  admin: UserModel;
  currentTeam: TeamModel;
  hexTeamName: string = '';
  constructor(public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    public userService: UserService,
    public teamService: TeamService,
    public roleService: RoleService) {
    this.userBasicFormGroup = this._formBuilder.group({
      usernameCtrl: ['', Validators.required],
      hexNameCtrl: ['', Validators.required],
      nickNameCtrl: ['', Validators.required]
    });
    this.securityFormGroup = this._formBuilder.group({
      passwordCtrl: ['', Validators.required],
      repeatPasswordCtrl: ['', Validators.required],
      emailCtrl: ['', Validators.email],
      mobileCtrl: [''],
    });
    this.teamFormGroup = this._formBuilder.group({
      teamHexIdCtrl: ['', Validators.required],
      teamNameCtrl: ['', Validators.required],
    });
    this.userService.current().map(user => {
      this.setAdmin(user);
    }).subscribe(() => { });
  }

  ngOnInit() {

  }
  sinup() {
    console.log(this.userBasicFormGroup.value, this.securityFormGroup.value);
    let username = this.userBasicFormGroup.value.usernameCtrl;
    let hexName = this.userBasicFormGroup.value.hexNameCtrl;
    let nickName = this.userBasicFormGroup.value.nickNameCtrl;

    let password = this.securityFormGroup.value.passwordCtrl;
    let email = this.securityFormGroup.value.emailCtrl;
    let mobile = this.securityFormGroup.value.mobileCtrl;

    this.userService.create(username, password, nickName, hexName, email, mobile).map(user => {
      this.setAdmin(user);
    }).subscribe(() => { });
  }

  setAdmin(user: UserModel) {
    if (user) {
      this.loggedIn = true;
      this.admin = user;
      this.userBasicFormGroup.value.usernameCtrl = this.admin.username;
      this.hadTeam = this.teamService.teams(this.admin).map(teams => teams.length > 0);
    }
  }
  create() {
    if (this.teamFormGroup.valid) {
      let hexName = this.teamFormGroup.value.teamHexIdCtrl;
      let name = this.teamFormGroup.value.teamNameCtrl;

      this.teamService.create(hexName, name, this.admin).flatMap(team => {
        this.currentTeam = team;
        this.hexTeamName = this.currentTeam.hexName;
        return Observable.merge(this.roleService.createTeamAdmin(team, this.admin), this.teamService.add(team, this.admin), this.userService.createGeneral(team));
      }).subscribe(done => {
        console.log(done);
      });
    }
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
  doSelect() {
    this.teamService._current = this.currentTeam;
  }

}
