import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamManagementOverviewComponent } from './team-management-overview.component';

describe('TeamManagementOverviewComponent', () => {
  let component: TeamManagementOverviewComponent;
  let fixture: ComponentFixture<TeamManagementOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamManagementOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamManagementOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
