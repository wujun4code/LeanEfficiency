import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pb-ticket-master',
  templateUrl: './ticket-master.component.html',
  styleUrls: ['./ticket-master.component.scss']
})
export class TicketMasterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  direction = 'row';
  someValue = 20;

  toggleDirection() {
    let next = (DIRECTIONS.indexOf(this.direction) + 1) % DIRECTIONS.length;
    this.direction = DIRECTIONS[next];
  }
}
const DIRECTIONS = ['row', 'row-reverse', 'column', 'column-reverse'];