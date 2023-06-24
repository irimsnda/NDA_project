import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreclinicaltrialDashboardComponent } from './preclinicaltrial-dashboard.component';

describe('PreclinicaltrialDashboardComponent', () => {
  let component: PreclinicaltrialDashboardComponent;
  let fixture: ComponentFixture<PreclinicaltrialDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreclinicaltrialDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreclinicaltrialDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
