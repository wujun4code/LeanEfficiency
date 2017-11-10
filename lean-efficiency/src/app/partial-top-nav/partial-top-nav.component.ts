import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../services';

@Component({
  selector: 'app-partial-top-nav',
  templateUrl: './partial-top-nav.component.html',
  styleUrls: ['./partial-top-nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PartialTopNavComponent implements OnInit {

  constructor(public userService: UserService) {

  }
  _loggedIn: boolean;

  ngOnInit() {
    this.userService.current().subscribe(user => {
      console.log('user', user);
      if (user) {
        this._loggedIn = true;
      } else {
        this._loggedIn = false;
      }
    });
  }

  get loggedIn(): boolean {
    return this._loggedIn;
  }

}
