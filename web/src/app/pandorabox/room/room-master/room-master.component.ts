import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pb-room-master',
  templateUrl: './room-master.component.html',
  styleUrls: ['./room-master.component.scss']
})
export class RoomMasterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  direction = 'row';
  toggleDirection() {
    let next = (DIRECTIONS.indexOf(this.direction) + 1) % DIRECTIONS.length;
    this.direction = DIRECTIONS[next];
  }

}
const DIRECTIONS = ['row', 'column'];
