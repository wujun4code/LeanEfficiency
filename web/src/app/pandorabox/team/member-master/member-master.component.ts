import { Component, ViewChild, OnInit } from '@angular/core';
import { DataSource, CollectionViewer } from '@angular/cdk';
import { MdPaginator, MdSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { RxAVObject, RxAVUser, RxAVQuery } from 'rx-lean-js-core';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import { Router, NavigationEnd } from "@angular/router";
import 'rxjs/add/operator/map';
import { MdDialogRef, MdDialog } from "@angular/material";
import { MemberEditDialogComponent } from '../member-edit-dialog/member-edit-dialog.component';
import { MemberPropertySelectDialogComponent } from '../member-property-select-dialog/member-property-select-dialog.component';
import { DefaultTeamService } from '../../team';
import { StringUtils } from '../../services/stringUtils';
import { PBTeam, PBTeamFields, PBMemberBuiltInProperties, PBMemberKeys, PBTag, PBMember, PBTeamUser, PBTeamUserFields, PBUser } from '../../objects';
import { ActivatedRoute } from '@angular/router';
import { AggregatedService } from '../../services';
import { PBDataTableComponent, PBDataTableAction } from '../../common/pb-data-table/pb-data-table.component';


@Component({
  selector: 'pb-member-master',
  templateUrl: './member-master.component.html',
  styleUrls: ['./member-master.component.scss']
})
export class MemberMasterComponent implements OnInit {

  displayedColumns = ['serial', 'nickName', 'mobile'];
  selectableProperties = [
    {
      name: 'serial',
      selected: true
    }, {
      name: 'nickName',
      selected: true
    },
    {
      name: 'mobile',
      selected: true
    },
    {
      name: 'weixin',
      selected: true
    },
  ];
  get memberDisplayedColumns() {
    return this.displayedColumns;
  }
  members: Array<any> = [];
  get validMembers() {
    return this.members;
  }

  get allColumns() {
    return this.selectableProperties.map(c => c.name);
  }

  // get displayedColumns() {
  //   return this.selectableProperties.filter(c => c.selected).map(c => c.name);
  // }

  memberEditDialogRef: MdDialogRef<MemberEditDialogComponent>;
  memberPropertySelectDialogRef: MdDialogRef<MemberPropertySelectDialogComponent>;
  teamDomain: any;
  constructor(private router: Router,
    public dialog: MdDialog,
    public teamService: DefaultTeamService,
    public stringService: StringUtils, public service: AggregatedService, public route: ActivatedRoute) {

    route.params.subscribe(params => {
      this.teamDomain = params['teamDomain'];
    });

  }
  addMemberButtonMenus: Array<any> = [];


  @ViewChild(PBDataTableComponent) memberTable: PBDataTableComponent;

  ngOnInit() {
  
    this.initAddMemberButtonMenus();

    this.service.team.getTeamQueryByDomain(this.teamDomain).flatMap(team => {
      return this.memberQuery(team);
    }).subscribe(memberList => {
      this.members = memberList;
    });

  }

  memberQuery(pbTeam: PBTeam) {
    let query = new RxAVQuery(PBTeamUserFields.className);
    query.equalTo(PBTeamUserFields.team, pbTeam.metaData);
    query.include(PBTeamUserFields.user);
    return query.find().map(memberList => {
      let db = memberList.map(member => {
        let pbMember = new PBMember(member);
        // let pbUser = new PBUser(member.get(PBTeamUserFields.user));
        // pbMember.linkUser = pbUser;
        return pbMember;
      });
      return db;
    });
  }
  initAddMemberButtonMenus() {
    this.addMemberButtonMenus.push({
      data: { role: PBMemberKeys.technician },
      disabled: false,
      icon: 'person',
      text: 'add-technician',
    });

    this.addMemberButtonMenus.push({
      data: { role: PBMemberKeys.reception },
      disabled: false,
      icon: 'person',
      text: 'add-reception',
    });
  }
  memberTableTitle = 'room-table';
  _memberTableFooterActions = [];
  get memberTableFooterActions() {
    if (this._memberTableFooterActions.length == 0) {
      let settings = new PBDataTableAction();
      settings.mdIcon = 'settings';
      settings.mdTooltip = 'table-settings';
      settings.onClick = () => {
        console.log('hehe');
      };
      this._memberTableFooterActions.push(settings);
    }
    return this._memberTableFooterActions;
  }

  openDialog(data: any) {
    this.memberEditDialogRef = this.dialog.open(MemberEditDialogComponent, {
      width: '48em',
      disableClose: false,
      data: data
    });

    this.memberEditDialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.memberEditDialogRef = null;
    });
  }

  openPropertyViewSelectDialog(data: any) {
    this.memberPropertySelectDialogRef = this.dialog.open(MemberPropertySelectDialogComponent, {
      width: '32em',
      disableClose: false,
      data: this.selectableProperties
    });

    this.memberPropertySelectDialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.memberPropertySelectDialogRef = null;
      if (result.cancel == false) {
        let _displayedColumns = this.selectableProperties.filter(c => c.selected).map(c => c.name);
      }
    });
  }
}

export class PBMenuButton {
  icon: string;
  text: string;
  action: Function;
}