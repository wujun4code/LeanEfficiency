import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pb-dashboard-master',
  templateUrl: './dashboard-master.component.html',
  styleUrls: ['./dashboard-master.component.scss']
})
export class DashboardMasterComponent implements OnInit {

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
