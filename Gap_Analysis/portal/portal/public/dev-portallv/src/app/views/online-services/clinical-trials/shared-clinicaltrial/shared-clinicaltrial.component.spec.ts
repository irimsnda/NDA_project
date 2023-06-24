import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedClinicaltrialComponent } from './shared-clinicaltrial.component';

describe('SharedClinicaltrialComponent', () => {
  let component: SharedClinicaltrialComponent;
  let fixture: ComponentFixture<SharedClinicaltrialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedClinicaltrialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedClinicaltrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
