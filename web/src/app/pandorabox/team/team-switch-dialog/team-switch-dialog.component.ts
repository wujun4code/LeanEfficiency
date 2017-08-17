import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef, MdDialog } from "@angular/material";
import { PBTeam } from '../../objects';
import { DefaultTeamService } from '../../team';
import { DefaultAuthService } from '../../auth/auth.service';

@Component({
  selector: 'pb-team-switch-dialog',
  templateUrl: './team-switch-dialog.component.html',
  styleUrls: ['./team-switch-dialog.component.scss']
})
export class TeamSwitchDialogComponent implements OnInit {

  constructor( @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<TeamSwitchDialogComponent>,
    public teamService: DefaultTeamService,
    public userService: DefaultAuthService) {
       
  }

  get teams() {
    return this.teamService.validTeams;
  }

  ngOnInit() {
    this.userService.currentUser().flatMap(user => {
      return this.teamService.loadTeams(user);
    }).subscribe(teams => {
      console.log('teams', teams);
    });

  }


  current: PBTeam;
  selected: PBTeam;

  cancel() {
    this.dialogRef.close({
      cancel: true,
      selectd: this.selected,
      current: this.current
    });
  }

  done() {
    this.dialogRef.close({
      cancel: false,
      selectd: this.selected,
      current: this.current

    });
  }

}
