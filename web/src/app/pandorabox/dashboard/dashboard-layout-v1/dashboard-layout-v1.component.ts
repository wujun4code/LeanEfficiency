import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pb-dashboard-layout-v1',
  templateUrl: './dashboard-layout-v1.component.html',
  styleUrls: ['./dashboard-layout-v1.component.scss']
})
export class DashboardLayoutV1Component implements OnInit {

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