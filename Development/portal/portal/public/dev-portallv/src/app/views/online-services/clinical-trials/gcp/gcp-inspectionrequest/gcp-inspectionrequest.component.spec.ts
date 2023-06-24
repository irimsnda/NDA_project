import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GcpInspectionrequestComponent } from './gcp-inspectionrequest.component';

describe('GcpInspectionrequestComponent', () => {
  let component: GcpInspectionrequestComponent;
  let fixture: ComponentFixture<GcpInspectionrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GcpInspectionrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GcpInspectionrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
