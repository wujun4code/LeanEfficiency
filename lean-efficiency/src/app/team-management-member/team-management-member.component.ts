import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource, fadeInContent, MatPaginator, MatSort, } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService, TeamService } from '../services';
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel, SelectableWrapper } from '../models';
import * as _ from "lodash";

@Component({
  selector: 'app-team-management-member',
  templateUrl: './team-management-member.component.html',
  styleUrls: ['./team-management-member.component.scss']
})
export class TeamManagementMemberComponent implements OnInit {
  userDisplayedColumns = ['selected', 'hexName', 'nickName'];
  // memberData: UserModel[];
  pageSizeEnums = [10, 20, 30];
  warppedUserData: MatTableDataSource<SelectableWrapper<UserModel>>;
  allUserMetaData: UserModel[];
  membersInTeamMetaData: UserModel[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.warppedUserData.filter = filterValue;
  }
  constructor(public userService: UserService,
    public teamService: TeamService,
    private _formBuilder: FormBuilder,
    public route: ActivatedRoute) {
    this.route.parent.params.subscribe(teamParams => {
      let hexTeamName = teamParams['hexTeamName'];
      this.teamService.go(hexTeamName).flatMap(team => {
        return this.teamService.members(team);
      }).map(members => {
        this.membersInTeamMetaData = members;
        // this.memberData = members;
      }).subscribe(() => {
      });
    });
  }

  ngOnInit() {
    this.fillUserDataSource().map(users => {
      this.allUserMetaData = users;
      let wrappedUserData = users.map(user => {
        return new SelectableWrapper<UserModel>(user);
      });
      this.warppedUserData = new MatTableDataSource(wrappedUserData);
      this.warppedUserData.paginator = this.paginator;
      this.warppedUserData.sort = this.sort;
    }).subscribe(() => {
    });
  }
  fillUserDataSource() {
    return this.userService.list();
  }

  showAdd(user: UserModel) {
    if (this.membersInTeamMetaData) {
      let v = this.membersInTeamMetaData.find(u => {
        return u.id == user.id;
      });
      return v == undefined;
    }
    return true;
  }

  add(user: UserModel) {
    this.teamService.current().flatMap(team => {
      return this.teamService.add(team, user).flatMap(memberAdded => {
        return this.userService.joinGeneral(team, user);
      });
    }).subscribe(done => {
      this.membersInTeamMetaData.push(user);
    });

  }

  showRemove(user: UserModel) {

  }

  remove() {

  }

  // get unMembers(): SelectableWrapper<UserModel>[] {
  //   _.differenceBy()
  // }

}

