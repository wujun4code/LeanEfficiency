import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { UserService, TeamService } from '../services'
import { TeamModel, UserModel } from '../models';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {
  isLinear = true;
  tooltipPosition = 'right';
  userBasicFormGroup: FormGroup;
  securityFormGroup: FormGroup;
  teamId = '5a0c194b128fe10045282975';
  team: TeamModel;
  user: UserModel;
  constructor(private _formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public userService: UserService,
    public teamService: TeamService) {
    this.teamService.get(this.teamId).map(t => {
      this.team = t;
    }).subscribe(() => {

    });
  }

  ngOnInit() {
    this.userBasicFormGroup = this._formBuilder.group({
      usernameCtrl: ['', Validators.required],
      hexNameCtrl: ['', Validators.required],
      nickNameCtrl: ['', Validators.required]
    });
    this.securityFormGroup = this._formBuilder.group({
      passwordCtrl: ['', Validators.required],
      repeatPasswordCtrl: ['', Validators.required],
      emailCtrl: ['', Validators.required],
      mobileCtrl: [''],
    });
  }
  signUp() {
    let username = this.userBasicFormGroup.value.usernameCtrl;
    let hexName = this.userBasicFormGroup.value.hexNameCtrl;
    let nickName = this.userBasicFormGroup.value.nickNameCtrl;

    let password = this.securityFormGroup.value.passwordCtrl;
    let email = this.securityFormGroup.value.emailCtrl;
    let mobile = this.securityFormGroup.value.mobileCtrl;

    this.userService.create(username, password, nickName, hexName, email, mobile).flatMap(user => {
      this.user = user;
      return this.userService.connect(user);
    }).flatMap(connected => {
      return this.teamService.add(this.team, this.user);
    }).flatMap(related => {
      return this.userService.joinGeneral(this.team,this.user);
    }).subscribe(() => { });
  }

}
