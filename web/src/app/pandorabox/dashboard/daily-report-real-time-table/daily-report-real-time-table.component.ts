import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PBRoom, PBRoomFields } from '../../objects';
import { DataSource, CollectionViewer } from '@angular/cdk';
import { MdPaginator, MdSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';
import { PBTeam, PBTeamFields, PBMemberBuiltInProperties, PBMemberKeys, PBTag, PBMember, PBTeamUser, PBTeamUserFields, PBUser, PBTicket, PBTicketFields, PBDailyReport } from '../../objects';
import { RxAVObject, RxAVUser, RxAVQuery } from 'rx-lean-js-core';

@Component({
  selector: 'pb-daily-report-real-time-table',
  templateUrl: './daily-report-real-time-table.component.html',
  styleUrls: ['./daily-report-real-time-table.component.scss']
})
export class DailyReportRealTimeTableComponent implements OnInit {

  @ViewChild('pager') paginator: MdPaginator;
  @ViewChild(MdSort) sort: MdSort;
  dailySource: PBDailyDataSource | null;
  displayedColumns = ['serial', 'roomSerial', 'serviceState'];

  //dailyReportDisplayedColumns = ['serial', 'projectNames', 'roomSerial', 'receptionSerial', 'technicianSerials', 'shouldPay', 'actualPaid', 'actualDeduct'];
  dailyReportDisplayedColumns = ['serial', 'projectNames', 'roomSerial', 'receptionSerial', 'technicianSerials', 'shouldPay', 'actualPaid', 'actualDeduct', 'paidWay'];

  constructor() { }

  ngOnInit() {
    this.dailySource = new PBDailyDataSource(this.paginator, this.dailyReportDisplayedColumns, this.sort);
  }

}

export class PBDailyDataSource extends DataSource<any>{

  constructor(private _paginator: MdPaginator, public displayedColumns: Array<string>, public _sort: MdSort) {
    super();
    this._paginator._intl.itemsPerPageLabel = '每页显示:';
    this._paginator._intl.nextPageLabel = '下一页';
    this._paginator._intl.previousPageLabel = '上一页';
    this.load().subscribe(inited => {

    });
  }
  load() {
    let query = new RxAVQuery(PBTicketFields.className);
    let teamObj = RxAVObject.createWithoutData(PBTeamFields.className, '598a7b6f570c350069a1c0f4');
    query.equalTo(PBTicketFields.team, teamObj);
    query.include(PBTicketFields.waiter, PBTicketFields.room, `${PBTicketFields.waiter}.${PBTeamUserFields.user}`, PBTicketFields.reception);

    return query.find().map(ticketList => {
      let db = ticketList.map(ticket => {
        let pbTicket = new PBTicket(ticket);
        //let pbWaiter = new PBMember(ticket.get(PBTicketFields.waiter));
        let pbDailyReport = new PBDailyReport(pbTicket);
        pbDailyReport.load();
        return pbDailyReport;
      });
      this.dataChange.next(db);
      return db;
    });
  }
  dataChange: BehaviorSubject<Array<PBDailyReport>> = new BehaviorSubject<Array<PBDailyReport>>([]);
  get data(): Array<PBDailyReport> { return this.dataChange.value; }
  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    const displayDataChanges = [
      this.dataChange,
      this._paginator.page,
      this._sort.mdSortChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this.getSortedData();

      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    });
  }
  disconnect(collectionViewer: CollectionViewer): void {

  }
  grab(str: any) {
    if (typeof str != 'string') str = str.toString();
    let r = str.match(/\d+/);
    if (r != null) {
      if (r.length > 0) {
        return r[0];
      }
    }
    return str;
  }
  getSortedData() {
    const data = this.data.slice();
    if (!this._sort.active || this._sort.direction == '') { return data; }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        // case 'serial': [propertyA, propertyB] = [this.grab(a.serial), this.grab(b.serial)]; break;
        // case 'roomSerial': [propertyA, propertyB] = [this.grab(a.roomSerial), this.grab(b.roomSerial)]; break;
        //case 'waiterSerial': [propertyA, propertyB] = [this.grab(a.waiterSerial), this.grab(b.waiterSerial)]; break;
        default: {
          let comparableVlaueA = this.grab(a.get(this._sort.active));
          let comparableVlaueB = this.grab(b.get(this._sort.active));
          [propertyA, propertyB] = [comparableVlaueA, comparableVlaueB]; break;
        }
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      
      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });
  }
}
