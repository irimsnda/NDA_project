import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedDashboardclassComponent } from './shared-dashboardclass.component';

describe('SharedDashboardclassComponent', () => {
  let component: SharedDashboardclassComponent;
  let fixture: ComponentFixture<SharedDashboardclassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedDashboardclassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedDashboardclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
