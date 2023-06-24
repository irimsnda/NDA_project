import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafedisposalinspectionFeesComponent } from './safedisposalinspection-fees.component';

describe('SafedisposalinspectionFeesComponent', () => {
  let component: SafedisposalinspectionFeesComponent;
  let fixture: ComponentFixture<SafedisposalinspectionFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafedisposalinspectionFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafedisposalinspectionFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
