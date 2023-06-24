import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportLicenseappselComponent } from './export-licenseappsel.component';

describe('ExportLicenseappselComponent', () => {
  let component: ExportLicenseappselComponent;
  let fixture: ComponentFixture<ExportLicenseappselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportLicenseappselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportLicenseappselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
