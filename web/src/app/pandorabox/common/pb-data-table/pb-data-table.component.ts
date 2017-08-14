import { Component, OnInit, Inject, Input, Output, ViewChild } from '@angular/core';
import { MdPaginator, MdSort } from '@angular/material';
import { DataSource, CollectionViewer } from '@angular/cdk';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'pb-data-table',
  templateUrl: './pb-data-table.component.html',
  styleUrls: ['./pb-data-table.component.scss']
})
export class PBDataTableComponent implements OnInit {

  @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild(MdSort) sort: MdSort;

  dataSource: PBDataTableDataSource | null;

  constructor() { }

  _ready = false;
  get ready() {
    return this._ready;
  }

  @Input()
  className: string;

  @Input()
  title: string = '';

  @Input()
  displayedColumns: Array<string> = [];

  @Input()
  idColumn: string;

  _data: Array<any> = [];
  @Input()
  set data(_data: any) {
    this._data = _data;
    this.dataSource = new PBDataTableDataSource(this._data, this.paginator, this.displayedColumns, this.sort);
  }

  get data() {
    return this._data;
  }

  @Input()
  pagerConfig: any;

  get _pagerConfig() {
    let pageSize = this.defaultPagerConfig.pageSize;
    let pageSizeOptions = this.defaultPagerConfig.pageSizeOptions;
    if (this.pagerConfig == undefined) return this.defaultPagerConfig;
    if (this.pagerConfig.pageSize == undefined) this.pagerConfig.pageSize = pageSize;
    if (this.pagerConfig.pageSizeOptions == undefined) this.pagerConfig.pageSizeOptions = pageSizeOptions;
    return this.pagerConfig;
  }

  get defaultPagerConfig() {
    return {
      pageSize: 10,
      pageSizeOptions: [5, 10]
    };
  }

  @Input()
  footerActions: Array<any> = [];

  ngOnInit() {
    this.dataSource = new PBDataTableDataSource(this.data, this.paginator, this.displayedColumns, this.sort);
    console.log(this.paginator);
    this._ready = true;
  }
}

export class PBDataTableSchema {
  visible: boolean = true;
  column: string;
}

export class PBDataTableAction {
  mdTooltip: string;
  mdIcon: string;
  onClick: Function;
}


export class PBDataTableDataSource extends DataSource<any> {
  constructor(public _data: Array<any>, public _paginator: MdPaginator, public displayedColumns: Array<string>, public _sort: MdSort) {
    super();
    console.log('_data', this._data);
    this.dataChange.next(_data);
  }
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  dataChange: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  get data(): Array<any> { return this.dataChange.value; }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {

    const displayDataChanges = [
      this.dataChange,
      this._paginator.page,
      this._sort.mdSortChange,
      this._filterChange
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
          let mataValueA = a[this._sort.active];
          let mataValueB = b[this._sort.active];
          let comparableVlaueA = this.grab(mataValueA);
          let comparableVlaueB = this.grab(mataValueB);
          [propertyA, propertyB] = [comparableVlaueA, comparableVlaueB]; break;
        }
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });
  }
}