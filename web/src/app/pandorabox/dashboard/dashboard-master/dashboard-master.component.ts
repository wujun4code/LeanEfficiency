import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PBRoom, PBRoomFields } from '../../objects';
import { DataSource, CollectionViewer } from '@angular/cdk';
import { MdPaginator, MdSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';
import { PBTeam, PBTeamFields, PBMemberBuiltInProperties, PBMemberKeys, PBTag, PBMember, PBTeamUser, PBTeamUserFields, PBUser, PBTicket, PBTicketFields } from '../../objects';
import { RxAVObject, RxAVUser, RxAVQuery } from 'rx-lean-js-core';

@Component({
  selector: 'pb-dashboard-master',
  templateUrl: './dashboard-master.component.html',
  styleUrls: ['./dashboard-master.component.scss']
})
export class DashboardMasterComponent implements OnInit {

  @ViewChild('ticketPager') paginator: MdPaginator;
  @ViewChild(MdSort) sort: MdSort;

  roomDoughnutChartOptions: Object;
  technicianDoughnutChartOptions: Object;
  ticketDoughnutChartOptions: Object;
  ticketSource: PBTicketDataSource | null;

  doughnutFlexRowPercent = 100 / 2;
  doughnutFlexColumnPercent = 25;

  mainFlexColumnPercent = 100;

  leftPanelFlexPercent = 100;
  devierPanelFlexPercent = 2;
  rightPanelFlexPercent = 100 - this.leftPanelFlexPercent - this.devierPanelFlexPercent;
  flexGap = '1em';

  statusItem = 25;
  leftPanel = 100;
  ticketPanel = 98;

  doughnutChartOptions: Array<Object> = [];

  constructor(public translate: TranslateService) {

    this.ticketDoughnutChartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
      },
      title: {
        text: '钟单'
      },
      credits: {
        enabled: false // 禁用版权信息
      },
      tooltip: {
        pointFormat: '{point.y} 单'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      series: [{
        type: 'pie',
        name: '钟单状态',
        data: [
          {
            name: '废单',
            y: 3,
          },
          {
            name: '进行中',
            y: 26,
          },
          {
            name: '成单',
            y: 92,
            sliced: true,
            selected: true
          },
        ]
      }]
    };

    this.technicianDoughnutChartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
      },
      title: {
        text: '技师'
      },
      credits: {
        enabled: false // 禁用版权信息
      },
      tooltip: {
        pointFormat: '{point.y} 位'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      series: [{
        type: 'pie',
        name: '技师状态',
        data: [
          {
            name: '空闲',
            y: 45,
          },
          {
            name: '在忙',
            y: 26,
          },
          {
            name: '预订',
            y: 12,
            sliced: true,
            selected: true
          },
          {
            name: '请假',
            y: 2,
            sliced: true,
            selected: true
          },
        ]
      }]
    };
    this.roomDoughnutChartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
      },
      title: {
        text: '房态'
      },
      credits: {
        enabled: false // 禁用版权信息
      },
      tooltip: {
        pointFormat: '{point.y} 间'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      series: [{
        type: 'pie',
        name: '客房使用情况',
        data: [
          {
            name: '空闲',
            y: 45,
          },
          {
            name: '在忙',
            y: 26,
          },
          {
            name: '预订',
            y: 12,
            sliced: true,
            selected: true
          },
        ]
      }]
    };

    this.roomStates = PBRoomFields.builtInStates.map(s => s.key);
    // this.translate.get(this.roomStates).subscribe(values => {
    //   //this.roomDoughnutChartLabels = values;
    //   console.log('values,', values);
    //   for (let key in values) {
    //     console.log('key', key);
    //     let value = values[key];
    //     console.log('value', value);
    //     this.roomDoughnutChartLabels.push(value);
    //   }
    // });
  }
  displayedColumns = ['serial', 'roomSerial', 'serviceState'];
  ngOnInit() {
    this.ticketSource = new PBTicketDataSource(this.paginator, this.displayedColumns, this.sort);
  }
  direction = 'row';

  roomStates: Array<string> = [];

  toggleDirection() {
    let next = (DIRECTIONS.indexOf(this.direction) + 1) % DIRECTIONS.length;
    this.direction = DIRECTIONS[next];
  }
  public alignTo = 'center';

  toggleAlignment() {
    let j = ALIGN_OPTIONS.indexOf(this.alignTo);
    this.alignTo = ALIGN_OPTIONS[(j + 1) % ALIGN_OPTIONS.length];
  }


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
const DIRECTIONS = ['row', 'column'];
const ALIGN_OPTIONS = ['auto', 'start', 'center', 'baseline', 'end', 'stretch'];

export class PBTicketDataSource extends DataSource<any>{

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
    query.include(PBTicketFields.waiter, PBTicketFields.room, `${PBTicketFields.waiter}.${PBTeamUserFields.user}`);

    return query.find().map(ticketList => {
      let db = ticketList.map(ticket => {
        let pbTicket = new PBTicket(ticket);
        //let pbWaiter = new PBMember(ticket.get(PBTicketFields.waiter));
        return pbTicket;
      });
      this.dataChange.next(db);
      return db;
    });
  }
  dataChange: BehaviorSubject<Array<PBTicket>> = new BehaviorSubject<Array<PBTicket>>([]);
  get data(): Array<PBTicket> { return this.dataChange.value; }
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
  grab(str: string) {
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
        case 'serial': [propertyA, propertyB] = [this.grab(a.serial), this.grab(b.serial)]; break;
        case 'roomSerial': [propertyA, propertyB] = [this.grab(a.roomSerial), this.grab(b.roomSerial)]; break;
        //case 'waiterSerial': [propertyA, propertyB] = [this.grab(a.waiterSerial), this.grab(b.waiterSerial)]; break;
        case 'serviceState': [propertyA, propertyB] = [a.serviceState, b.serviceState]; break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });
  }
}