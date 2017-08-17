import { Injectable } from '@angular/core';
import { RxAVUser } from 'rx-lean-js-core';
import { Observable, BehaviorSubject } from 'rxjs';
import { PBUser } from '../objects';

@Injectable()
export class DefaultAuthService {

    constructor() {

    }

    isLoggedIn = false;

    // store the URL so we can redirect after logging in
    redirectUrl: string;
    
    _user: PBUser

    userChanged: BehaviorSubject<PBUser>;

    currentUser(options?: any) {
        return RxAVUser.current(options).map(user => {
            if (user != undefined && user != null) {
                this._user = new PBUser(user);
                return this._user;
            }
            return undefined;
        });
    }

    logout() {
        return this.currentUser().flatMap(user => {
            return user.metaUser.logOut();
        });
    }

    switchUser(user: RxAVUser) {
        this._user = new PBUser(user);
        if (this.userChanged == undefined)
            this.userChanged = new BehaviorSubject<PBUser>(this._user);
        else this.userChanged.next(this._user);
    }
}

