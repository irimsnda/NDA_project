import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpexportamendDashboardComponent } from './impexportamend-dashboard.component';

describe('ImpexportamendDashboardComponent', () => {
  let component: ImpexportamendDashboardComponent;
  let fixture: ComponentFixture<ImpexportamendDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpexportamendDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpexportamendDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
