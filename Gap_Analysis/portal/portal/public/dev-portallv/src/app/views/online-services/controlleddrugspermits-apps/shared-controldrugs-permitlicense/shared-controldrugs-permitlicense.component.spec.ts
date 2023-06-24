import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedControldrugsPermitlicenseComponent } from './shared-controldrugs-permitlicense.component';

describe('SharedControldrugsPermitlicenseComponent', () => {
  let component: SharedControldrugsPermitlicenseComponent;
  let fixture: ComponentFixture<SharedControldrugsPermitlicenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedControldrugsPermitlicenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedControldrugsPermitlicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
