import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledTechnicalmeetingComponent } from './scheduled-technicalmeeting.component';

describe('ScheduledTechnicalmeetingComponent', () => {
  let component: ScheduledTechnicalmeetingComponent;
  let fixture: ComponentFixture<ScheduledTechnicalmeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduledTechnicalmeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledTechnicalmeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
