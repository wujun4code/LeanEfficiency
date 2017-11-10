import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialMessageInputBoxComponent } from './partial-message-input-box.component';

describe('PartialMessageInputBoxComponent', () => {
  let component: PartialMessageInputBoxComponent;
  let fixture: ComponentFixture<PartialMessageInputBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartialMessageInputBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartialMessageInputBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
