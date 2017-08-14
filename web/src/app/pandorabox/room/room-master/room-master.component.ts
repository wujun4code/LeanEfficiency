import { Component, OnInit, ViewChild } from '@angular/core';
import { DefaultTeamService } from '../../team';
import { PBDataTableComponent, PBDataTableAction } from '../../common/pb-data-table/pb-data-table.component';
import { RxAVObject, RxAVQuery } from 'rx-lean-js-core';
import { PBTeam, PBRoom, PBRoomFields } from '../../objects';

@Component({
  selector: 'pb-room-master',
  templateUrl: './room-master.component.html',
  styleUrls: ['./room-master.component.scss']
})
export class RoomMasterComponent implements OnInit {

  rooms: Array<PBRoom> = [];
  get validRooms() {
    return this.rooms;
  }
  roomDisplayedColumns = ['serial'];
  roomTableTitle = 'room-table';
  constructor(public teamService: DefaultTeamService) {

    // this.teamService.teamChanged.flatMap(team => {
    //   return this.roomQuery(team);
    // }).subscribe(r => {
    //   this.rooms = r;
    // });
  }
  @ViewChild(PBDataTableComponent) memberTable: PBDataTableComponent;

  ngOnInit() {
    this.teamService.current().flatMap(team => {
      return this.roomQuery(team);
    }).subscribe(rList => {
      this.rooms = rList;
    });
  }

  roomQuery(pbTeam: PBTeam) {
    let query = new RxAVQuery(PBRoomFields.className);
    query.equalTo(PBRoomFields.team, pbTeam.metaData);
    return query.find().map(roomObjList => {
      return roomObjList.map(roomObj => {
        return new PBRoom(roomObj);
      });
    });
  }

  _roomTableFooterActions = [];
  get roomTableFooterActions() {
    if (this._roomTableFooterActions.length == 0) {
      let settings = new PBDataTableAction();
      settings.mdIcon = 'settings';
      settings.mdTooltip = '列表设置';
      settings.onClick = () => {
        console.log('hehe');
      };
      this._roomTableFooterActions.push(settings);
    }
    return this._roomTableFooterActions;

  }

  direction = 'row';
  toggleDirection() {
    let next = (DIRECTIONS.indexOf(this.direction) + 1) % DIRECTIONS.length;
    this.direction = DIRECTIONS[next];
  }

}
const DIRECTIONS = ['row', 'column'];
