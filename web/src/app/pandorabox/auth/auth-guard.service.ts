import { Injectable } from '@angular/core';
import {
    CanActivate, CanActivateChild,
    Router, ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { DefaultAuthService } from './auth.service';
import { AggregatedService } from '../services';
import { Observable } from 'rxjs';
import { RxAVQuery } from 'rx-lean-js-core';
import { PBTeamFields } from '../objects';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private aggregatedService: AggregatedService, private router: Router, ) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        let url: string = state.url;

        let queryParameters = route.params;
        console.log('queryParameters', queryParameters);
        let teamDomain = queryParameters['teamDomain'];
        return this.checkLogin(url, teamDomain);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.canActivate(childRoute, state);
    }

    checkLogin(url: string, teamDomain: string): Observable<boolean> {
        return this.aggregatedService.auth.currentUser().map(user => {
            let isLoggedIn = user != undefined;

            if (!isLoggedIn) {
                this.router.navigate(['/login']);
            }
            return isLoggedIn;
        }).flatMap(loggedIn => {
            return this.checkTeamExistOrForbidden(teamDomain);
        }).map(permission => {
            if (permission)
                this.aggregatedService.updateSideNav(teamDomain);
            return permission;
        });
    }
    checkTeamExistOrForbidden(teamDomain: string): Observable<boolean> {

        let teamQuery = new RxAVQuery(PBTeamFields.className);
        teamQuery.equalTo(PBTeamFields.domain, teamDomain);
        return teamQuery.find().map(list => {
            let permission = list.length > 0;
            if (!permission) this.router.navigate(['/error', 403]);
            return permission;
        });
    }
    checkTeamACL() {

    }
}