import { DefaultSignUpService } from '../auth/signup/signup.service';
import { DefaultAuthService } from '../auth/auth.service';
import { StringUtils } from './stringUtils';
import { DefaultTeamService } from '../team'
import { Injectable } from '@angular/core';
import { RxAVUser } from 'rx-lean-js-core';
import { SidenavService } from '../../../app/core/sidenav/sidenav.service';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class AggregatedService {
    constructor(public auth: DefaultAuthService,
        public team: DefaultTeamService,
        public sidenav: SidenavService) {
    }

    currentTeamDomain: any;

    afterLoggedIn(user: RxAVUser) {
        this.auth.switchUser(user);
        return this.team.initBy(this.auth._user).map(teams => {
            let menu = this.sidenav;
            let teamDomain = this.team.defaultTeam.domain.toString();
            console.log('afterLoggedIn.teamDomain', teamDomain, typeof teamDomain);
            this.updateSideNav(teamDomain);
            return teamDomain;
        });
    }

    switchTeam(teamDomain: any) {

    }


    updateSideNav(teamDomain: any) {
        console.log('updateSideNav', teamDomain);
        if (teamDomain != this.currentTeamDomain) {
            this.sidenav.clearItems();
            let menu = this.sidenav;
            let pbConsole = menu.addItem('console', 'business', `/pandorabox/console/${teamDomain}`, 1);
            let pbDashboard = menu.addItem('trending', 'dashboard', `/pandorabox/dashboard/${teamDomain}`, 2);
            let pbRoom = menu.addItem('room', 'home', `/pandorabox/room/${teamDomain}`, 3);
            let pbTicket = menu.addItem('ticket', 'assignment', `/pandorabox/ticket/${teamDomain}`, 4);
            let pbMember = menu.addItem('staff', 'person', `/pandorabox/staff/${teamDomain}`, 5);
            this.currentTeamDomain = teamDomain;
        }
    }
}

export const services = [
    DefaultSignUpService,
    DefaultAuthService,
    StringUtils,
    DefaultTeamService,
    AggregatedService
];
