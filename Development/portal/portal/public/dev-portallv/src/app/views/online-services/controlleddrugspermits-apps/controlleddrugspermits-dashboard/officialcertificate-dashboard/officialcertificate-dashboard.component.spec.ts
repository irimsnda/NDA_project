import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficialcertificateDashboardComponent } from './officialcertificate-dashboard.component';

describe('OfficialcertificateDashboardComponent', () => {
  let component: OfficialcertificateDashboardComponent;
  let fixture: ComponentFixture<OfficialcertificateDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficialcertificateDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficialcertificateDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
