import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportLicensevisashareclassComponent } from './import-licensevisashareclass.component';

describe('ImportLicensevisashareclassComponent', () => {
  let component: ImportLicensevisashareclassComponent;
  let fixture: ComponentFixture<ImportLicensevisashareclassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportLicensevisashareclassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportLicensevisashareclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
