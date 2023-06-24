import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControldrugsLicenseAppComponent } from './controldrugs-license-app.component';

describe('ControldrugsLicenseAppComponent', () => {
  let component: ControldrugsLicenseAppComponent;
  let fixture: ComponentFixture<ControldrugsLicenseAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControldrugsLicenseAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControldrugsLicenseAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
