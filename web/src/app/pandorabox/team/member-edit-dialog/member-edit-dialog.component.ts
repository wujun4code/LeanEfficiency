import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MdDialog } from "@angular/material";
import { MD_DIALOG_DATA } from '@angular/material';
import { DefaultTeamService } from '../../team';
import { PBTeam, PBTeamFields, PBMemberBuiltInProperties, PBMemberKeys, PBTag, PBMemberBuiltInFreezeProperties } from '../../objects';
import { PBEditField } from '../../common/pb-edit-template/pb-edit-template.component';

@Component({
  selector: 'pb-member-edit-dialog',
  templateUrl: './member-edit-dialog.component.html',
  styleUrls: ['./member-edit-dialog.component.scss']
})
export class MemberEditDialogComponent implements OnInit {


  view: string = 'create';
  model: string = 'member';
  role: string = 'member';
  title = '';
  ready = false;
  tags: Array<PBTag> = [];

  editConfig: any;
  constructor( @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<MemberEditDialogComponent>,
    public teamService: DefaultTeamService) {
    this.role = data.role;

    console.log('MD_DIALOG_DATA', data);
    this.teamService.getMemberFields(this.role).subscribe(list => {

      let fields = list.map(property => {
        let field = new PBEditField();

        field.placeholder = property.get(PBMemberBuiltInProperties.placeholder);
        field.tooltip = property.get(PBMemberBuiltInProperties.description);
        field.icon = property.get(PBMemberBuiltInProperties.icon);
        field.name = property.get(PBMemberBuiltInProperties.propertyName);
        field.value = '';
        
        //field.disabled = PBMemberBuiltInFreezeProperties.indexOf(field.name) > -1;

        return field;
      });
      console.log('fields', fields);
      this.title = `${this.view}-${this.role}`;

      this.editConfig = {
        title: this.title,
        fields: fields
      };
      this.ready = true;
    });

    PBTag.query().subscribe(list => {
      this.tags = list;
    });
  }

  get showTagTab() {
    return this.role == PBMemberKeys.technician;
  }

  ngOnInit() {

  }

  cancel() {
    this.dialogRef.close({
      cancel: true,
      data: this.editConfig
    });
  }

  done() {
    this.dialogRef.close({
      cancel: false,
      data: this.editConfig
    });
  }
}
