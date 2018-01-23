import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../services';
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LogOutComponent implements OnInit {


  ngOnInit() {
  }
  constructor(
    public userService: UserService,
    public route: Router,
    public dialogRef: MatDialogRef<LogOutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  logOut() {
    this.userService.logOut().map(loggdOut => {
      this.dialogRef.close();
      this.route.navigateByUrl('/');
    }).subscribe(() => {

    });
  }
}
