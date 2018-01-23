import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamManagementMemberComponent } from './team-management-member.component';

describe('TeamManagementMemberComponent', () => {
  let component: TeamManagementMemberComponent;
  let fixture: ComponentFixture<TeamManagementMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamManagementMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamManagementMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
