import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialTopNavComponent } from './partial-top-nav.component';

describe('PartialTopNavComponent', () => {
  let component: PartialTopNavComponent;
  let fixture: ComponentFixture<PartialTopNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartialTopNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartialTopNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
