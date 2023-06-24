import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExprtLicenseappComponent } from './exprt-licenseapp.component';

describe('ExprtLicenseappComponent', () => {
  let component: ExprtLicenseappComponent;
  let fixture: ComponentFixture<ExprtLicenseappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExprtLicenseappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExprtLicenseappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
