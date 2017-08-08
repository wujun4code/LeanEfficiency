import { Injectable } from '@angular/core';
import { RxAVUser } from 'rx-lean-js-core';
import { Observable } from 'rxjs';
import { PBUser } from '../objects';

@Injectable()
export class DefaultAuthService {

    _user: PBUser

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
}

