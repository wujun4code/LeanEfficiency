import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { fadeInAnimation } from "../../../route.animation";
import { RxAVUser } from 'rx-lean-js-core';

@Component({
  selector: 'ms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [fadeInAnimation]
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  username: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    RxAVUser.current().subscribe(user => {
      console.log('currentUser', user);
      if (user && user != null)
        this.afterLogin(user);
    });
  }

  login() {
    RxAVUser.logIn(this.username, this.password).subscribe(logedIn => {
      this.afterLogin(logedIn);
    });
  }

  afterLogin(user: RxAVUser) {
    this.router.navigate(['/admin/apps/chat']);
  }

}
