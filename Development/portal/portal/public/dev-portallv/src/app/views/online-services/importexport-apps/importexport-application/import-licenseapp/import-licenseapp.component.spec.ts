import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportLicenseappComponent } from './import-licenseapp.component';

describe('ImportLicenseappComponent', () => {
  let component: ImportLicenseappComponent;
  let fixture: ComponentFixture<ImportLicenseappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportLicenseappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportLicenseappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
