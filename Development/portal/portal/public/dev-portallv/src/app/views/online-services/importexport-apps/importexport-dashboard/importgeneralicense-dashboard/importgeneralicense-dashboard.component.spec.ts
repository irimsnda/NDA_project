import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportgeneralicenseDashboardComponent } from './importgeneralicense-dashboard.component';

describe('ImportgeneralicenseDashboardComponent', () => {
  let component: ImportgeneralicenseDashboardComponent;
  let fixture: ComponentFixture<ImportgeneralicenseDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportgeneralicenseDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportgeneralicenseDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
