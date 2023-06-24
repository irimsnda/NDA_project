import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampledocumentsSubmissionsComponent } from './sampledocuments-submissions.component';

describe('SampledocumentsSubmissionsComponent', () => {
  let component: SampledocumentsSubmissionsComponent;
  let fixture: ComponentFixture<SampledocumentsSubmissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampledocumentsSubmissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampledocumentsSubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
