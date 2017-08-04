import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, FormControlName, FormArray, FormArrayName } from '@angular/forms';
import { RxAVUser } from 'rx-lean-js-core';

@Component({
    selector: 'pb-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    host: {
    },
})
export class LogInComponent implements OnInit {

    mobileLogInForm: FormGroup;
    usernameLogInForm: FormGroup;

    constructor(private router: Router,
        public formBuilder: FormBuilder) {

        // 登录方式可能有多重形式
        // 1. 手机号+密码
        // 2. 手机号+短信验证码
        this.usernameLogInForm = this.formBuilder.group({
            username: new FormControl(''),
            password: new FormControl(''),
        });

        this.mobileLogInForm = this.formBuilder.group({
            mobile: new FormControl(''),
            smsCode: new FormControl(''),
        });

    }

    ngOnInit() {
        RxAVUser.current().subscribe(user => {
            console.log('currentUser', user);
            if (user && user != null)
                this.afterLogIn(user);
        });
    }

    logInBySMSCode() {
        let mobile = this.mobileLogInForm.value.mobile;
        let smsCode = this.mobileLogInForm.value.smsCode;
        RxAVUser.logInByMobilephone(mobile, smsCode).subscribe(loggedIn => {
            this.afterLogIn(loggedIn);
        });
    }

    logInByPassword() {
        let username = this.usernameLogInForm.value.username;
        let password = this.usernameLogInForm.value.password;

        RxAVUser.logIn(username, password).subscribe(loggedIn => {
            this.afterLogIn(loggedIn);
        });
    }

    afterLogIn(user: RxAVUser) {
        //this.router.navigate(['/pandorabox/apps/chat']);
        console.log(user.username + 'loggedIn');
    }

}


