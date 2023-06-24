import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtrregistryDashboardComponent } from './ctrregistry-dashboard.component';

describe('CtrregistryDashboardComponent', () => {
  let component: CtrregistryDashboardComponent;
  let fixture: ComponentFixture<CtrregistryDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtrregistryDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtrregistryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
