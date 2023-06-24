import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalclinicaltrialApplicationComponent } from './renewalclinicaltrial-application.component';

describe('RenewalclinicaltrialApplicationComponent', () => {
  let component: RenewalclinicaltrialApplicationComponent;
  let fixture: ComponentFixture<RenewalclinicaltrialApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalclinicaltrialApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalclinicaltrialApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
