import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { UserService, TeamService } from '../services';
import { TeamModel } from '../models';

@Component({
  selector: 'app-team-management',
  templateUrl: './team-management.component.html',
  styleUrls: ['./team-management.component.scss']
})
export class TeamManagementComponent implements OnInit {

  sideNavs: ManageSideNav[];
  team: TeamModel;
  constructor(public route: ActivatedRoute,
    public userService: UserService,
    public teamService: TeamService) {
    this.userService.current().subscribe(user => {

    });
    this.sideNavs = [];

    route.params.subscribe(params => {
      let hexTeamName = params['hexTeamName'];
      this.teamService.go(hexTeamName).subscribe(team => {
        this.team = team;
      });
      let dashboard = new ManageSideNav();
      dashboard.route = 'overview';
      dashboard.textKey = 'overview';
      dashboard.icon = 'explore';

      let memberSideNav = new ManageSideNav();
      memberSideNav.route = 'member';
      memberSideNav.textKey = 'member-management';
      memberSideNav.icon = 'people';

      this.sideNavs.push(...[dashboard, memberSideNav]);
    });
  }

  ngOnInit() {
  }

  get teamName() {
    if (this.team)
      return this.team.name;
    else return '';
  }

  get teamHexName() {
    if (this.team)
      return this.team.hexName;
    else return '';
  }

}

export class ManageSideNav {
  route: string;
  textKey: string;
  icon: string;
}
