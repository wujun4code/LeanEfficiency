import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

export class PBEditField {
  hidden: boolean;
  disabled: boolean;
  control: string;
  placeholder: string;
  tooltip: string;
  options: Array<any>;
  name: any;
  value: any;
  icon: string;
}

export class PBEditConfig {
  title: string;
  fields: Array<PBEditField>;
}

@Component({
  selector: 'pb-edit-template',
  templateUrl: './pb-edit-template.component.html',
  styleUrls: ['./pb-edit-template.component.scss']
})
export class PbEditTemplateComponent implements OnInit {

  constructor() { }

  @Input() pbConfig: any;

  @Output() done: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {

  }

  isSelect(field: any) {

  }
}
