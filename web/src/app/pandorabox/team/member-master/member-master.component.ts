import { Component, ViewChild, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk';
import { MdPaginator } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import { Router, NavigationEnd } from "@angular/router";
import 'rxjs/add/operator/map';
import { MdDialogRef, MdDialog } from "@angular/material";
import { MemberEditDialogComponent } from '../member-edit-dialog/member-edit-dialog.component';
import { DefaultTeamService } from '../../team';
import { PBTeam, PBTeamFields, PBMemberBuiltInProperties, PBMemberKeys, PBTag } from '../../objects';

@Component({
  selector: 'pb-member-master',
  templateUrl: './member-master.component.html',
  styleUrls: ['./member-master.component.scss']
})
export class MemberMasterComponent implements OnInit {

  displayedColumns = ['userId', 'userName', 'progress', 'color'];
  exampleDatabase = new ExampleDatabase();
  dataSource: ExampleDataSource | null;

  dialogRef: MdDialogRef<MemberEditDialogComponent>;

  constructor(private router: Router,
    public dialog: MdDialog,
    public teamService: DefaultTeamService) {

  }
  addMemberButtonMenus: Array<any> = [];


  @ViewChild(MdPaginator) paginator: MdPaginator;

  ngOnInit() {
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator);

    this.initAddMemberButtonMenus();

  }

  initAddMemberButtonMenus() {
    this.addMemberButtonMenus.push({
      data: { role: PBMemberKeys.technician },
      disabled: false,
      icon: 'person',
      text: 'add-technician',
    });

    this.addMemberButtonMenus.push({
      data: { role: PBMemberKeys.reception },
      disabled: false,
      icon: 'person',
      text: 'add-reception',
    });
  }

  openDialog(data: any) {
    this.dialogRef = this.dialog.open(MemberEditDialogComponent, {
      width: '48em',
      disableClose: false,
      data: data
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.dialogRef = null;
    });
  }
}

export class PBMenuButton {
  icon: string;
  text: string;
  action: Function;
}
/** Constants used to fill up our data base. */
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);
  get data(): UserData[] { return this.dataChange.value; }

  constructor() {
    // Fill up the database with 100 users.
    for (let i = 0; i < 100; i++) { this.addUser(); }
  }

  /** Adds a new user to the database. */
  addUser() {
    const copiedData = this.data.slice();
    copiedData.push(this.createNewUser());
    this.dataChange.next(copiedData);
  }

  /** Builds and returns a new User. */
  private createNewUser() {
    const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

    return {
      id: (this.data.length + 1).toString(),
      name: name,
      progress: Math.round(Math.random() * 100).toString(),
      color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
    };
  }
}
/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  constructor(private _exampleDatabase: ExampleDatabase, private _paginator: MdPaginator) {
    super();
    this._paginator._intl.itemsPerPageLabel = 'xxx';
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<UserData[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this._exampleDatabase.data.slice();

      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    });
  }

  disconnect() { }
}
