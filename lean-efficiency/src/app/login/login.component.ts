import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services';
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { RxAVRealtime } from 'rx-lean-js-core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder,
    public route: Router,
    public userService: UserService) {
    this.userService.current().map(user => {
      if (user) {
        this.route.navigateByUrl('/team');
      }
    }).subscribe(() => {

    });
  }

  ngOnInit() {
    this.loginFormGroup = this._formBuilder.group({
      usernameCtrl: ['', Validators.required],
      passwordCtrl: ['', Validators.required],
    });

  }

  logIn() {
    let username = this.loginFormGroup.value.usernameCtrl;
    let password = this.loginFormGroup.value.passwordCtrl;
    return this.userService.logIn({
      password: password,
      username: username
    }).flatMap(loggedIn => {
      return this.userService.connect(loggedIn);
    }).subscribe(() => {
      this.route.navigateByUrl('/team');
    });
  }

}
