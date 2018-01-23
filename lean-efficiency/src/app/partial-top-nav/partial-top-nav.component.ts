import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService, TeamService } from '../services';
import { TeamModel } from '../models';
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-partial-top-nav',
  templateUrl: './partial-top-nav.component.html',
  styleUrls: ['./partial-top-nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PartialTopNavComponent implements OnInit {

  constructor(public userService: UserService,
    public teamService: TeamService,
    public route: ActivatedRoute) {

    route.params.subscribe(params => {
      this.hexTeamName = params['hexTeamName'];
    });
  }
  _loggedIn: boolean;
  hexTeamName: string;
  get teamHexName(): string {
    if (this.hexTeamName)
      return this.hexTeamName;
    else return '';
  };

  ngOnInit() {
    this.userService.current().subscribe(user => {
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
