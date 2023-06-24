import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GcpDocumentsubmissionComponent } from './gcp-documentsubmission.component';

describe('GcpDocumentsubmissionComponent', () => {
  let component: GcpDocumentsubmissionComponent;
  let fixture: ComponentFixture<GcpDocumentsubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GcpDocumentsubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GcpDocumentsubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
