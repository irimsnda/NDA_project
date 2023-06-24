import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportlicenseDashboardComponent } from './exportlicense-dashboard.component';

describe('ExportlicenseDashboardComponent', () => {
  let component: ExportlicenseDashboardComponent;
  let fixture: ComponentFixture<ExportlicenseDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportlicenseDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportlicenseDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
