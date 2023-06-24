import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiateRenewalproductApplicationComponent } from './initiate-renewalproduct-application.component';

describe('InitiateRenewalproductApplicationComponent', () => {
  let component: InitiateRenewalproductApplicationComponent;
  let fixture: ComponentFixture<InitiateRenewalproductApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiateRenewalproductApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiateRenewalproductApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
