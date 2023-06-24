import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicetariffFeesComponent } from './servicetariff-fees.component';

describe('ServicetariffFeesComponent', () => {
  let component: ServicetariffFeesComponent;
  let fixture: ComponentFixture<ServicetariffFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicetariffFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicetariffFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
