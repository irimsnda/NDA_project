import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlleddrugspermitsDashboardComponent } from './controlleddrugspermits-dashboard.component';

describe('ControlleddrugspermitsDashboardComponent', () => {
  let component: ControlleddrugspermitsDashboardComponent;
  let fixture: ComponentFixture<ControlleddrugspermitsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlleddrugspermitsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlleddrugspermitsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
