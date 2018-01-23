import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource, fadeInContent, MatPaginator, MatSort, } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService, TeamService } from '../services';
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../models';

@Component({
  selector: 'app-conversation-create',
  templateUrl: './conversation-create.component.html',
  styleUrls: ['./conversation-create.component.scss']
})
export class ConversationCreateComponent implements OnInit {

  memberData: MatTableDataSource<MemberData>;
  memberDisplayedColumns = ['checked', 'clientId', 'hexName', 'screenName'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.memberData.filter = filterValue;
  }
  _isPrivate: boolean;

  conversationFormGroup: FormGroup;

  selectedMembers = ['junwu', 'hjiang'];

  constructor(public userService: UserService,
    public teamService: TeamService,
    private _formBuilder: FormBuilder,
    public route: Router,
    public dialogRef: MatDialogRef<ConversationCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this._isPrivate = false;

    this.conversationFormGroup = this._formBuilder.group({
      isPrivate: [false, Validators.required],
      hexName: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.fillMemberDataSource().map(members => {
      this.memberData = new MatTableDataSource(members);
      this.memberData.paginator = this.paginator;
      this.memberData.sort = this.sort;
    }).subscribe(() => {

    });

  }
  ngAfterViewInit() {

  }

  close() {
    this.dialogRef.close();
  }

  get isPrivate() {
    return this._isPrivate;
  }
  set isPrivate(value) {
    this._isPrivate = value;
  }

  get chatTypeText() {
    if (this.isPrivate) {
      return 'private-group';
    } else {
      return 'public-group';
    }
  }

  get chatTypeAriaLable() {
    if (this.isPrivate) {
      return 'private-group-aria-label';
    } else {
      return 'public-group-aria-label';
    }
  }

  create() {
    let name = this.conversationFormGroup.value.name;
    let hexName = this.conversationFormGroup.value.hexName;
    let members = this.memberData.data.filter(member => member.checked).map(member => member.userModel);

    this.teamService.current().flatMap(currentTeam => {
      return this.userService.createGroupChat(currentTeam, hexName, name, true, members);
    }).subscribe(done => {
      this.dialogRef.close();
    });
  }

  get canCreate(): boolean {
    return this.conversationFormGroup.valid && this.validMembers;
  }

  get validMembers(): boolean {
    let checkedMemberData = this.memberData.data.filter(member => member.checked);
    if (checkedMemberData.length == 0) {
      return false;
    } else if (checkedMemberData.length == 1) {
      return checkedMemberData[0].clientId != this.userService._currentUser.clientId;
    } else {
      return true;
    }
  }

  toggled(event) {
    this.isPrivate = event.checked;
  }

  fillMemberDataSource() {
    return this.teamService.current().flatMap(team => {
      return this.teamService.members(team);
    }).map(users => {
      let dataSource = users.map(user => {
        return this.generateMemberData(user);
      });
      return dataSource;
    });
  }

  generateMemberData(user: UserModel): MemberData {
    return {
      checked: false,
      clientId: user.clientId,
      hexName: user.hexName,
      screenName: user.nickName,
      userModel: user
    }
  }

}

export interface MemberData {
  checked: boolean;
  clientId: string;
  hexName: string;
  screenName: string;
  userModel: UserModel
}

