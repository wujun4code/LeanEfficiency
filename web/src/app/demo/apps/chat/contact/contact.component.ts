import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { RxAVQuery, RxAVObject, RxAVUser } from 'rx-lean-js-core';
import { Contact } from '../chat.model';
import { RxAVFriend, RxLeanCloudSocialUserExtention } from 'rx-lean-js-social';

@Component({
    selector: 'contact-search-dialog',
    styleUrls: ['./contact.component.scss'],
    templateUrl: './contact.component.html'
})

export class ContactSearchDialog {
    constructor( @Inject(MD_DIALOG_DATA) public data: any) {
    }

    search: any;
    get canDoSearch() {
        let str = '';
        if (typeof this.search == 'string') {
            str = this.search;
        } else if (typeof this.search == 'number') {
            str = this.search.toString();
        }

        return this.search != undefined && str.length > 0;
    }
    get showContacts() {
        return this.contacts.length > 0;
    }

    contacts: Array<Contact> = [];
    doSearch() {
        let mobile = this.search;
        let id = this.search;
        let username = this.search;
        let eamil = this.search;

        let mq = new RxAVQuery('_User');
        mq.equalTo('mobilePhone', mobile);

        let iq = new RxAVQuery('_User');
        iq.equalTo('id', id);

        let uq = new RxAVQuery('_User');
        uq.equalTo('username', username);

        let eq = new RxAVQuery('_User');
        eq.equalTo('eamil', eamil);

        let q = RxAVQuery.or(mq, iq, uq, eq);

        q.find().subscribe(list => {
            console.log('list.length', list.length);

            this.contacts = list.map(o => o as RxAVUser).map(u => new Contact().fromAVUser(u));
        });
    }
    doSelect(contact: Contact) {

    }
    applyContact(contact: Contact) {
        RxAVUser.current().flatMap(currentUser => {
            return RxAVFriend.apply(currentUser, contact.objectId);
        }).subscribe(applied => {
            console.log('applied', applied);
        });
    }
}
