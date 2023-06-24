import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlleddrugsSharedtaentryComponent } from './controlleddrugs-sharedtaentry.component';

describe('ControlleddrugsSharedtaentryComponent', () => {
  let component: ControlleddrugsSharedtaentryComponent;
  let fixture: ComponentFixture<ControlleddrugsSharedtaentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlleddrugsSharedtaentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlleddrugsSharedtaentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
